import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-conversa',
  templateUrl: './conversa.page.html',
  styleUrls: ['./conversa.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class ConversaPage implements OnInit {
  novaMensagem: string = '';
  mensagens: any[] = [
    { texto: 'Bom dia, eu vi o seu anúncio sobre a moeda portuguesa de 1962. Consegue baixar o preço?', tipo: 'recebida' },
    { texto: 'Boa noite, o preço não é negociável.', tipo: 'enviada' },
    { texto: 'Ok, obrigada!', tipo: 'recebida' }
  ];

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  constructor() { }

  ngOnInit() { }

  enviarMensagem() {
    if (this.novaMensagem.trim() !== '') {
      this.mensagens.push({ texto: this.novaMensagem, tipo: 'enviada' });
      this.novaMensagem = '';
    }
  }

  enviarFoto(event: any) {
    const ficheiro = event.target.files[0];
    if (ficheiro) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.mensagens.push({ foto: e.target.result, tipo: 'enviada' });
      };
      reader.readAsDataURL(ficheiro);
    }
  }
}