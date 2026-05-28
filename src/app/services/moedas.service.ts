import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MoedasService {
  public todasAsMoedas: any[] = [];

  constructor() { }

  async carregarMoedas() {
    if (this.todasAsMoedas.length === 0) {
      try {
        const resposta = await fetch('/assets/data/moedas.json');
        this.todasAsMoedas = await resposta.json();
      } catch (erro) {
        this.todasAsMoedas = [
          { id: 1, nome: "Moeda nero", preco: 750, imagem: "assets/moedas/nero.jpg", condicao: "Bom", raridade: "Raro", favorito: false },
          { id: 2, nome: "República portuguesa 1975", preco: 1890, imagem: "assets/moedas/rep_pt.jpg", condicao: "Muito Bom", raridade: "Muito raro", favorito: false },
          { id: 3, nome: "Moeda portuguesa 1962", preco: 1230, imagem: "assets/moedas/pt_1962.jpg", condicao: "Novo", raridade: "Comum", favorito: false },
          { id: 4, nome: "Moeda Eua", preco: 3450, imagem: "assets/moedas/eua.jpg", condicao: "Gasto", raridade: "Comum", favorito: false }
        ];
      }
    }
    return this.todasAsMoedas;
  }

  getFavoritas() {
    return this.todasAsMoedas.filter(moeda => moeda.favorito === true);
  }
}