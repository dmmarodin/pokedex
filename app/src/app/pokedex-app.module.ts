import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";

import { routes } from './pokedex-app.routes';
import { PokedexAppComponent } from "./pokedex-app.component";
import { PokemonService } from "./services/pokemon.service";
import { CardComponent } from "./shared/card/card.component";
import { LogoComponent } from "./shared/logo/logo.component";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { PokemonListComponent } from "./pokemon-list/pokemon-list.component";

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    CardComponent,
    LogoComponent,
    PokemonListComponent,
  ],
  providers: [
    PokemonService,
    provideHttpClient(withInterceptorsFromDi())
  ],
  declarations: [
    PokedexAppComponent,
  ],
  bootstrap: [PokedexAppComponent],
})
export class PokedexAppModule { }
