import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalhesMoedaPage } from './detalhes-moeda.page';

const routes: Routes = [
  {
    path: '',
    component: DetalhesMoedaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalhesMoedaPageRoutingModule {}
