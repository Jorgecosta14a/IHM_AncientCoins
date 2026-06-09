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
  
  // Objeto que vai guardar todas as informações da moeda clicada.
  // Começamos com valores vazios/padrão para o HTML não dar erro de leitura antes dos dados reais chegarem.
  moeda: any = {
    nome: 'A carregar...',
    preco: 0,
    imagem: '',
    condicao: '',
    raridade: '',
    descricao: '',
    favorito: false
  };

  // Injetamos o motor de navegação (Router) para conseguirmos viajar entre páginas
  constructor(private router: Router) {}

  // Função nativa do Ionic executada automaticamente assim que a página está prestes a abrir
  ionViewWillEnter() {
    // Verifica se a página anterior enviou informações (estado) através do sistema de rotas
    if (history.state && history.state.moeda) {
      // Substitui os dados temporários pelos dados reais da moeda que o utilizador clicou
      this.moeda = history.state.moeda;
    }
  }

  // Função simples para forçar a navegação de volta ao menu principal
  voltar() {
    this.router.navigate(['/explorar']);
  }

  // Função que leva o utilizador para a página de mensagens (chat)
  iniciarConversa() {
    // Viaja para o ecrã '/conversa' e envia "escondido" no estado os dados da moeda atual.
    // Assim, o chat já sabe sobre qual moeda o utilizador quer negociar!
    this.router.navigate(['/conversa'], { state: { moedaAlvo: this.moeda } });
  }
}