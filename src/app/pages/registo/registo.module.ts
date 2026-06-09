import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- 1. Confirma que isto está aqui
import { IonicModule } from '@ionic/angular'; // <-- 2. Confirma que isto está aqui

import { RegistoPageRoutingModule } from './registo-routing.module';
import { RegistoPage } from './registo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,     
    IonicModule,     
    RegistoPageRoutingModule
  ],
  declarations: []
})
export class RegistoPageModule {}