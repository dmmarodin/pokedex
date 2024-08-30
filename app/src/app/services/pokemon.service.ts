import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PokemonDetails, PokemonListItem } from "../models/pokemon.model";

@Injectable()
export class PokemonService {
    http = inject(HttpClient);

    public listPokemons(limit: number, offset:number): Observable<PokemonListItem[]> {
        return this.http.get<PokemonListItem[]>('http://localhost:3000/api/pokemon', { params: { limit, offset } });
    }

    public searchPokemons(name: string) {
        return this.http.get(`http://localhost:3000/api/pokemon/search?name=${name}`);
    }

    public getPokemonDetails(id: number): Observable<PokemonDetails> {
        return this.http.get<PokemonDetails>(`http://localhost:3000/api/pokemon/${id}`);
    }
}