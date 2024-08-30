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
                        name: pokemon.name,
                        image: details.sprites.front_default,
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
            return response.data;
        });
    }

    public async searchPokemon(name: string) {
        return this.getPokemonByName(name.toLowerCase()).catch((e: AxiosError) => {
            if (e.response?.status === 404) {
                return [];
            } else {
                throw new Error('Error searching for pokemon');
            }
        });
    }
}
