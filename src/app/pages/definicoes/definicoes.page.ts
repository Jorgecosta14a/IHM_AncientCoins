import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-definicoes',
  templateUrl: './definicoes.page.html',
  styleUrls: ['./definicoes.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class DefinicoesPage {

  modoEscuro: boolean = false;

  constructor(private router: Router, private alertController: AlertController) { }

  toggleModoEscuro() {
    console.log("O botão do modo escuro foi clicado! Estado:", this.modoEscuro);
    document.body.classList.toggle('dark', this.modoEscuro);
  }
  async terminarSessao() {
    const alert = await this.alertController.create({
      header: 'Terminar Sessão',
      message: 'Tens a certeza que pretendes sair da tua conta?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Sair',
          handler: () => {
            this.router.navigate(['/login']);
          }
        }
      ]
    });

    await alert.present();
  }
}
