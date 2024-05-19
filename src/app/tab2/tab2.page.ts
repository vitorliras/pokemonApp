import { IonModal, ViewDidEnter } from '@ionic/angular';
import { PokeApiService } from '../services/poke-api.service';
import { PhotoService } from './../services/photo.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Pokemon } from '../model/pokemon';
import { PokemonService } from '../services/pokemon.service';
import { Util } from '../util/util';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements ViewDidEnter {
  @ViewChild('modal', { static: true }) modal!: IonModal;
  pokemonEnemy!: any;
  pokemon!: Pokemon;
  pokemons: Pokemon[] = [];

  constructor(
    public photoService: PhotoService,
    private pokeApiService: PokeApiService,
    private pokemonService: PokemonService,
    private util: Util
  ) {}

  ionViewDidEnter(): void {
    this.getPokemonEnemy();
    this.meusPokemons();
  }

  meusPokemons() {
    this.pokemonService.meusPokemons().subscribe((pokemons) => {
      if (pokemons.length > 0) {
        this.pokemons = pokemons;
        this.abrirModal();
      } else {
        this.util.mostrarMensagem('Você não possui nenhum pokemon, logo não poderar batalhar!', 'warning' );
      }
    });
  }

  abrirModal() {
    if (this.modal) {
      this.modal.present();
    }
  }

  fecharModal() {
    if (this.modal) {
      this.modal.dismiss();
    }
    if(!this.pokemon){
      this.util.mostrarMensagem('Você não escolheu nenhum pokemon, logo não poderar batalhar!', 'warning' );
    }
  }

  escolhoEssePokemon(pokemon: Pokemon){
    if(this.pokemonEnemy){
      if(this.pokemonEnemy.abilities.length > pokemon.abilities){
        pokemon.qtdDerrota ++;
      }
      if(this.pokemonEnemy.abilities.length < pokemon.abilities){
        pokemon.qtdVitoria ++;
      }
      if(this.pokemonEnemy.abilities.length == pokemon.abilities){
        pokemon.qtdEmpate ++;
      }
    }
    this.pokemon = pokemon;
    this.pokemonService.resultadoBatalha(this.pokemon).subscribe(() =>{
      this.fecharModal()
    })
  }

  getPokemonEnemy() {
    this.pokeApiService.getPokeAPI(0).subscribe((pokemonEnemy: any) => {
      this.pokemonEnemy = pokemonEnemy;
    });
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }
}
