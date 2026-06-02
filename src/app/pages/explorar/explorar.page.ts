import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { FavoritosService, Moeda } from '../../services/favoritos.service';

@Component({
  selector: 'app-explorar',
  templateUrl: './explorar.page.html',
  styleUrls: ['./explorar.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class ExplorarPage implements OnInit {
  termoPesquisa: string = '';
  precoMin: number | null = null;
  precoMax: number | null = null;
  filtroCondicao: string = '';
  filtroRaridade: string = '';

  // Adicionado o 'vendedor' a cada moeda!
  moedas: any[] = [
    { id: 1, nome: 'Moeda Romana Nero', preco: 750, imagem: 'assets/moedas/moeda_romana_nero.jpg', favorito: false, condicao: 'Gasto', raridade: 'Muito raro', vendedor: { nome: 'André Nogueira', avatar: 'https://i.pravatar.cc/150?img=11' } },
    { id: 2, nome: 'Escudo Portugal 1975', preco: 1890, imagem: 'assets/moedas/escudo_1975.jpg', favorito: false, condicao: 'Bom', raridade: 'Raro', vendedor: { nome: 'Pedro Morais', avatar: 'https://i.pravatar.cc/150?img=12' } },
    { id: 3, nome: 'Moeda Portuguesa 1962', preco: 1230, imagem: 'assets/moedas/moeda_portugual_1962.jpg', favorito: false, condicao: 'Muito Bom', raridade: 'Comum', vendedor: { nome: 'Miguel Miranda', avatar: 'https://i.pravatar.cc/150?img=13' } },
    { id: 4, nome: 'Moeda D. João V', preco: 3450, imagem: 'assets/moedas/peca_joaov_ouro.jpg', favorito: false, condicao: 'Muito Bom', raridade: 'Muito raro', vendedor: { nome: 'Duarte Bravo', avatar: 'https://i.pravatar.cc/150?img=14' } },
    { id: 5, nome: 'Dobrão D. João V', preco: 4500, imagem: 'assets/moedas/Dobrao_djoaoV.jpg', favorito: false, condicao: 'Novo', raridade: 'Muito raro', vendedor: { nome: 'Diana Vieira', avatar: 'https://i.pravatar.cc/150?img=5' } },
    { id: 6, nome: 'Escudo Prata 1914', preco: 320, imagem: 'assets/moedas/escudo_prata1914.jpg', favorito: false, condicao: 'Bom', raridade: 'Comum', vendedor: { nome: 'André Nogueira', avatar: 'https://i.pravatar.cc/150?img=11' } }
  ];

  moedasFiltradas: any[] = [];

  constructor(private favoritosService: FavoritosService, private router: Router) {}

  ngOnInit() {
    this.moedasFiltradas = [...this.moedas];
  }

  abrirDetalhes(moeda: any) {
    this.router.navigate(['/detalhes-moeda'], { state: { moeda: moeda } });
  }

  toggleFavorito(moeda: Moeda) {
    this.favoritosService.toggleFavorito(moeda);
  }

  selecionarCondicao(condicao: string) {
    if (this.filtroCondicao === condicao) { this.filtroCondicao = ''; }
    else { this.filtroCondicao = condicao; }
    this.aplicarFiltros();
  }

  selecionarRaridade(raridade: string) {
    if (this.filtroRaridade === raridade) { this.filtroRaridade = ''; }
    else { this.filtroRaridade = raridade; }
    this.aplicarFiltros();
  }

  aplicarFiltros() {
    this.moedasFiltradas = this.moedas.filter(m =>
      (this.termoPesquisa ? m.nome.toLowerCase().includes(this.termoPesquisa.toLowerCase()) : true) &&
      (this.precoMin ? m.preco >= this.precoMin : true) &&
      (this.precoMax ? m.preco <= this.precoMax : true) &&
      (this.filtroCondicao ? m.condicao === this.filtroCondicao : true) &&
      (this.filtroRaridade ? m.raridade === this.filtroRaridade : true)
    );
  }
}