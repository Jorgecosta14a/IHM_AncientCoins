import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AnunciosService } from '../../services/anuncios.service'; // Importa o armazém!

@Component({
  selector: 'app-vender',
  templateUrl: './vender.page.html',
  styleUrls: ['./vender.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule] 
})
export class VenderPage implements OnInit {
  
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  anuncioId: number | null = null; // Precisamos de saber o ID da moeda a editar
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
    private anunciosService: AnunciosService // Liga o serviço!
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['edit'] === 'true') {
        this.tituloPagina = 'Editar Anúncio';
        this.botaoTexto = 'Guardar Alterações';
        this.tituloAnuncio = params['nome'] || '';
        this.precoAnuncio = params['preco'] || '';
        this.anuncioId = Number(params['id']); // Guarda o ID para saber o que alterar!
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
    // Código da foto mantém-se
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

  // O BOTÃO DE GUARDAR AGORA É INTELIGENTE!
  publicarAnuncio() {
    if (this.anuncioId) {
      // Se tivermos um ID, estamos a editar! Avisamos o armazém.
      this.anunciosService.atualizarAnuncio(this.anuncioId, this.tituloAnuncio, this.precoAnuncio);
    } else {
      // (No futuro, colocaremos aqui a lógica para Criar uma nova)
    }
    
    // Volta para os anúncios ativos
    this.location.back();
  }
}