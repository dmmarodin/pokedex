import { Controller, Get } from "@nestjs/common";
import { PokemonService } from "./pokemon.service";

@Controller('pokemon')
export class PokemonController {

    constructor(private readonly pokemonService: PokemonService) {}

    @Get()
    getPokemons() {
    }

    @Get(':id')
    getPokemonById() {
        
    }
}
