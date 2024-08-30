import { Routes } from '@angular/router';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';

export const routes: Routes = [
    { path: '', component: PokemonListComponent },
    { path: 'pokemon/:name', component: PokemonDetailsComponent }
];
