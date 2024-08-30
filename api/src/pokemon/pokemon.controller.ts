import { Controller, Get, Param, Query } from "@nestjs/common";
import { PokemonService } from "./pokemon.service";

@Controller('pokemon')
export class PokemonController {

    constructor(private readonly pokemonService: PokemonService) { }

    @Get()
    async getPokemons(
        @Query('limit') limit: number = 20,
        @Query('offset') offset: number = 0) {
        return this.pokemonService.getPokemons(limit, offset);
    }

    @Get('search')
    async searchPokemons(@Query('name') name: string) {
        return this.pokemonService.searchPokemon(name);
    }

    @Get(':id')
    getPokemonById(@Param('id') id: number) {
        return this.pokemonService.getPokemonById(id);
    }
}
