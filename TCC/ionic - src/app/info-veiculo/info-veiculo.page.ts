import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { ShareDataService } from '../services/share-data.service';


@Component({
  selector: 'app-info-veiculo',
  templateUrl: './info-veiculo.page.html',
  styleUrls: ['./info-veiculo.page.scss'],
})
export class InfoVeiculoPage implements OnInit {

  veiculo_id: number;
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
    private api: ApiService,
    private alertController: AlertController,
    private shareDataService: ShareDataService,
    private router: Router,
  ) {
    this.veiculo_id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.loadInfoVeiculo();
   }

  ngOnInit() {
  }

  //Resgatando informções de um veículo em específico com o id.
  loadInfoVeiculo(){
    this.api.getVeiculo(this.veiculo_id)
    .then((result) => {
      this.saveInfo(result.data);
    })
    .catch((err) => {
      this.alertGenerico(err.error);
    });
  };

  //Salvando as informações recebidas da api.
  saveInfo(info: string){
    const dados = JSON.parse(info);

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

  async infoDestaque(){
    const alert = await this.alertController.create({
      cssClass: 'alert-css',
      message:'Você sabia que aqui na QuemDa+ há um destaque de anuncio? Não? Em destaque, seu veículo fica no topo dos anúncios e pode ser visto 2xMAIS! Quer contratar destaque para seus anúncios?',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Sim',
          cssClass: 'buttons-alert',
          handler: () => {
            this.mensagemUsuario('Digite aqui: "Quero destaque nos meus anúncios!"');
          }
        },
        {
          text: 'Não',
          cssClass: 'buttons-alert',
          handler: () => {
            this.dadosLeilao();
          }
        }
      ]
    });

    await alert.present();
  }

  //Prompt que faz a pergunta ao usuario sobre as informações do leilão.
  async dadosLeilao(){
    
    //pega o dia atual como o dia minimo para terminar o leilão.
    const today = this.getToday();

    const alert = await this.alertController.create({
      cssClass: 'alert-css',
      message: 'Insira os dados necessários para criar um leilão (primeiro campo: até que data vai ficar aberto o anuncio. segundo campo: o valor mínimo para o primeiro lance.)',
      backdropDismiss: false,
      inputs: [
        {
          name: 'DataFinal',
          type: 'date',
          min: today,
        },
        {
          name: 'LanceInicial',
          placeholder: 'Lance inicial: Ex. 35000',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'criar',
          cssClass: 'buttons-alert',
          handler: (data) => {
            this.criarLeilao(data.DataFinal, data.LanceInicial);
          }
        },
        {
          text: 'cancelar',
          role: 'cancel',
          cssClass: 'buttons-alert',
          handler: () => {}
        }
      ]
    });

    await alert.present();
  }

  async criarLeilao(data_final: string, lance_inicial: number){

      const anoN = data_final.substring(0,4);
      const mesN = data_final.substring(5,7);
      const diaN = data_final.substring(8,10);
      const data  = diaN+'/'+mesN+'/'+anoN;

      await this.api.postLeilao(this.imagem, data, lance_inicial, this.shareDataService.id, this.veiculo_id)
      .then((result) => {
        this.alertGenerico(result.data);
        this.router.navigateByUrl('/guias-veiculos');
      })
      .catch((err) => {
        this.alertGenerico(err.error);
      });
  }

  //Método para pegar o dia atual.
  getToday(){

    var data = new Date();
    var aux = data.getDate();
    var mes = data.getMonth();
    var ano = data.getFullYear().toString().substr(0,4);

    var dia = aux.toString();
    if(aux.toString.length == 1){
      var aux2 = '0' + aux.toString(); 
      dia = aux2;
    }
    
    const today: string = ano + '-' + (mes+1) + '-' + dia;
    return today;
  }

  //Prompt genérico para informar o usuário.
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

  async mensagemUsuario(msg?: string){
    if(!msg || msg.length == 0){
      msg = 'Digite aqui...';
    }
    const alert = await this.alertController.create({
      cssClass: 'alert-css',
      message: 'Dúvidas, críticas ou sugestões? Escreva aqui que vamos fazer o possível para te ajudar!',
      inputs: [
        {
          name: 'textUser',
          type: 'textarea',
          placeholder: msg,
        }
      ],
      buttons: [
        {
          text: 'Enviar',
          cssClass: 'buttons-alert',
          handler: (data) => {
            if(data.textUser.length == 0){
              this.mensagemUsuario('Preencha este campo antes de enviar!');

            } else{
              this.enviarEmail(data.textUser);
            }
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'buttons-alert'
        }
      ]
    });

    await alert.present();
  }

  enviarEmail(mensagem: string){
    const nome  = this.shareDataService.nome;
    const email = this.shareDataService.email;

    this.api.postEmail(mensagem, email, nome)
    .then((result) => {
      this.alertGenerico(result.data);
    })
    .catch((err) => {
      this.alertGenerico(err.error);
    });
  }
}
