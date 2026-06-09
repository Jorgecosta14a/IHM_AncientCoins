import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true, 
  imports: [IonicModule, FormsModule, CommonModule, RouterModule]
})
export class LoginPage implements OnInit {
  
  // Variáveis que guardam o que o utilizador escreve nas caixas de texto do ecrã
  emailInput: string = '';
  passwordInput: string = '';

  // Injetamos o motor de base de dados (Storage) e o motor de navegação (Router)
  constructor(private storage: Storage, private router: Router) {}

  // Função nativa que corre assim que a página é iniciada
  async ngOnInit() {
    // É obrigatório "ligar" o motor da base de dados antes de a conseguirmos ler
    await this.storage.create();
  }

  // Função disparada quando o utilizador clica no botão "Entrar"
  async fazerLogin() {
   
    // 1. Validação de Segurança: Garante que o utilizador não tenta entrar com campos em branco
    if (!this.emailInput || !this.passwordInput) {
      alert('Por favor, preencha todos os campos!');
      return; // O 'return' cancela a função aqui mesmo e não deixa o código avançar
    }

    // 2. Vai à base de dados procurar os dados da conta que foi criada na página de Registo
    const contaGuardada = await this.storage.get('contaRegistada');

    // 3. Verificação de Credenciais (A fechadura da porta)
    if (
      contaGuardada && // Verifica se existe sequer uma conta registada
      this.emailInput === contaGuardada.email && // Verifica se o email escrito é igual ao guardado
      this.passwordInput === contaGuardada.password // Verifica se a password escrita é igual à guardada
    ) {
      // SUCESSO! Cria uma "sessão" guardando na memória quem é que acabou de entrar
      await this.storage.set('utilizadorLogado', contaGuardada);
      
      // Viaja diretamente para a página principal da aplicação
      this.router.navigate(['/explorar']);
    } else {
      // FALHA! Se o email ou a password não baterem certo, dá um aviso
      alert('Email ou Palavra-passe incorretos!');
    }
  }
}