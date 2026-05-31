import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Moeda {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
  favorito: boolean;
  condicao: string;
  raridade: string;
}

@Component({
  selector: 'app-explorar',
  templateUrl: './explorar.page.html',
  styleUrls: ['./explorar.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class ExplorarPage implements OnInit {
  
  // Variáveis ligadas ao HTML (Filtros e Pesquisa)
  termoPesquisa: string = '';
  precoMin: number | null = null;
  precoMax: number | null = null;
  filtroCondicao: string = '';
  filtroRaridade: string = '';

  // A nossa base de dados com links provisórios para as imagens não ficarem partidas
  moedas: Moeda[] = [
    { id: 1, nome: 'Moeda nero', preco: 750, imagem: 'https://dummyimage.com/150x150/b89c49/ffffff&text=Foto+Nero', favorito: false, condicao: 'Gasto', raridade: 'Muito raro' },
    { id: 2, nome: 'República portuguesa 1975', preco: 1890, imagem: 'https://dummyimage.com/150x150/c2c2c2/333333&text=Foto+Rep', favorito: false, condicao: 'Bom', raridade: 'Raro' },
    { id: 3, nome: 'Moeda portuguesa 1962', preco: 1230, imagem: 'https://dummyimage.com/150x150/b89c49/ffffff&text=Foto+Port', favorito: false, condicao: 'Muito Bom', raridade: 'Comum' },
    { id: 4, nome: 'Moeda Eua', preco: 3450, imagem: 'https://dummyimage.com/150x150/c2c2c2/333333&text=Foto+EUA', favorito: false, condicao: 'Muito Bom', raridade: 'Muito raro' },
    { id: 5, nome: 'Dobrão D. João V', preco: 4500, imagem: 'https://dummyimage.com/150x150/b89c49/ffffff&text=Foto+Dobrao', favorito: false, condicao: 'Novo', raridade: 'Muito raro' },
    { id: 6, nome: 'Escudo Prata 1914', preco: 320, imagem: 'https://dummyimage.com/150x150/c2c2c2/333333&text=Foto+Escudo', favorito: false, condicao: 'Bom', raridade: 'Comum' },
    { id: 7, nome: 'Florim de Ouro', preco: 2100, imagem: 'https://dummyimage.com/150x150/b89c49/ffffff&text=Foto+Florim', favorito: false, condicao: 'Muito Bom', raridade: 'Raro' },
    { id: 8, nome: 'Tostão D. Manuel I', preco: 850, imagem: 'https://dummyimage.com/150x150/c2c2c2/333333&text=Foto+Tostao', favorito: false, condicao: 'Gasto', raridade: 'Raro' }
  ];

  // A lista que é efetivamente mostrada no ecrã
  moedasFiltradas: Moeda[] = [];

  constructor() {}

  ngOnInit() {
    // Quando a página carrega, mostra todas as moedas por defeito
    this.moedasFiltradas = [...this.moedas];
  }

  // Ativa/Desativa o coração dourado
  toggleFavorito(moeda: Moeda) {
    moeda.favorito = !moeda.favorito;
  }

  // --- LÓGICA DO MODAL DE FILTROS --- //

  selecionarCondicao(condicao: string) {
    if (this.filtroCondicao === condicao) {
      this.filtroCondicao = ''; 
    } else {
      this.filtroCondicao = condicao;
    }
    this.aplicarFiltros();
  }

  selecionarRaridade(raridade: string) {
    if (this.filtroRaridade === raridade) {
      this.filtroRaridade = '';
    } else {
      this.filtroRaridade = raridade;
    }
    this.aplicarFiltros();
  }

  aplicarFiltros() {
    this.moedasFiltradas = this.moedas.filter(moeda => {
      
      const bateCertoNome = this.termoPesquisa 
        ? moeda.nome.toLowerCase().includes(this.termoPesquisa.toLowerCase()) 
        : true;

      const bateCertoPrecoMin = this.precoMin ? moeda.preco >= this.precoMin : true;
      const bateCertoPrecoMax = this.precoMax ? moeda.preco <= this.precoMax : true;
      const bateCertoCondicao = this.filtroCondicao ? moeda.condicao === this.filtroCondicao : true;
      const bateCertoRaridade = this.filtroRaridade ? moeda.raridade === this.filtroRaridade : true;

      return bateCertoNome && bateCertoPrecoMin && bateCertoPrecoMax && bateCertoCondicao && bateCertoRaridade;
    });
  }
}