import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-detalhes-moeda',
  templateUrl: './detalhes-moeda.page.html',
  styleUrls: ['./detalhes-moeda.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DetalhesMoedaPage implements OnInit {
  constructor() { }
  ngOnInit() { }
}