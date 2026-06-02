import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ScreenOrientation } from '@capacitor/screen-orientation';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false // <- A correção do erro do Angular está aqui!
})
export class AppComponent {
  
  constructor(private platform: Platform) {
    this.initializeApp();
  }

  async initializeApp() {
    // Espera que o telemóvel esteja pronto
    await this.platform.ready();

    // Verifica se está a correr num telemóvel real (Capacitor) para não dar erro no PC
    if (this.platform.is('capacitor')) {
      try {
        // Bloqueia a rotação para retrato (vertical)
        await ScreenOrientation.lock({ orientation: 'portrait' });
        console.log('Ecrã bloqueado na vertical!');
      } catch (error) {
        console.error('Erro ao bloquear orientação:', error);
      }
    }
  }
}