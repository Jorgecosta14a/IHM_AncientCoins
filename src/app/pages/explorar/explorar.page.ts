import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { MoedasService } from '../../services/moedas.service';

@Component({
  selector: 'app-explorar',
  templateUrl: './explorar.page.html',
  styleUrls: ['./explorar.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class ExplorarPage implements OnInit {
  moedas: any[] = [];
  moedasFiltradas: any[] = [];

  termoPesquisa: string = '';
  precoMin: number | null = null;
  precoMax: number | null = null;
  filtroCondicao: string = '';
  filtroRaridade: string = '';

  constructor(private moedasService: MoedasService) { }

  async ngOnInit() {
    this.moedas = await this.moedasService.carregarMoedas();
    this.aplicarFiltros();
  }

  ionViewWillEnter() {
    this.aplicarFiltros();
  }

  toggleFavorito(moeda: any) {
    moeda.favorito = !moeda.favorito;
  }

  selecionarCondicao(condicao: string) {
    this.filtroCondicao = this.filtroCondicao === condicao ? '' : condicao;
    this.aplicarFiltros();
  }

  selecionarRaridade(raridade: string) {
    this.filtroRaridade = this.filtroRaridade === raridade ? '' : raridade;
    this.aplicarFiltros();
  }

  aplicarFiltros() {
    if (!this.moedas) return; 

    this.moedasFiltradas = this.moedas.filter(moeda => {
      const passaPesquisa = moeda?.nome?.toLowerCase().includes(this.termoPesquisa?.toLowerCase() || '');
      const passaMin = this.precoMin ? moeda.preco >= this.precoMin : true;
      const passaMax = this.precoMax ? moeda.preco <= this.precoMax : true;
      const passaCondicao = this.filtroCondicao ? moeda.condicao === this.filtroCondicao : true;
      const passaRaridade = this.filtroRaridade ? moeda.raridade === this.filtroRaridade : true;

      return passaPesquisa && passaMin && passaMax && passaCondicao && passaRaridade;
    });
  }
}