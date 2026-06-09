import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Obrigatório para o ngModel funcionar nos campos de edição

@Component({
  selector: 'app-anuncios-ativos',
  templateUrl: './anuncios-ativos.page.html',
  styleUrls: ['./anuncios-ativos.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule, FormsModule]
})
export class AnunciosAtivosPage {

  // Array que armazena a lista de anúncios lida da memória
  listaAnuncios: any[] = [];
  
  // Variáveis para controlar o estado do Modal de edição
  isModalOpen = false;       // Controla se o ecrã de edição está visível (aberto/fechado)
  indexEditando = -1;        // Guarda a posição do anúncio que está a ser modificado no momento
  anuncioEditado: any = {};  // Objeto temporário para guardar os dados enquanto o utilizador edita

  // Injetamos o Storage para a memória local e o AlertController para os pop-ups de confirmação
  constructor(private storage: Storage, private alertCtrl: AlertController) {}

  // Função do Ionic executada sempre que o utilizador entra nesta página
  async ionViewWillEnter() {
    // 1. Inicializa o motor do Storage
    await this.storage.create();
    
    // 2. Procura a lista de anúncios guardada na memória
    const dadosGuardados = await this.storage.get('listaAnuncios');
    
    // 3. Se encontrar anúncios, carrega-os para o array da página
    if (dadosGuardados) {
      this.listaAnuncios = dadosGuardados;
    }
  }

  // Função para remover um anúncio com caixa de diálogo de confirmação
  async removerAnuncio(index: number) {
    const alerta = await this.alertCtrl.create({
      header: 'Apagar Anúncio',
      message: 'Tem a certeza que deseja remover este anúncio?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { 
          text: 'Apagar', 
          role: 'destructive', // Estiliza o botão em vermelho no telemóvel
          handler: async () => {
            // Remove o anúncio do array local com base na sua posição (index)
            this.listaAnuncios.splice(index, 1);
            // Atualiza a base de dados local com a nova lista (sem o anúncio apagado)
            await this.storage.set('listaAnuncios', this.listaAnuncios);
          }
        }
      ]
    });
    await alerta.present();
  }

  // --- Funções para o Sistema de Edição Completa ---

  // 1. Ativada ao clicar em "Editar": abre o Modal e isola os dados do anúncio escolhido
  editarAnuncio(index: number) {
    this.indexEditando = index;
    
    // Cria uma cópia profunda (clone) do anúncio selecionado.
    // Isto garante que o anúncio original no ecrã não muda até que o utilizador clique em "Guardar".
    this.anuncioEditado = JSON.parse(JSON.stringify(this.listaAnuncios[index]));
    
    // Mostra o Modal de edição
    this.isModalOpen = true;
  }

  // 2. Fecha o Modal descartando qualquer alteração feita
  fecharEdicao() {
    this.isModalOpen = false;
  }

  // 3. Valida e guarda permanentemente os novos dados editados
  async guardarEdicao() {
    // Validação de segurança simples: obriga a ter título e preço
    if (!this.anuncioEditado.titulo || !this.anuncioEditado.preco) {
      window.alert('Por favor, preencha pelo menos o título e o preço!');
      return;
    }
    
    // Substitui o anúncio antigo no array local pelos novos dados editados
    this.listaAnuncios[this.indexEditando] = this.anuncioEditado;
    
    // Grava a lista atualizada de forma permanente no Storage
    await this.storage.set('listaAnuncios', this.listaAnuncios);
    
    // Fecha o Modal de edição e regressa à listagem normal
    this.isModalOpen = false; 
  }

  // 4. Lida com a substituição da foto do anúncio durante o processo de edição
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      
      // Converte o ficheiro de imagem para uma string Base64 para que o Storage o possa salvar
      reader.onload = (e: any) => {
        this.anuncioEditado.foto = e.target.result;
      };
      
      reader.readAsDataURL(file);
    }
  }
}