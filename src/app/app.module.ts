import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

// Ferramentas principais do Ionic para o design e navegação no telemóvel
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

// O motor da base de dados local (Storage) que usámos para guardar os anúncios e o login
import { IonicStorageModule } from '@ionic/storage-angular'; 

// A página "Mãe" (a raiz da aplicação onde tudo começa) e o "GPS" (as rotas)
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// O @NgModule é a "caixa principal" que empacota e configura a aplicação inteira
@NgModule({
  // DECLARATIONS: Diz ao Angular quais são os componentes/páginas tradicionais que pertencem a este módulo.
  // Neste caso, apenas a página principal (AppComponent).
  declarations: [AppComponent],
  
  // IMPORTS: É aqui que ligamos os "motores" globais da aplicação.
  imports: [
    BrowserModule, // Permite que a aplicação corra num navegador web
    IonicModule.forRoot(), // Inicia todos os botões, menus e estilos visuais do Ionic
    AppRoutingModule, // Liga o sistema de navegação (o tal mapa de rotas que vimos há pouco)
    IonicStorageModule.forRoot() // Inicia o motor da base de dados local para toda a app usar!
  ],
  
  // PROVIDERS: Configurações de serviços extra. 
  // Aqui dizemos ao Angular para usar a estratégia de navegação do Ionic (animações de deslizar, histórico, etc).
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  
  // BOOTSTRAP: Qual é a primeira página que o telemóvel deve carregar quando abres a aplicação?
  // O AppComponent é sempre o ponto de partida padrão.
  bootstrap: [AppComponent],
})
export class AppModule {}