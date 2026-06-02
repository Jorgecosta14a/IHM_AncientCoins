import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export interface Anuncio {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
  visualizacoes: number;
  mensagens: number;
}

@Injectable({
  providedIn: 'root'
})
export class AnunciosService {
  private meusAnuncios: Anuncio[] = [];
  private storagePronto = false;

  constructor(private storage: Storage) { 
    this.iniciarStorage();
  }

  async iniciarStorage() {
    await this.storage.create();
    this.storagePronto = true;
    
    const dadosGuardados = await this.storage.get('meus_anuncios');
    
    if (dadosGuardados && dadosGuardados.length > 0) {
      // TRUQUE: Esvazia e volta a encher a mesma lista, mantendo a ligação à página!
      this.meusAnuncios.length = 0;
      this.meusAnuncios.push(...dadosGuardados);
      console.log('Dados carregados do Storage!');
    } else {
      this.carregarDoJson();
    }
  }

  async carregarDoJson() {
    try {
      const resposta = await fetch('assets/moedas.json');
      const dadosIniciais = await resposta.json();
      
      this.meusAnuncios.length = 0;
      this.meusAnuncios.push(...dadosIniciais);
      this.guardarNoStorage();
      console.log('Ficheiro JSON lido com sucesso!');
    } catch (erro) {
      console.error('Erro ao ler o ficheiro JSON:', erro);
    }
  }

  private guardarNoStorage() {
    if (this.storagePronto) {
      this.storage.set('meus_anuncios', this.meusAnuncios);
    }
  }

  getMeusAnuncios() { 
    return this.meusAnuncios; 
  }

  adicionarAnuncio(anuncio: Anuncio) { 
    this.meusAnuncios.unshift(anuncio); 
    this.guardarNoStorage(); 
  }

  atualizarAnuncio(id: number, titulo: string, preco: number, imagemUrl: string) {
    const novoAnuncio: Anuncio = {
      id: id || Date.now(),
      nome: titulo,
      preco: preco,
      imagem: imagemUrl,
      visualizacoes: 0,
      mensagens: 0
    };
    this.adicionarAnuncio(novoAnuncio);
  }

  removerAnuncio(id: number) {
    // Procura a posição do anúncio e remove-o sem destruir a lista principal
    const index = this.meusAnuncios.findIndex(anuncio => anuncio.id === id);
    if (index > -1) {
      this.meusAnuncios.splice(index, 1);
      this.guardarNoStorage();
    }
  }
}