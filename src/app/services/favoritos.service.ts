import { Injectable } from '@angular/core';

export interface Moeda {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
  favorito: boolean;
  condicao: string;
  raridade: string;
}

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {
  private moedasFavoritas: Moeda[] = [];

  constructor() { }

  getFavoritos() {
    return this.moedasFavoritas;
  }

  toggleFavorito(moeda: Moeda) {
    const index = this.moedasFavoritas.findIndex(m => m.id === moeda.id);
    if (index > -1) {
      // Se já lá está, remove
      this.moedasFavoritas.splice(index, 1);
      moeda.favorito = false;
    } else {
      // Se não está, adiciona
      moeda.favorito = true;
      this.moedasFavoritas.push(moeda);
    }
  }
}