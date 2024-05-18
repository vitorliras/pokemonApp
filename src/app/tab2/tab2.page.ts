import { ViewDidEnter } from '@ionic/angular';
import { PokeApiService } from '../services/poke-api.service';
import { PhotoService } from './../services/photo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements ViewDidEnter {

  pokemonEnemy!:any
  pokemon!: any

  constructor(
    public photoService: PhotoService,
    private pokeApiService: PokeApiService,

  ) {}

  ionViewDidEnter(): void {
    this.getPokemonEnemy()
    const pokemon = localStorage.getItem("pokemon");
    if (pokemon) {
      this.pokemon = JSON.parse(pokemon);
      console.log(this.pokemon)
    }
  }

  getPokemonEnemy(){
    this.pokeApiService.getPokeAPI(0).subscribe(
      (pokemonEnemy: any) =>{
        this.pokemonEnemy = pokemonEnemy
      }
    );
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }
}
