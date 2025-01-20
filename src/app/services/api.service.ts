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

  getPokemons(): Observable<any[]> {
    return this.http.get<{ results: any[] }>(this.apiUrl).pipe(
      map((response) =>
        response.results.map((pokemon, index) => ({
          name: pokemon.name,
          id: index + 1, 
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
        }))
      )
    );
  }
}
