import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalhesMoedaPageRoutingModule } from './detalhes-moeda-routing.module';

import { DetalhesMoedaPage } from './detalhes-moeda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalhesMoedaPageRoutingModule,
    DetalhesMoedaPage 
  ],
  declarations: [] 
})
export class DetalhesMoedaPageModule {}
