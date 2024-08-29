import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";

import { routes } from './pokedex-app.routes';
import { PokedexAppComponent } from "./pokedex-app.component";
import { PokemonService } from "./pokemon/pokemon.service";

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    PokemonService,
  ],
  declarations: [
    PokedexAppComponent,
  ],
  bootstrap: [PokedexAppComponent],
})
export class PokedexAppModule {}
