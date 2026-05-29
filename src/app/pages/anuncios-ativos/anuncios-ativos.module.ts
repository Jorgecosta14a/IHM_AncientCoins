import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AnunciosAtivosPageRoutingModule } from './anuncios-ativos-routing.module';
import { AnunciosAtivosPage } from './anuncios-ativos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnunciosAtivosPageRoutingModule,
    AnunciosAtivosPage // A página TEM de estar aqui nos imports
  ]
  // A linha "declarations: [AnunciosAtivosPage]" foi apagada!
})
export class AnunciosAtivosPageModule {}