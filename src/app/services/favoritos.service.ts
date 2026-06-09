import { Injectable } from '@angular/core';

// INTERFACE: A "fôrma" que define que informações uma moeda precisa obrigatoriamente de ter.
export interface Moeda {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
  favorito: boolean;
  condicao: string;
  raridade: string;
}

// O decorador @Injectable com 'root' garante que este serviço é global.
// Só existe UMA lista de favoritos para a aplicação inteira, partilhada por todas as páginas.
@Injectable({
  providedIn: 'root'
})
export class FavoritosService {
  
  // Array privado que guarda as moedas marcadas com o coração.
  // Começa vazio quando a aplicação arranca.
  private moedasFavoritas: Moeda[] = [];

  constructor() { }

  // Função simples para entregar a lista de favoritos a qualquer página que a peça
  getFavoritos() {
    return this.moedasFavoritas;
  }

  // Função inteligente que liga ou desliga o "coração" (favorito)
  toggleFavorito(moeda: Moeda) {
    // Procura na lista de favoritos se esta moeda em específico já lá está guardada
    const index = this.moedasFavoritas.findIndex(m => m.id === moeda.id);
    
    // Se o index for maior que -1, significa que a moeda já está nos favoritos
    if (index > -1) {
      // Como já lá está, o clique serve para REMOVER:
      // Corta (splice) a moeda da lista e muda o estado dela para falso (coração vazio)
      this.moedasFavoritas.splice(index, 1);
      moeda.favorito = false;
    } else {
      // Como não está na lista, o clique serve para ADICIONAR:
      // Muda o estado da moeda para verdadeiro (coração cheio) e empurra-a para dentro da lista
      moeda.favorito = true;
      this.moedasFavoritas.push(moeda);
    }
  }
}