import { Component, inject, OnInit, signal } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { PokemonCardComponent } from "./pokemon-card/pokemon-card.component";
import { PokemonCardSkeletonComponent } from "./pokemon-card-skeleton/pokemon-card-skeleton.component";
import { delay } from 'rxjs';
import { PokemonListItem } from '../models/pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [PokemonCardComponent, PokemonCardSkeletonComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})
export class PokemonListComponent implements OnInit {
  pokemonService = inject(PokemonService);
  limit = signal<number>(18);
  offset = signal<number>(0);
  
  skeletonsCount = Array.from({ length: 20 }, (_, i) => i);

  pokemons = signal<PokemonListItem[]>([]);
  isLoading = signal<boolean>(true);

  ngOnInit() {
    this.load();
  }

  load() {
    this.pokemonService.listPokemons(this.limit(), this.offset())
      .pipe(delay(1000)) // Fake delay to showcase skeletons
      .subscribe(
        {
          next:
            (pokemonData: any) => {
              this.pokemons.update((v: PokemonListItem[]) => ([...v, ...pokemonData.results]));
              console.log(pokemonData);
              this.isLoading.set(false);
            },
          error: (error: any) => {
            console.error('Error fetching Pokemon list:', error);
            this.isLoading.set(false);
          }
        }
      );
  }

  loadMore() {
    this.offset.set(this.offset() + this.limit());
    this.load();
  }
}
