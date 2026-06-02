import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule, Location } from '@angular/common';
import { AnunciosService, Anuncio } from '../../services/anuncios.service';

@Component({
  selector: 'app-anuncios-ativos',
  templateUrl: './anuncios-ativos.page.html',
  styleUrls: ['./anuncios-ativos.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class AnunciosAtivosPage {
  anuncios: Anuncio[] = [];

  constructor(
    private location: Location,
    private anunciosService: AnunciosService
  ) {}

  ionViewWillEnter() {
    this.anuncios = this.anunciosService.getMeusAnuncios();
  }

  voltar() {
    this.location.back();
  }

  remover(id: number) {
    this.anunciosService.removerAnuncio(id);
    this.anuncios = this.anunciosService.getMeusAnuncios();
  }
}