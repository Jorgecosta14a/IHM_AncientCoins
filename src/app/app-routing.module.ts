import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login', 
    pathMatch: 'full'
  },
  {
    path: 'explorar',
    loadChildren: () => import('./pages/explorar/explorar.module').then( m => m.ExplorarPageModule)
  },
  {
    path: 'detalhes-moeda',
    loadChildren: () => import('./pages/detalhes-moeda/detalhes-moeda.module').then( m => m.DetalhesMoedaPageModule)
  },
  {
    path: 'favoritos',
    loadChildren: () => import('./pages/favoritos/favoritos.module').then( m => m.FavoritosPageModule)
  },
  {
    path: 'vender',
    loadChildren: () => import('./pages/vender/vender.module').then( m => m.VenderPageModule)
  },
  {
    path: 'mensagens',
    loadChildren: () => import('./pages/mensagens/mensagens.module').then( m => m.MensagensPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registo',
    loadChildren: () => import('./pages/registo/registo.module').then( m => m.RegistoPageModule)
  },
  {
    path: 'conversa',
    loadChildren: () => import('./conversa/conversa.module').then( m => m.ConversaPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
