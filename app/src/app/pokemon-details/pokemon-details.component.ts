import { Component, inject, input, OnInit, signal } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { PokemonDetails } from '../models/pokemon.model';
import { ActivatedRoute } from '@angular/router';
import { CapitalizePipe } from '../pipes/capitalize.pipe';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [CapitalizePipe],
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.scss'
})
export class PokemonDetailsComponent implements OnInit {
  pokemonService = inject(PokemonService);
  activatedRoute = inject(ActivatedRoute);
  isLoading = signal<boolean>(true);

  pokemon = signal<PokemonDetails | undefined>(undefined);

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.load(+id);
      }
    });
  }

  load(id: number) {
    this.pokemonService.getPokemonDetails(id)
      .subscribe(
        {
          next:
            (pokemonData: PokemonDetails) => {
              this.pokemon.set(pokemonData);
              console.log(pokemonData);
              this.isLoading.set(false);
            },
          error: (error: any) => {
            console.error('Error fetching Pokemon information:', error);
            this.isLoading.set(false);
          }
        }
      );
  }
}
