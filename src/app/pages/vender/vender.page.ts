import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AnunciosService } from 'src/app/services/anuncios.service';

@Component({
  selector: 'app-vender',
  templateUrl: './vender.page.html',
  styleUrls: ['./vender.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule] 
})
export class VenderPage implements OnInit {
  
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  anuncioId: number | null = null;
  fotoPreview: string | ArrayBuffer | null = null;
  tituloAnuncio: string = '';
  descricaoAnuncio: string = '';
  precoAnuncio: string = ''; 
  raridadeSelecionada: string = '';
  condicaoSelecionada: string = '';

  tituloPagina: string = 'Vender Moeda';
  botaoTexto: string = 'Publicar Anúncio';

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private location: Location,
    private anunciosService: AnunciosService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['edit'] === 'true') {
        this.tituloPagina = 'Editar Anúncio';
        this.botaoTexto = 'Guardar Alterações';
        this.tituloAnuncio = params['nome'] || '';
        this.precoAnuncio = params['preco'] || '';
        this.anuncioId = Number(params['id']);
      }
    });
  }

  voltar() {
    this.location.back();
  }

  abrirSeletorDeFoto() {
    this.fileInput.nativeElement.click();
  }

  carregarFoto(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.fotoPreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  selecionarRaridade(raridade: string) {
    this.raridadeSelecionada = raridade;
  }

  selecionarCondicao(condicao: string) {
    this.condicaoSelecionada = condicao;
  }

  publicarAnuncio() {
    if (this.anuncioId) {
      this.anunciosService.atualizarAnuncio(this.anuncioId, this.tituloAnuncio, this.precoAnuncio);
    }
    this.location.back();
  }
}