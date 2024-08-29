import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";

@Injectable()
export class PokemonService {
    constructor(private readonly httpService: HttpService) {}

    public async getPokemons() {
        const url = 'https://pokeapi.co/api/v2/pokemon';
        const response = await firstValueFrom(this.httpService.get(url));
        return response.data;
    }
}
