import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mensagens',
  templateUrl: './mensagens.page.html',
  styleUrls: ['./mensagens.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class MensagensPage implements OnInit {
  termoPesquisa: string = '';

  // Fotos corrigidas para garantir os géneros certos!
  conversas: any[] = [
    { id: 1, nome: 'André Nogueira', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', naoLidas: 2 },
    { id: 2, nome: 'Pedro Morais', avatar: 'https://randomuser.me/api/portraits/men/11.jpg', naoLidas: 6 },
    { id: 3, nome: 'Miguel Miranda', avatar: 'https://randomuser.me/api/portraits/men/22.jpg', naoLidas: 1 },
    { id: 4, nome: 'Duarte Bravo', avatar: 'https://randomuser.me/api/portraits/men/33.jpg', naoLidas: 3 },
    { id: 5, nome: 'Diana Vieira', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', naoLidas: 10 }
  ];

  conversasFiltradas: any[] = [];

  constructor() { }

  ngOnInit() {
    this.conversasFiltradas = [...this.conversas];
  }

  pesquisar() {
    if (!this.termoPesquisa) {
      this.conversasFiltradas = [...this.conversas];
      return;
    }
    
    this.conversasFiltradas = this.conversas.filter(conversa =>
      conversa.nome.toLowerCase().includes(this.termoPesquisa.toLowerCase())
    );
  }
}