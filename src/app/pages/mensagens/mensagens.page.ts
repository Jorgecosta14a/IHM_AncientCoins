import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// INTERFACE: Funciona como um "molde" ou regra de segurança.
// Diz à aplicação que cada conversa tem obrigatoriamente de ter estes 4 campos e com estes tipos exatos.
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
  standalone: true, // Indica que a página não precisa de módulos externos para funcionar
  imports: [IonicModule, CommonModule, RouterModule]
})
export class MensagensPage implements OnInit {

  // Base de dados simulada (Mock Data) da caixa de entrada.
  // Esta lista respeita o "molde" (Conversa) 
  // É esta a lista que o HTML vai ler (usando o *ngFor) para desenhar cada um dos cartões de chat.
  conversas: Conversa[] = [
    { id: 1, nome: 'André Nogueira', avatar: 'https://i.pravatar.cc/150?img=11', naoLidas: 2 },
    { id: 2, nome: 'Pedro Morais', avatar: 'https://i.pravatar.cc/150?img=12', naoLidas: 6 },
    { id: 3, nome: 'Miguel Miranda', avatar: 'https://i.pravatar.cc/150?img=13', naoLidas: 1 },
    { id: 4, nome: 'Duarte Bravo', avatar: 'https://i.pravatar.cc/150?img=14', naoLidas: 3 },
    { id: 5, nome: 'Diana Vieira', avatar: 'https://i.pravatar.cc/150?img=5', naoLidas: 10 }
  ];

  // O constructor injeta dependências (vazio por agora, pois não estamos a ligar a bases de dados reais nesta página)
  constructor() { }

  // Função nativa que corre quando a página é criada pela primeira vez
  ngOnInit() { }

}