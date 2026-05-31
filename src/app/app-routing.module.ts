import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  // Páginas Standalone (sem ficheiro module)
  { path: 'login', loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage) },
  { path: 'anuncios-ativos', loadComponent: () => import('./pages/anuncios-ativos/anuncios-ativos.page').then(m => m.AnunciosAtivosPage) },
  { path: 'vender', loadComponent: () => import('./pages/vender/vender.page').then(m => m.VenderPage) },
  { path: 'definicoes', loadComponent: () => import('./pages/definicoes/definicoes.page').then(m => m.DefinicoesPage) },

  // Páginas com Módulos (como se vê no teu explorador de ficheiros)
  { path: 'registo', loadChildren: () => import('./pages/registo/registo.module').then(m => m.RegistoPageModule) },
  { path: 'explorar', loadChildren: () => import('./pages/explorar/explorar.module').then(m => m.ExplorarPageModule) },
  { path: 'mensagens', loadChildren: () => import('./pages/mensagens/mensagens.module').then(m => m.MensagensPageModule) },
  { path: 'favoritos', loadChildren: () => import('./pages/favoritos/favoritos.module').then(m => m.FavoritosPageModule) },
  { path: 'perfil', loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilPageModule) },
  
  // AQUI: Devolvida a rota da conversa que eu tinha esquecido de adicionar!
  { path: 'conversa', loadChildren: () => import('./conversa/conversa.module').then(m => m.ConversaPageModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }