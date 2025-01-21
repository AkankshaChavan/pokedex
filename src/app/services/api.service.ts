import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root', 
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=20';

  constructor(private http: HttpClient) {}

  getPokemons(limit: number, offset: number): Observable<any[]> {
    return this.http
      .get<{ results: any[] }>(`${this.apiUrl}?limit=${limit}&offset=${offset}`)
      .pipe(
        map((response, index) =>
          response.results.map((pokemon, i) => ({
            name: pokemon.name,
            id: offset + i + 1, 
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${offset + i + 1}.png`,
          }))
        )
      );
  }
}