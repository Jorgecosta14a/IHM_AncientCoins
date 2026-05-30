import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'registo',
    loadChildren: () => import('./pages/registo/registo.module').then(m => m.RegistoPageModule)
  },
  {
    path: 'explorar', // A rota que faltava para o botão funcionar!
    loadChildren: () => import('./pages/explorar/explorar.module').then(m => m.ExplorarPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'anuncios-ativos',
    loadComponent: () => import('./pages/anuncios-ativos/anuncios-ativos.page').then(m => m.AnunciosAtivosPage)
  },
  {
    path: 'vender',
    loadComponent: () => import('./pages/vender/vender.page').then(m => m.VenderPage)
  },
  {
    path: 'definicoes',
    loadComponent: () => import('./pages/definicoes/definicoes.page').then(m => m.DefinicoesPage)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }