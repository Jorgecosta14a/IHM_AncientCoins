import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Necessário para os botões de navegação funcionarem

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true, 
  imports: [IonicModule, CommonModule, FormsModule, RouterModule] 
})
export class PerfilPage {
  
  // Objeto que guarda os dados visíveis no ecrã. Começa com valores padrão.
  utilizador = { 
    nome: 'A Carregar...', 
    foto: 'assets/icon/favicon.png' 
  };
  
  // Variável que controla se estamos em modo de edição de nome ou não
  isEditingName: boolean = false;

  // Injetamos o motor de base de dados local (Storage)
  constructor(private storage: Storage) {}

  // Função nativa do Ionic que corre automaticamente sempre que entramos na página
  async ionViewWillEnter() {
    // 1. Inicializa o motor da base de dados
    await this.storage.create();
    
    // 2. Vai buscar os dados da conta que fez login
    const contaGuardada = await this.storage.get('utilizadorLogado');
    
    // 3. Se existir alguém logado, atualiza o nome e a foto no ecrã
    if (contaGuardada) {
      this.utilizador.nome = contaGuardada.nome || 'Utilizador';
      this.utilizador.foto = contaGuardada.foto || this.utilizador.foto;
    }
  }

  // Função disparada ao clicar no ícone do lápis para editar o nome
  async toggleEditName() {
    // Alterna entre o modo de edição (verdadeiro/falso)
    this.isEditingName = !this.isEditingName;
    
    // Se o modo de edição acabou de ser desligado (significa que o utilizador guardou o nome)
    if (!this.isEditingName) {
      // Vai buscar a conta atual à memória
      let conta = await this.storage.get('utilizadorLogado');
      
      if (conta) {
        // Atualiza o nome da conta e guarda de novo na base de dados
        conta.nome = this.utilizador.nome;
        await this.storage.set('utilizadorLogado', conta);
      }
    }
  }

  // Função disparada ao escolher uma nova foto de perfil (ficheiro)
  async onFileSelected(event: any) {
    const file = event.target.files[0];
    
    // Se foi escolhido um ficheiro válido
    if (file) {
      const reader = new FileReader();
      
      // Quando o ficheiro terminar de ser lido
      reader.onload = async (e: any) => {
        // Atualiza a foto no ecrã (convertida para texto Base64)
        this.utilizador.foto = e.target.result;
        
        // Guarda a nova foto permanentemente na base de dados do utilizador
        let conta = await this.storage.get('utilizadorLogado');
        if (conta) {
          conta.foto = this.utilizador.foto;
          await this.storage.set('utilizadorLogado', conta);
        }
      };
      
      // Inicia a conversão da imagem para formato de texto (URL de dados)
      reader.readAsDataURL(file);
    }
  }
}