import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registo',
  templateUrl: './registo.page.html',
  styleUrls: ['./registo.page.scss'],
  standalone: true, 
  imports: [IonicModule, FormsModule, CommonModule, RouterModule]
})
export class RegistoPage implements OnInit {
  
  // Variáveis que vão guardar em tempo real aquilo que o utilizador escreve nos campos
  nomeInput: string = '';
  emailInput: string = '';
  passwordInput: string = '';
  confirmarPasswordInput: string = ''; 

  // Injetamos o motor da base de dados local (Storage) e o sistema de navegação (Router)
  constructor(private storage: Storage, private router: Router) {}

  // Função nativa que corre assim que o ecrã carrega
  async ngOnInit() {
    // Liga e prepara a base de dados para podermos guardar o novo utilizador
    await this.storage.create();
  }

  // Função principal disparada quando o utilizador clica em "Criar Conta"
  async criarConta() {
    
    // 1. Validação Básica: Garante que nenhum campo ficou em branco
    if (!this.nomeInput || !this.emailInput || !this.passwordInput || !this.confirmarPasswordInput) {
      alert('Por favor, preencha todos os campos!');
      return; // Para a execução do código aqui mesmo
    }

    // 2. Validação de Segurança: Verifica se o utilizador não se enganou a escrever a palavra-passe
    if (this.passwordInput !== this.confirmarPasswordInput) {
      alert('As palavras-passe não coincidem!');
      return; // Para a execução do código aqui mesmo
    }

    // 3. Prepara um pacote de dados (Objeto) com as informações do novo utilizador
    const novaConta = {
      nome: this.nomeInput,
      email: this.emailInput,
      password: this.passwordInput
    };

    // 4. Guarda a nova conta permanentemente na memória com a chave (etiqueta) 'contaRegistada'
    await this.storage.set('contaRegistada', novaConta);
    
    // Dá um aviso visual ao utilizador de que correu tudo bem
    alert('Conta criada com sucesso!');
    
    // 5. Após o registo estar concluído, atira o utilizador automaticamente para o ecrã de Login
    this.router.navigate(['/login']);
  }
}