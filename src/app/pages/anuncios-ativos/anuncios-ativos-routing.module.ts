import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnunciosAtivosPage } from './anuncios-ativos.page';

const routes: Routes = [
  {
    path: '',
    component: AnunciosAtivosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnunciosAtivosPageRoutingModule {}
