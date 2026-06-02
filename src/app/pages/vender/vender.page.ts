import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AnunciosService, Anuncio } from '../../services/anuncios.service';

@Component({
  selector: 'app-vender',
  templateUrl: './vender.page.html',
  styleUrls: ['./vender.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class VenderPage {
  tituloAnuncio: string = '';
  descricaoAnuncio: string = '';
  precoAnuncio: number | null = null;
  fotoPreview: string | null = null;

  raridadeSelecionada: string = '';
  condicaoSelecionada: string = '';

  constructor(
    private location: Location,
    private router: Router,
    private anunciosService: AnunciosService
  ) {}

  voltar(): void {
    this.location.back();
  }

  abrirSeletorDeFoto(): void {
    const input = document.getElementById('fileInput') as HTMLInputElement;

    if (input) {
      input.click();
    }
  }

  carregarFoto(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      this.fotoPreview = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  selecionarRaridade(raridade: string): void {
    this.raridadeSelecionada = raridade;
  }

  selecionarCondicao(condicao: string): void {
    this.condicaoSelecionada = condicao;
  }

  publicarAnuncio(): void {
    const novoAnuncio: Anuncio = {
      id: Date.now(),
      nome: this.tituloAnuncio || 'Anúncio sem título',
      preco: Number(this.precoAnuncio) || 0,
      imagem: this.fotoPreview || 'assets/moedas/default.jpg',
      visualizacoes: 0,
      mensagens: 0
    };

    this.anunciosService.adicionarAnuncio(novoAnuncio);

    this.tituloAnuncio = '';
    this.descricaoAnuncio = '';
    this.precoAnuncio = null;
    this.fotoPreview = null;
    this.raridadeSelecionada = '';
    this.condicaoSelecionada = '';

    this.router.navigate(['/anuncios-ativos']);
  }
}