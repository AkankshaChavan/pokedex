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
  currentOffset: number = 0; // Track the offset for pagination
  limit: number = 20; // Number of cards per load

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadMorePokemons(); // Load the first chunk on init
  }

  loadMorePokemons(): void {
    this.pokemonService.getPokemons(this.limit, this.currentOffset).subscribe({
      next: (data) => {
        this.pokemons = [...this.pokemons, ...data]; 
        this.currentOffset += this.limit; 
      },
      error: (err) => {
        console.error('Error fetching Pokémon data:', err);
      },
    });
  }
}