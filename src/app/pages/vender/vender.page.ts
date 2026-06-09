import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'; 

@Component({
  selector: 'app-vender',
  templateUrl: './vender.page.html',
  styleUrls: ['./vender.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class VenderPage implements OnInit {
  
  anuncio = {
    foto: '',
    titulo: '',
    descricao: '',
    preco: null,
    raridade: 'Comum',
    condicao: 'Bom'
  };

  constructor(private storage: Storage, private router: Router) {}

  async ngOnInit() {
    await this.storage.create();
  }

  async tirarFoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true, 
        resultType: CameraResultType.Uri, 
        source: CameraSource.Camera 
      });

      // Erro TypeScript resolvido com o || ''
      this.anuncio.foto = image.webPath || '';
    
    } catch (erro) {
      console.log('Utilizador cancelou a foto', erro);
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.anuncio.foto = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  async publicarAnuncio() {
    if (!this.anuncio.titulo || !this.anuncio.preco) {
      window.alert('Por favor, preencha pelo menos o título e o preço!');
      return;
    }

    const anunciosAtuais = await this.storage.get('listaAnuncios') || [];
    anunciosAtuais.push(this.anuncio);
    await this.storage.set('listaAnuncios', anunciosAtuais);

    window.alert('Anúncio publicado com sucesso!');

    this.anuncio = {
      foto: '', titulo: '', descricao: '', preco: null, raridade: 'Comum', condicao: 'Bom'
    };

    this.router.navigate(['/anuncios-ativos']);
  }
}