import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable()
export class PokemonService {
    http = inject(HttpClient);

    public listPokemons() {
        return this.http.get('http://localhost:3000/api/pokemon');
    }

    public searchPokemons(name: string) {
        return this.http.get(`http://localhost:3000/api/pokemon/search?name=${name}`);
    }
}