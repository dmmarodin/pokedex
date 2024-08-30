import { Inject, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { AxiosError } from "axios";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

@Injectable()
export class PokemonService {
    private baseUrl = "https://pokeapi.co/api/v2";

    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly httpService: HttpService
    ) { }

    private async getCachedOrFetch<T>(key: string, fetchFn: () => Promise<T>): Promise<T> {
        const cachedData = await this.cacheManager.get<T>(key);
        if (cachedData) {
            // log to showcase if the data is being gathered correctly from redis
            console.log(`Using cached data for ${key}`);
            return cachedData;
        }
        const fetchedData = await fetchFn();
        await this.cacheManager.set(key, fetchedData, 3600000);

        // log to showcase if the data is being gathered correctly from redis
        console.log(`Fetching new data for ${key}`);
        return fetchedData;
    }

    public async getPokemons(limit: number = 20, offset: number = 0) {
        const cacheKey = `pokemonsList:${limit}:${offset}`;

        return this.getCachedOrFetch(cacheKey, async () => {
            const url = `${this.baseUrl}/pokemon?limit=${limit}&offset=${offset}`;

            const response = await firstValueFrom(this.httpService.get(url));
            const pokemonList = response.data;

            // getting detailed information for each pokemon in the list
            const detailedPokemons = await Promise.all(
                pokemonList.results.map(async (pokemon: any) => {
                    const details = await this.getPokemonByName(pokemon.name);
                    return {
                        id: details.id,
                        name: pokemon.name,
                        image: details.images.front,
                    };
                })
            );

            const result = { ...pokemonList, results: detailedPokemons };
            return result;
        });
    }

    public async getPokemonById(id: number) {
        return this.getPokemonByName(id.toString());
    }

    public async getPokemonByName(name: string) {
        const cacheKey = `pokemon:${name}`;

        return this.getCachedOrFetch(cacheKey, async () => {
            const url = `${this.baseUrl}/pokemon/${name}`;

            const response = await firstValueFrom(this.httpService.get(url));
            const responseData = response.data;
            console.log(responseData);

            const result = {
                id: responseData.id,
                name: responseData.name,
                base_experience: responseData.base_experience,
                height: responseData.height,
                weight: responseData.weight,
                images: {
                    front: responseData.sprites.front_default,
                    back: responseData.sprites.back_default,
                    shinyFront: responseData.sprites.front_shiny,
                    shinyBack: responseData.sprites.back_shiny,
                },
                types: responseData.types.map((type: any) => type.type.name),
                abilities: responseData.abilities.map((ability: any) => ({name: ability.ability.name})),
                stats: responseData.stats.map((stat: any) => ({
                    name: stat.stat.name,
                    value: stat.base_stat,
                })),
                moves: responseData.moves.map((move: any) => move.move.name),
            };

            return result;
        });
    }

    public async searchPokemon(name: string) {
        try {
        const result = await this.getPokemonByName(name.toLowerCase());
        return { results: [{
            id: result.id,
            name: result.name,
            image: result.images.front,
        }] };
        } catch (e: unknown) {
            const error = e as AxiosError;
            if (error.response?.status === 404) {
                return [];
            } else {
                throw new Error('Error searching for pokemon');
            }
        }
    }
}
