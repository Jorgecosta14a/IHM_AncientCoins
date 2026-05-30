import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { AnunciosService } from 'src/app/services/anuncios.service';

@Component({
  selector: 'app-anuncios-ativos',
  templateUrl: './anuncios-ativos.page.html',
  styleUrls: ['./anuncios-ativos.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class AnunciosAtivosPage {

  meusAnuncios: any[] = [];

  constructor(private router: Router, private anunciosService: AnunciosService) { }

  ionViewWillEnter() {
    this.meusAnuncios = this.anunciosService.getAnuncios();
  }

  editarAnuncio(anuncio: any) {
    this.router.navigate(['/vender'], {
      queryParams: {
        id: anuncio.id,
        nome: anuncio.nome,
        preco: anuncio.preco,
        edit: 'true'
      }
    });
  }

  removerAnuncio(id: number) {
    this.anunciosService.removerAnuncio(id);
    this.meusAnuncios = this.anunciosService.getAnuncios();
  }
}