import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FavoritosService, Moeda } from '../../services/favoritos.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class FavoritosPage {
  moedasGuardadas: Moeda[] = [];

  constructor(private favoritosService: FavoritosService) { }

  // Atualiza a lista sempre que entras na página
  ionViewWillEnter() {
    this.moedasGuardadas = this.favoritosService.getFavoritos();
  }

  // Permite remover dos favoritos diretamente desta página
  removerFavorito(moeda: Moeda) {
    this.favoritosService.toggleFavorito(moeda);
    // Atualiza a vista instantaneamente
    this.moedasGuardadas = this.favoritosService.getFavoritos();
  }
}