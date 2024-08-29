import { Controller, Get } from "@nestjs/common";
import { PokemonService } from "./pokemon.service";

@Controller('pokemon')
export class PokemonController {

    constructor(private readonly pokemonService: PokemonService) {}

    @Get()
    async getPokemons() {
        return this.pokemonService.getPokemons();
    }

    @Get(':id')
    getPokemonById() {
        
    }
}
