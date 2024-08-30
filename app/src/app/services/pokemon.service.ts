import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PokemonListItem } from "../models/pokemon.model";

@Injectable()
export class PokemonService {
    http = inject(HttpClient);

    public listPokemons(): Observable<PokemonListItem[]> {
        return this.http.get<PokemonListItem[]>('http://localhost:3000/api/pokemon');
    }

    public searchPokemons(name: string) {
        return this.http.get(`http://localhost:3000/api/pokemon/search?name=${name}`);
    }
}