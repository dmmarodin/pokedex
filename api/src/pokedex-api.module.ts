import { Module } from '@nestjs/common';
import { PokemonController } from './pokemon/pokemon.controller';
import { PokemonService } from './pokemon/pokemon.service';

@Module({
  imports: [],
  controllers: [PokemonController],
  providers: [PokemonService],
})
export class PokedexApiModule {}
