import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { PokemonService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
  providers: [ PokemonService ]
})
export class CardsComponent implements OnInit {

  pokemons: any[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonService.getPokemons().subscribe({
      next: (data) => {
        this.pokemons = data;
      },
      error: (err) => {
        console.error('Error fetching Pokémon data:', err);
      },
    });
  }
}
