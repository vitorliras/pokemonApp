import { Injectable } from '@angular/core';
import { Pokemon } from '../model/pokemon';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private readonly API = 'http://localhost:3000/pokemon';

  constructor(private http: HttpClient) { }

  meuPokedex(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.API)
  }

  capturarPokemon(pokemon: Pokemon): Observable<Pokemon>{
    const itemNovo = this.http.post<Pokemon>(this.API, pokemon)
    return itemNovo;
  }

  desfazerPokemon(id: number ): Observable<Pokemon> {
    const url = `${this.API}/${id}`;
    return this.http.delete<Pokemon>(url);
  }

  escolhoEssePokemon(id: number): Observable<Pokemon> {
    const url = `${this.API}/${id}`;
    return this.http.get<Pokemon>(url);
  }

}
