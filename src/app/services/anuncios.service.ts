import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

// INTERFACE: A "fôrma" obrigatória. Cada anúncio na aplicação tem de respeitar esta estrutura exata.
export interface Anuncio {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
  visualizacoes: number;
  mensagens: number;
}

// O decorador @Injectable diz ao Angular que este ficheiro é um "Serviço" global ('root').
// Isto significa que qualquer página pode usar este serviço e todas vão partilhar a mesma lista de anúncios.
@Injectable({
  providedIn: 'root'
})
export class AnunciosService {
  
  // Lista principal de anúncios (começa vazia)
  private meusAnuncios: Anuncio[] = [];
  
  // Variável de segurança para garantir que não tentamos gravar dados antes de o Storage estar ligado
  private storagePronto = false;

  // O constructor injeta a base de dados (Storage) e arranca imediatamente o processo de inicialização
  constructor(private storage: Storage) { 
    this.iniciarStorage();
  }

  // Prepara a base de dados e carrega os anúncios que foram guardados na última sessão
  async iniciarStorage() {
    await this.storage.create();
    this.storagePronto = true; // Confirma que o motor está a trabalhar
    
    // Procura na memória do telemóvel se já existem anúncios gravados com a chave 'meus_anuncios'
    const dadosGuardados = await this.storage.get('meus_anuncios');
    
    if (dadosGuardados && dadosGuardados.length > 0) {
      // TRUQUE AVANÇADO: Se fizéssemos "this.meusAnuncios = dadosGuardados", o Angular perdia a ligação
      // visual com as páginas. Ao fazer ".length = 0" e ".push", esvaziamos e voltamos a encher a mesma lista,
      // garantindo que os ecrãs atualizam automaticamente!
      this.meusAnuncios.length = 0;
      this.meusAnuncios.push(...dadosGuardados);
      console.log('Dados carregados do Storage!');
    } else {
      // Se não houver nada gravado (ex: primeira vez a abrir a app), vai buscar os dados de exemplo
      this.carregarDoJson();
    }
  }

  // Função de recurso (Fallback): Lê o ficheiro local com as moedas de teste para a app nunca aparecer vazia
  async carregarDoJson() {
    try {
      // Acede ao ficheiro local do projeto
      const resposta = await fetch('assets/moedas.json');
      const dadosIniciais = await resposta.json();
      
      // Usa o mesmo truque de esvaziar e encher a lista com os dados de teste
      this.meusAnuncios.length = 0;
      this.meusAnuncios.push(...dadosIniciais);
      
      // Grava estes dados de teste permanentemente no telemóvel
      this.guardarNoStorage();
      console.log('Ficheiro JSON lido com sucesso!');
    } catch (erro) {
      console.error('Erro ao ler o ficheiro JSON:', erro);
    }
  }

  // Função interna de segurança: Só guarda dados se o motor do Storage estiver ligado e pronto
  private guardarNoStorage() {
    if (this.storagePronto) {
      this.storage.set('meus_anuncios', this.meusAnuncios);
    }
  }

  // Entrega a lista de anúncios a qualquer página que a peça
  getMeusAnuncios() { 
    return this.meusAnuncios; 
  }

  // Adiciona um anúncio novo. O "unshift" mete o anúncio no INÍCIO da lista (no topo do ecrã) em vez de no fim.
  adicionarAnuncio(anuncio: Anuncio) { 
    this.meusAnuncios.unshift(anuncio); 
    this.guardarNoStorage(); // Grava imediatamente na memória
  }

  // Pega nos dados vindos de um formulário e cria um objeto formatado antes de adicionar à lista
  atualizarAnuncio(id: number, titulo: string, preco: number, imagemUrl: string) {
    const novoAnuncio: Anuncio = {
      id: id || Date.now(), // Se não trouxer um ID, gera um ID único automático baseado na data/hora
      nome: titulo,
      preco: preco,
      imagem: imagemUrl,
      visualizacoes: 0,
      mensagens: 0
    };
    
    // Aproveita a função que já existe para o meter na lista e gravar
    this.adicionarAnuncio(novoAnuncio);
  }

  // Remove um anúncio definitivo através do seu ID único
  removerAnuncio(id: number) {
    // Procura a posição exata (index) do anúncio dentro da lista
    const index = this.meusAnuncios.findIndex(anuncio => anuncio.id === id);
    
    // Se encontrar (o index é maior que -1)
    if (index > -1) {
      // Corta (splice) exatamente 1 elemento naquela posição
      this.meusAnuncios.splice(index, 1);
      
      // Atualiza a memória permanente para refletir a eliminação
      this.guardarNoStorage();
    }
  }
}