import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { MoedasService } from '../../services/moedas.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class FavoritosPage implements OnInit {
  moedasFavoritas: any[] = [];

  constructor(private moedasService: MoedasService) { }

  ngOnInit() { }

  async ionViewWillEnter() {
    await this.moedasService.carregarMoedas(); 
    this.moedasFavoritas = this.moedasService.getFavoritas();
  }

  removerFavorito(moeda: any) {
    moeda.favorito = false; 
    this.moedasFavoritas = this.moedasService.getFavoritas();
  }
}