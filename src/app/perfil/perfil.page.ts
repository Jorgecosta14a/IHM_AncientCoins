import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class PerfilPage implements OnInit {
  isEditingName: boolean = false;
  
  utilizador = {
    nome: 'Diana Vieira',
    foto: 'https://randomuser.me/api/portraits/women/44.jpg'
  };

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  constructor() { }

  ngOnInit() { }

  toggleEditName() {
    this.isEditingName = !this.isEditingName;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.utilizador.foto = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}