import { Component, ElementRef, inject, OnInit, signal, ViewChild, viewChild } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { PokemonCardComponent } from "./pokemon-card/pokemon-card.component";
import { PokemonCardSkeletonComponent } from "./pokemon-card-skeleton/pokemon-card-skeleton.component";
import { delay } from 'rxjs';
import { PokemonListItem } from '../models/pokemon.model';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [PokemonCardComponent, PokemonCardSkeletonComponent, FormsModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})
export class PokemonListComponent implements OnInit {
  pokemonService = inject(PokemonService);
  limit = signal<number>(18);
  offset = signal<number>(0);
  @ViewChild('searchForm') searchForm!: NgForm;
  @ViewChild('searchInput') searchInput!: ElementRef;

  skeletonsCount = Array.from({ length: 20 }, (_, i) => i);

  pokemons = signal<PokemonListItem[]>([]);
  isLoading = signal<boolean>(true);
  isSearching = signal<boolean>(false);

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

  search(name: string) {
    if(this.isLoading()) return;

    this.isSearching.set(true);
    this.isLoading.set(true);

    if(name.trim() === '') {
      this.resetList();
      return;
    };

    this.pokemonService.searchPokemons(name).subscribe({
      next: (pokemonData: any) => {
        this.pokemons.set(pokemonData.results || []);
        this.isLoading.set(false);
      },
      error: (error: any) => {
        console.error('Error fetching searched Pokemon:', error);
        this.pokemons.set([]);
        this.isLoading.set(false);
      }

    }
    )
  }

  onSearchInput(value: string) {
    if(!value) this.resetList();
    this.isSearching.set(value.trim() !== '');
  }

  onClear() {
    this.searchForm.reset();
    this.searchInput.nativeElement.value = '';
    this.resetList();
  }

  resetList() {
    this.offset.set(0);
    this.pokemons.set([]);

    this.load();

    this.isSearching.set(false);
    this.isLoading.set(true);
  }
}
