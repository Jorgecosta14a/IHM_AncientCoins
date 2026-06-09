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
  
  // Variáveis principais para controlar a informação exibida no ecrã do chat
  nomeContato: string = 'Vendedor';
  avatarContato: string = '';
  novaMensagem: string = '';
  mensagens: any[] = []; 

  constructor(private location: Location) {}

  // Função nativa do Ionic que corre sempre que o utilizador entra nesta página
  ionViewWillEnter() {
    // Verifica se recebemos dados da página anterior através do sistema de navegação
    if (history.state && history.state.moedaAlvo) {
      const moeda = history.state.moedaAlvo;
      
      // Se a moeda tiver um vendedor associado, atualiza os dados do ecrã
      if (moeda.vendedor) {
        this.nomeContato = moeda.vendedor.nome;
        this.avatarContato = moeda.vendedor.avatar;
        
        // Limpa o histórico de mensagens anterior por segurança
        this.mensagens = [];
        
        // Cria automaticamente uma mensagem de proposta inicial com o nome da moeda
        this.novaMensagem = `Olá ${this.nomeContato}, gostaria de fazer uma proposta pela moeda ${moeda.nome}. Aceita negociar?`;
      }
    }
  }

  // Função para voltar à página anterior usando o histórico nativo do telemóvel
  voltar() {
    this.location.back();
  }

  // Função disparada ao clicar no botão de enviar texto
  enviarMensagem() {
    // Só envia se a caixa de texto não estiver vazia (evita mensagens em branco)
    if (this.novaMensagem.trim() !== '') {
      
      // Adiciona a nova mensagem à lista (array) para aparecer no ecrã
      this.mensagens.push({
        texto: this.novaMensagem,
        remetente: 'eu', // Define que fomos nós a enviar (para formatar a cor no HTML)
        hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) // Guarda a hora atual (ex: 14:30)
      });
      
      // Limpa a caixa de texto para a próxima mensagem
      this.novaMensagem = '';
    }
  }

  // Função para lidar com o envio de anexos/fotos
  enviarFoto(event: any) {
    const file = event.target.files[0];
    
    // Se o utilizador escolheu um ficheiro, simula o envio no chat
    if (file) {
      this.mensagens.push({
        texto: '📷 [Imagem anexada: ' + file.name + ']',
        remetente: 'eu',
        hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    }
  }
}