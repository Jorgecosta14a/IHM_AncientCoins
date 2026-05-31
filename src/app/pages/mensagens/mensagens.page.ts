import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Conversa {
  id: number;
  nome: string;
  avatar: string;
  naoLidas: number;
}

@Component({
  selector: 'app-mensagens',
  templateUrl: './mensagens.page.html',
  styleUrls: ['./mensagens.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class MensagensPage implements OnInit {

  // A lista exata do teu design
  conversas: Conversa[] = [
    { id: 1, nome: 'André Nogueira', avatar: 'https://i.pravatar.cc/150?img=11', naoLidas: 2 },
    { id: 2, nome: 'Pedro Morais', avatar: 'https://i.pravatar.cc/150?img=12', naoLidas: 6 },
    { id: 3, nome: 'Miguel Miranda', avatar: 'https://i.pravatar.cc/150?img=13', naoLidas: 1 },
    { id: 4, nome: 'Duarte Bravo', avatar: 'https://i.pravatar.cc/150?img=14', naoLidas: 3 },
    { id: 5, nome: 'Diana Vieira', avatar: 'https://i.pravatar.cc/150?img=5', naoLidas: 10 }
  ];

  constructor() { }

  ngOnInit() { }

}