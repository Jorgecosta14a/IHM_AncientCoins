import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalhes-moeda',
  templateUrl: './detalhes-moeda.page.html',
  styleUrls: ['./detalhes-moeda.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class DetalhesMoedaPage {
  // Preenchemos com dados vazios para não dar erro enquanto a página carrega
  moeda: any = {
    nome: 'A carregar...',
    preco: 0,
    imagem: '',
    condicao: '',
    raridade: '',
    descricao: '',
    favorito: false
  };

  constructor(private router: Router) {}

  // A MAGIA ACONTECE AQUI: O Ionic corre isto SEMPRE que entras na página
  ionViewWillEnter() {
    if (history.state && history.state.moeda) {
      this.moeda = history.state.moeda;
    }
  }

  voltar() {
    this.router.navigate(['/explorar']);
  }

  iniciarConversa() {
    this.router.navigate(['/conversa'], { state: { moedaAlvo: this.moeda } });
  }
}