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
  skeletonsCount = Array.from({ length: 20 }, (_, i) => i);

  pokemons = signal<PokemonListItem[]>([]);
  isLoading = signal<boolean>(true);

  ngOnInit() {
    this.load();
  }

  load() {
    this.pokemonService.listPokemons()
      .pipe(delay(2000)) // Fake delay to showcase skeletons
      .subscribe(
        {
          next:
            (pokemonData: any) => {
              this.pokemons.set(pokemonData.results);
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
}
