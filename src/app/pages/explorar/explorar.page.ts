import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { FavoritosService, Moeda } from '../../services/favoritos.service';

@Component({
  selector: 'app-explorar',
  templateUrl: './explorar.page.html',
  styleUrls: ['./explorar.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class ExplorarPage implements OnInit {
  
  // Variáveis que guardam o que o utilizador digita nas caixas de pesquisa e filtros
  termoPesquisa: string = '';
  precoMin: number | null = null;
  precoMax: number | null = null;
  filtroCondicao: string = '';
  filtroRaridade: string = '';

  // Base de dados simulada (Mock Data). É esta a lista fixa de moedas e vendedores que alimenta a aplicação
  moedas: any[] = [
    { id: 1, nome: 'Moeda Romana Nero', preco: 750, imagem: 'assets/moedas/moeda_romana_nero.jpg', favorito: false, condicao: 'Gasto', raridade: 'Muito raro', vendedor: { nome: 'André Nogueira', avatar: 'https://i.pravatar.cc/150?img=11' } },
    { id: 2, nome: 'Escudo Portugal 1975', preco: 1890, imagem: 'assets/moedas/escudo_1975.jpg', favorito: false, condicao: 'Bom', raridade: 'Raro', vendedor: { nome: 'Pedro Morais', avatar: 'https://i.pravatar.cc/150?img=12' } },
    { id: 3, nome: 'Moeda Portuguesa 1962', preco: 1230, imagem: 'assets/moedas/moeda_portugual_1962.jpg', favorito: false, condicao: 'Muito Bom', raridade: 'Comum', vendedor: { nome: 'Miguel Miranda', avatar: 'https://i.pravatar.cc/150?img=13' } },
    { id: 4, nome: 'Moeda D. João V', preco: 3450, imagem: 'assets/moedas/peca_joaov_ouro.jpg', favorito: false, condicao: 'Muito Bom', raridade: 'Muito raro', vendedor: { nome: 'Duarte Bravo', avatar: 'https://i.pravatar.cc/150?img=14' } },
    { id: 5, nome: 'Dobrão D. João V', preco: 4500, imagem: 'assets/moedas/Dobrao_djoaoV.jpg', favorito: false, condicao: 'Novo', raridade: 'Muito raro', vendedor: { nome: 'Diana Vieira', avatar: 'https://i.pravatar.cc/150?img=5' } },
    { id: 6, nome: 'Escudo Prata 1914', preco: 320, imagem: 'assets/moedas/escudo_prata1914.jpg', favorito: false, condicao: 'Bom', raridade: 'Comum', vendedor: { nome: 'André Nogueira', avatar: 'https://i.pravatar.cc/150?img=11' } }
  ];

  // Esta é a lista que é REALMENTE desenhada no HTML. Começa igual à original, mas vai encolhendo conforme filtramos.
  moedasFiltradas: any[] = [];

  // Injetamos o serviço de favoritos para gravar no Storage e o Router para navegar
  constructor(private favoritosService: FavoritosService, private router: Router) {}

  // Função disparada no exato momento em que a página nasce
  ngOnInit() {
    // Faz uma cópia exata da lista original de moedas para o ecrã mostrar logo tudo
    this.moedasFiltradas = [...this.moedas];
  }

  // Função ao clicar num cartão de uma moeda
  abrirDetalhes(moeda: any) {
    // Viaja para a página 'detalhes-moeda' enviando a moeda inteira na "mochila" (state) do sistema de navegação
    this.router.navigate(['/detalhes-moeda'], { state: { moeda: moeda } });
  }

  // Função para adicionar/remover o coraçãozinho
  toggleFavorito(moeda: Moeda) {
    this.favoritosService.toggleFavorito(moeda);
  }

  // Função dos botões de Condição (Novo, Bom, Gasto, etc)
  selecionarCondicao(condicao: string) {
    // Se clicar no botão que já estava ativo, desliga o filtro. Se for num novo, ativa-o.
    if (this.filtroCondicao === condicao) { this.filtroCondicao = ''; }
    else { this.filtroCondicao = condicao; }
    
    // Atualiza a lista no ecrã
    this.aplicarFiltros();
  }

  // Função dos botões de Raridade (Comum, Raro, etc)
  selecionarRaridade(raridade: string) {
    // Mesma lógica de ligar/desligar da Condição
    if (this.filtroRaridade === raridade) { this.filtroRaridade = ''; }
    else { this.filtroRaridade = raridade; }
    
    this.aplicarFiltros();
  }

  // O "Motor" da Pesquisa: Cruza todos os campos preenchidos e corta a lista de moedas
  aplicarFiltros() {
    this.moedasFiltradas = this.moedas.filter(m =>
      // 1. O nome da moeda inclui o que foi escrito na barra de pesquisa?
      (this.termoPesquisa ? m.nome.toLowerCase().includes(this.termoPesquisa.toLowerCase()) : true) &&
      
      // 2. O preço da moeda é maior que o mínimo preenchido?
      (this.precoMin ? m.preco >= this.precoMin : true) &&
      
      // 3. O preço da moeda é menor que o máximo preenchido?
      (this.precoMax ? m.preco <= this.precoMax : true) &&
      
      // 4. A condição da moeda é igual à do botão pressionado?
      (this.filtroCondicao ? m.condicao === this.filtroCondicao : true) &&
      
      // 5. A raridade da moeda é igual à do botão pressionado?
      (this.filtroRaridade ? m.raridade === this.filtroRaridade : true)
    );
  }
}