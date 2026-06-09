import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PerfilPageRoutingModule } from './perfil-routing.module';
import { PerfilPage } from './perfil.page'; // Importamos a página

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilPageRoutingModule,
    PerfilPage // <--- A PÁGINA AGORA ESTÁ AQUI, NOS IMPORTS!
  ]
  // A secção 'declarations: []' foi completamente apagada para não dar erro
})
export class PerfilPageModule {}