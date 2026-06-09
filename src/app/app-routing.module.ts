import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// ARRAY DE ROTAS: O grande mapa da aplicação.
// Liga um 'caminho' (texto) ao respetivo ficheiro que deve ser carregado no ecrã.
const routes: Routes = [
  
  // 1. Rota Padrão: Quando a app abre sem nenhum caminho específico (ex: localhost:8100/),
  // é automaticamente redirecionada para a página de 'login'.
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  // --- PÁGINAS STANDALONE ---
  // São páginas modernas do Angular que não precisam de um ficheiro ".module.ts" próprio.
  // Usam a função 'loadComponent' para carregar a página diretamente para a memória.
  { path: 'login', loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage) },
  { path: 'anuncios-ativos', loadComponent: () => import('./pages/anuncios-ativos/anuncios-ativos.page').then(m => m.AnunciosAtivosPage) },
  { path: 'vender', loadComponent: () => import('./pages/vender/vender.page').then(m => m.VenderPage) },
  { path: 'definicoes', loadComponent: () => import('./pages/definicoes/definicoes.page').then(m => m.DefinicoesPage) },
  { path: 'detalhes-moeda', loadComponent: () => import('./pages/detalhes-moeda/detalhes-moeda.page').then(m => m.DetalhesMoedaPage) },

  // --- PÁGINAS TRADICIONAIS (Com Módulos) ---
  // São páginas clássicas do Ionic que têm um ficheiro próprio ".module.ts".
  // Usam a função 'loadChildren' para carregar o pacote inteiro (HTML, SCSS, TS e Módulo).
  { path: 'registo', loadChildren: () => import('./pages/registo/registo.module').then(m => m.RegistoPageModule) },
  { path: 'explorar', loadChildren: () => import('./pages/explorar/explorar.module').then(m => m.ExplorarPageModule) },
  { path: 'mensagens', loadChildren: () => import('./pages/mensagens/mensagens.module').then(m => m.MensagensPageModule) },
  { path: 'favoritos', loadChildren: () => import('./pages/favoritos/favoritos.module').then(m => m.FavoritosPageModule) },
  { path: 'perfil', loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilPageModule) },
  { path: 'conversa', loadChildren: () => import('./conversa/conversa.module').then(m => m.ConversaPageModule) }
];

@NgModule({
  // O Angular carrega o mapa de rotas ('routes') com uma estratégia especial: 'PreloadAllModules'.
  // Isto faz com que a app carregue as outras páginas de forma invisível nos bastidores (background),
  // para que quando o utilizador clicar num botão, a próxima página abra instantaneamente, sem encravar.
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }