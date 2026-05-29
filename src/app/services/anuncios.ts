import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnunciosService {
  
  // A nossa base de dados central!
  private meusAnuncios = [
    {
      id: 1,
      nome: 'República portuguesa 1975',
      preco: 1890,
      imagem: 'assets/moedas/rep_pt.jpg',
      visualizacoes: 45,
      mensagens: 2
    },
    {
      id: 2,
      nome: '10 Réis Cobre 1867 (D. Luís I)',
      preco: 50,
      imagem: 'assets/moedas/10_reis.jpg',
      visualizacoes: 12,
      mensagens: 0
    }
  ];

  constructor() {}

  // Devolve a lista às páginas
  getAnuncios() {
    return this.meusAnuncios;
  }

  // Recebe os dados da página Editar e atualiza a base de dados
  atualizarAnuncio(id: number, titulo: string, preco: string) {
    const index = this.meusAnuncios.findIndex(a => a.id === id);
    if (index !== -1) {
      this.meusAnuncios[index].nome = titulo;
      this.meusAnuncios[index].preco = Number(preco);
    }
  }

  // Remove um anúncio
  removerAnuncio(id: number) {
    this.meusAnuncios = this.meusAnuncios.filter(a => a.id !== id);
  }
}