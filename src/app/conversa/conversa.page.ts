import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-conversa',
  templateUrl: './conversa.page.html',
  styleUrls: ['./conversa.page.scss'],
  standalone: true, 
  imports: [IonicModule, CommonModule, FormsModule] 
})
export class ConversaPage {
  nomeContato: string = 'Vendedor';
  avatarContato: string = '';
  novaMensagem: string = '';
  mensagens: any[] = []; 

  constructor(private location: Location) {}

  // A MAGIA ACONTECE AQUI: Apanha o vendedor certo SEMPRE que entras no chat
  ionViewWillEnter() {
    if (history.state && history.state.moedaAlvo) {
      const moeda = history.state.moedaAlvo;
      
      if (moeda.vendedor) {
        this.nomeContato = moeda.vendedor.nome;
        this.avatarContato = moeda.vendedor.avatar;
        
        // Limpa as mensagens antigas
        this.mensagens = [];
        
        // Escreve a proposta nova
        this.novaMensagem = `Olá ${this.nomeContato}, gostaria de fazer uma proposta pela moeda ${moeda.nome}. Aceita negociar?`;
      }
    }
  }

  voltar() {
    this.location.back();
  }

  enviarMensagem() {
    if (this.novaMensagem.trim() !== '') {
      this.mensagens.push({
        texto: this.novaMensagem,
        remetente: 'eu', 
        hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      this.novaMensagem = '';
    }
  }

  enviarFoto(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.mensagens.push({
        texto: '📷 [Imagem anexada: ' + file.name + ']',
        remetente: 'eu',
        hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    }
  }
}