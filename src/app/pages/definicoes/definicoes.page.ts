import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router'; // Router é usado para navegar entre páginas

@Component({
  selector: 'app-definicoes',
  templateUrl: './definicoes.page.html',
  styleUrls: ['./definicoes.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class DefinicoesPage {

  // Variável ligada ao botão de alternância (toggle) no ecrã para saber se o modo escuro está ativo
  modoEscuro: boolean = false;

  // Injetamos o Router para mudar de página (voltar ao login) e o AlertController para os pop-ups
  constructor(private router: Router, private alertController: AlertController) { }

  // Função disparada sempre que o botão do Modo Escuro é ligado ou desligado
  toggleModoEscuro() {
    console.log("O botão do modo escuro foi clicado! Estado:", this.modoEscuro);
    
    // Adiciona ou remove a classe CSS 'dark' ao corpo (body) de toda a aplicação, mudando as cores globalmente
    document.body.classList.toggle('dark', this.modoEscuro);
  }
  
  // Função para garantir que o utilizador não faz logout por engano
  async terminarSessao() {
    // Cria um alerta (pop-up) no ecrã
    const alert = await this.alertController.create({
      header: 'Terminar Sessão',
      message: 'Tens a certeza que pretendes sair da tua conta?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel' // O botão "Cancelar" simplesmente fecha o aviso sem fazer nada
        },
        {
          text: 'Sair',
          handler: () => {
            // Se o utilizador clicar em "Sair", a aplicação viaja de volta para a página de Login
            this.router.navigate(['/login']);
          }
        }
      ]
    });

    // Apresenta o alerta desenhado no ecrã do telemóvel
    await alert.present();
  }
}