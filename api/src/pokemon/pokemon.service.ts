import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { AxiosError } from "axios";

@Injectable()
export class PokemonService {
    constructor(private readonly httpService: HttpService) { }

    public async getPokemons(limit: number = 10, offset: number = 0) {
        const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
        const response = await firstValueFrom(this.httpService.get(url));
        return response.data;
    }

    public async getPokemonById(id: number) {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const response = await firstValueFrom(this.httpService.get(url));
        return response.data;
    }

    // Note: The pokeAPI v2 doesn't have a search query while listing all pokemon,
    // so we make a request to the details page by name and check if found
    public async searchPokemon(name: string) {
        const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
        try {
            const response = await firstValueFrom(this.httpService.get(url));
            return response.data;
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
