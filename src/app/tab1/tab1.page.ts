import { Component } from '@angular/core';
import { AreaBusca } from '../model/area-busca';
import { PokeApiService } from '../services/poke-api.service';
import { ViaCepService } from '../services/via-cep.service';
import { ToastController, ViewDidEnter } from '@ionic/angular';
import { Pokemon } from '../model/pokemon';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page  {
  areaBuscarPokemon!: string;

  areaBusca!: AreaBusca;
  endereco!: string;
  pokemon!: Pokemon;

  constructor(
    private pokeApiService: PokeApiService,
    private cepService: ViaCepService,
    private toastController: ToastController,
    private pokemonService: PokemonService
  ) {}

  buscarPokemon(cep: string) {
    this.buscarCep();
  }

  buscarCep(){
    this.cepService.getViaCEPService(this.areaBuscarPokemon).subscribe(
      (retorno: any) => {
        if (retorno.erro) {
          this.mostrarMensagem('CEP Não Encontrado!', 'warning');
        } else {
          this.areaBusca = {
            bairro: JSON.parse(JSON.stringify(retorno))['bairro'],
            localidade: JSON.parse(JSON.stringify(retorno))['localidade'],
            logradouro: JSON.parse(JSON.stringify(retorno))['logradouro'],
            uf: JSON.parse(JSON.stringify(retorno))['uf'],
          };
          this.encontrarPokemon();

        }
      },
      (error: any) => {
        this.mostrarMensagem('Cep digitado de forma incorreta!', 'danger');
      }
    );
  }

  encontrarPokemon(){
    let id = 0;
    if(this.pokemon){
      let id = Math.floor(Math.random() * 100)
      if(this.pokemon.id === id){
        if(id === 100){
          id--;
        }else{
          id++
        }
      }
    }
    this.pokeApiService.getPokeAPI(id).subscribe((pokemon: any) => {
      if (this.areaBusca) {
        this.pokemon = {
          id: pokemon.id,
          abilities: pokemon.abilities.length,
          height: pokemon.height,
          weight: pokemon.weight,
          nome: pokemon.name,
          url: pokemon.sprites.other.dream_world.front_default,
          urlPixelado: pokemon.sprites.front_shiny
        }
      }
    });
  }

  capturarPokemon(){
    this.pokemonService.capturarPokemon(this.pokemon).subscribe(()=>{
      this.mostrarMensagem('Pokemon Capturado', 'success');
    },(error: any) => {
      this.mostrarMensagem('Erro ao capturar Pokemon', 'danger');
    })
  }

  naoQueroOPokemon(){
    this.encontrarPokemon()
  }

  async mostrarMensagem(message: string, color: 'success' | 'warning' | 'danger') {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top',
      color
    });
    toast.present();
  }

  onInput(ev: any){
    let input = ev.target.value;

    input = input.replace(/\D/g, '');

    if (input.length === 8) {
      input = input.replace(/(\d{5})(\d{1,3})/, '$1-$2');
    }
    this.areaBuscarPokemon = input;
    ev.target.value = this.areaBuscarPokemon;
  }

}
