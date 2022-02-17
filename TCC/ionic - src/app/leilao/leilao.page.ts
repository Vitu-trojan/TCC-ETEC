import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { ShareDataService } from '../services/share-data.service';

@Component({
  selector: 'app-leilao',
  templateUrl: './leilao.page.html',
  styleUrls: ['./leilao.page.scss'],
})
export class LeilaoPage implements OnInit {

  fieldset: string;
  logado: boolean;
  participando: boolean;
  vendedor: boolean;
  st_part = 1;
  slot = 'vazio';
  rank: any[] = [];
  notFound: string;

  leilao_id: number;
  data_final: string;
  lance_inicial: number;
  lance_final: number;
  comprador_id: number;
  penultimo_lance: number;
  comprador_id2: number;
  antes_penultimo_lance: number;
  comprador_id3: number;
  status_destaque: string;
  comentarios: string;
  veiculo_id: number;
  nome: string;
  telefone: string;
  link: string;
  path_avatar: string;
  vendedor_id: number;
  leiloes_criados: number;
  participantes: number;

  renavam: string;
  fabricante: string;
  modelo: string;
  ano: string;
  cambio: string;
  cor: string;
  carroceria: string;
  combustivel: string;
  condicao: string;
  info: string;
  status_veiculo: string;

  imagem: string;
  imagem2: string;
  imagem3: string;
  imagem4: string;
  imagem5: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private alertController: AlertController,
    private shareDataService: ShareDataService,
    private router: Router
  ) { 
    this.leilao_id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getInfoLeilao();
    this.logado = false;
    this.participando = false;
    this.vendedor = false;
    this.notFound = null;
  }

  ngOnInit() {
  }

  getInfoLeilao(){
    this.apiService.getLeilao(this.leilao_id)
    .then((result) => {
      this.saveInfoLeilao(result.data);
      
      this.apiService.getVeiculo(this.veiculo_id)
      .then((result) => {
        this.saveInfoVeiculo(result.data);

        this.apiService.getLeiloesCriados(this.vendedor_id)
        .then((result) => {
          const aux = JSON.parse(result.data);
          this.leiloes_criados = aux.length;
        })
        .catch((err) => {
          if(err.status == 404){
            this.leiloes_criados = 0;
          } else{
            this.alertGenerico(err.error);
          }
        });
      })
      .catch((err) => {
        this.alertGenerico(err.error);
      });
    })
    .catch((err) => {
      this.alertGenerico(err.error);
    });
  };

  saveInfoLeilao(result: string){
    const dados = JSON.parse(result);

    this.data_final = dados.data_final;
    this.lance_inicial = dados.lance_inicial;
    this.lance_final = dados.lance_final;
    this.comprador_id = dados.comprador_id;
    this.penultimo_lance = dados.penultimo_lance;
    this.comprador_id2 = dados.comprador_id2;
    this.antes_penultimo_lance = dados.antes_penultimo_lance;
    this.comprador_id3 = dados.comprador_id3;
    this.status_destaque = dados.status_destaque;
    this.comentarios = dados.comentarios;
    this.veiculo_id = dados.veiculo_id;
    this.nome = dados.nome;
    this.telefone = dados.telefone;
    this.link = dados.link;
    this.path_avatar = dados.path_avatar;
    this.vendedor_id = dados.vendedor_id;
    this.participantes = dados.participantes;

    if(!this.shareDataService.id){
      this.telefone = 'Apenas para participantes';
      this.link = 'Apenas para participantes';

    } else{
      this.logado = true;

      if(this.vendedor_id == this.shareDataService.id){

        this.vendedor = true;
        this.participando = true;
        this.slot = 'off';
        this.st_part = 0;
        this.telefone = dados.telefone;
        this.link = dados.link;

      } else{

        //Função para saber se esse usuário está participando do leilão
        this.apiService.getLeiloesParticipando(this.shareDataService.pk)
        .then((result) => {
          const aux = JSON.parse(result.data);
          const leiloes = aux[0];

          for(let x in leiloes){
            if(this.leilao_id == leiloes[x]){
              this.participando = true;
              this.slot = 'off';
              this.st_part = 0;
              this.telefone = dados.telefone;
              this.link = dados.link;
            } 
          }

          if(!this.participando){
            this.telefone = 'Apenas para participantes';
            this.link = 'Apenas para participantes';
          }
        })
        .catch((err) => {
          this.alertGenerico(err.error);
        })
      }
      
    }
    
    if(this.status_destaque == 'on'){
      this.status_destaque = 'prime';
      //this.fieldset = 'orange';

    } else{
      this.status_destaque = 'comum';
      //this.fieldset = 'darkff';
    }

    this.createRank();
  };

  saveInfoVeiculo(result: string){
    const dados = JSON.parse(result);

    this.renavam = dados.renavam;
    this.fabricante = dados.fabricante;
    this.modelo = dados.modelo;
    this.ano = dados.ano;
    this.cambio = dados.cambio;
    this.cor = dados.cor;
    this.carroceria = dados.carroceria;
    this.combustivel = dados.combustivel;
    this.condicao = dados.condicao;
    this.info = dados.informacoes_adicionais;
    this.status_veiculo = dados.status_veiculo;
    
    this.imagem = dados.path_imagem;
    this.imagem2 = dados.path_imagem2;
    this.imagem3 = dados.path_imagem3;
    this.imagem4 = dados.path_imagem4;
    this.imagem5 = dados.path_imagem5;
  };

  goToLogin(){
    this.router.navigateByUrl('/login');
  };

  participarLeilao(lance: number){
    if(lance == undefined){
      this.alertGenerico('É necessário inserir um lance válido.');

    } else if(this.participantes == 0 && lance <= this.lance_inicial){
      this.alertGenerico(`O primeiro lance deve ser maior que o lance inicial, de R$: ${this.lance_inicial}`);
    }

    else if(lance <= this.lance_final){
      this.alertGenerico(`O seu lance deve ser maior que o último lance, de R$: ${this.lance_final}`);
    } else {

      if(!this.participando){
        this.getSlot(lance);

      } else if(this.slot == 'vazio'){
        this.alertGenerico('Você não possui espaço para ingressar em novos leilões.');

      } else{
        
        this.apiService.patchLances(
          this.leilao_id,
          lance,
          this.shareDataService.id,
          this.shareDataService.nome,
          this.shareDataService.telefone,
          this.shareDataService.pk,
          this.st_part,
          this.slot)
        .then((result) => {
          this.alertGenerico(result.data);
          this.getInfoLeilao();
        })
        .catch((err) => {
          this.alertGenerico(err.error);
        });
      }
    }
  };

  getSlot(lance: number){
    
    this.apiService.getLeiloesParticipando(this.shareDataService.pk)
    .then((result) => {
      const aux = JSON.parse(result.data);
      const leiloes = aux[0];
      var leilao;

      for(let x in leiloes){
        if(leiloes[x] == null){
          leilao = JSON.stringify(x);
        }
      }

      if(leilao && leilao.length != 0){

        this.slot = leilao;
        this.apiService.patchLances(
          this.leilao_id,
          lance,
          this.shareDataService.id,
          this.shareDataService.nome,
          this.shareDataService.telefone,
          this.shareDataService.pk,
          this.st_part,
          this.slot)
        .then((result) => {
          this.alertGenerico(result.data);
          this.getInfoLeilao();
        })
        .catch((err) => {
          this.alertGenerico(err.error);
        });

      } else if(this.slot == 'vazio'){
        this.alertGenerico('Você não possui espaço para ingressar em novos leilões.');

      } else{
        this.alertGenerico('err_APP_data');
      }
    });
  }

  createRank(){
    this.apiService.getInfoUsuarios(this.comprador_id, this.comprador_id2, this.comprador_id3)
    .then((result) => {
      const dados = JSON.parse(result.data);

      for(let x in dados){
        if(dados[x].id == this.comprador_id) this.rank[0] = {"posicao": 1, "nome": dados[x].nome, "lance": this.lance_final};
        else if(dados[x].id == this.comprador_id2) this.rank[1] = {"posicao": 2, "nome": dados[x].nome, "lance": this.penultimo_lance};
        else if(dados[x].id == this.comprador_id3) this.rank[2] = {"posicao": 3, "nome": dados[x].nome, "lance": this.antes_penultimo_lance};
      }
    })
    .catch((err) => {
      if(err.status == 404){
        this.notFound = 'Nenhum participante no momento...';

      } else{
        this.alertGenerico(err.error);
      }
    });
  }
  
  async alertGenerico(text: string){

    const alert = await this.alertController.create({
      message: text,
      cssClass: 'alert-css',
      buttons: [
        {
          text: 'ok',
          cssClass: 'buttons-alert'
        }
      ]
    });
    await alert.present();
  }
}
