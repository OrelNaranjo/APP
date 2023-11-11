import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.page.html',
  styleUrls: ['./pokedex.page.scss'],
})
export class PokedexPage implements OnInit {

  pokemon: any[] = [];

  constructor(public pokemonService: PokemonService) {  }

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons(url?: string) {
    this.pokemonService.getPokemons(url).subscribe(res => {
      console.log(res);
      this.pokemon = res;
    });
  }

  nextPage() {
    this.pokemonService.nextPage().subscribe(res => {
      console.log(res);
      this.pokemon = res;
    });
  }

  prevPage() {
    this.pokemonService.prevPage().subscribe(res => {
      console.log(res);
      this.pokemon = res;
    });
  }
}
