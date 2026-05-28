import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-vender',
  templateUrl: './vender.page.html',
  styleUrls: ['./vender.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class VenderPage implements OnInit {
  tituloAnuncio: string = '';
  descricaoAnuncio: string = '';
  raridadeSelecionada: string = 'Raro';
  condicaoSelecionada: string = 'Muito Bom';

  fotoPreview: string | null = null;

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  constructor(private router: Router) { }

  ngOnInit() { }

  abrirSeletorDeFoto() {
    this.fileInput.nativeElement.click();
  }

  carregarFoto(event: any) {
    const ficheiro = event.target.files[0];
    if (ficheiro) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.fotoPreview = e.target.result; 
      };
      reader.readAsDataURL(ficheiro);
    }
  }

  selecionarRaridade(raridade: string) {
    this.raridadeSelecionada = raridade;
  }

  selecionarCondicao(condicao: string) {
    this.condicaoSelecionada = condicao;
  }

  publicarAnuncio() {
    console.log("A publicar anúncio...");
    this.router.navigate(['/explorar']);
  }
}