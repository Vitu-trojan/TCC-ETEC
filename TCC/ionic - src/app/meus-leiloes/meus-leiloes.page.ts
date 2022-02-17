import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { ShareDataService } from '../services/share-data.service';

@Component({
  selector: 'app-meus-leiloes',
  templateUrl: './meus-leiloes.page.html',
  styleUrls: ['./meus-leiloes.page.scss'],
})
export class MeusLeiloesPage implements OnInit {

  notFound: string;
  leiloes: any[] = [];

  constructor(
    private apiService: ApiService,
    private shareDataService: ShareDataService,
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.notFound = null;
    this.getLeiloes();
  }

  doRefresh(event) {
    this.ngOnInit();
    event.target.complete();
  }

  async getLeiloes(){
    this.leiloes = [];

    await this.apiService.getLeiloesCriados(this.shareDataService.id)
    .then((result) => {
      const aux =  JSON.parse(result.data);

      for(let x = 0; x < aux.length; x++){
        this.leiloes.push(aux[x]);
      }
    })
    .catch((err) => {
      if(err.status == 404){
        this.notFound = err.error;
      } else{
        this.alertGenerico(err.error);
      }
    });
  }

  selectLeilao(leilao_id: number, status: string, veiculo_id: number, imagem: string){
    if(status == 'pendente'){
      this.patchLeilao(leilao_id, veiculo_id, imagem);

    } else{
      this.router.navigateByUrl(`/leilao/${leilao_id}`);
    }
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

  async patchLeilao(leilao_id: number, veiculo_id: number, imagem: string){
    const alert = await this.alertController.create({
      message: 'O período de anuncio deste leilão acabou, conseguiu negociar seu veículo?',
      cssClass: 'alert-css',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Sim',
          cssClass: 'buttons-alert',
          handler:() => {

            this.apiService.patchStatusLeilao(this.shareDataService.id, leilao_id, true, veiculo_id)
            .then(() => {
              this.alertGenerico('Que ótimo, estamos felizes por você, Obrigado por utilizar nossa plataforma, qualquer contate-nos pelo Fale conosco no Menu!');
              this.ngOnInit();
            })
            .catch((err) => {
              this.alertGenerico(err.error);
            })
          }
        },
        {
          text: 'Não',
          cssClass: 'buttons-alert',
          handler: () => {
            this.novoLeilao(leilao_id, veiculo_id, imagem);
          }
        }
      ]
    });

    await alert.present();
  }

  async novoLeilao(leilao_id: number, veiculo_id: number, imagem: string){
    const alert = await this.alertController.create({
      message: 'Que pena, gostaria de abrir outro anuncio para este veículo?',
      cssClass: 'alert-css',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Sim',
          cssClass: 'buttons-alert',
          handler: () => {
            this.apiService.patchStatusLeilao(this.shareDataService.id, leilao_id, false, veiculo_id)
            .then(() => {
              this.dadosLeilao(imagem, veiculo_id);
            })
            .catch((err) => {
              this.alertGenerico(err.error);
            })
          }
        },
        {
          text: 'Não',
          cssClass: 'buttons-alert',
          handler: () => {

            this.apiService.patchStatusLeilao(this.shareDataService.id, leilao_id, true, veiculo_id)
            .then(() => {
              this.alertGenerico('Embora não conseguimos lhe ajudar a negociar seu veículo nós agradecemos por utilizar nossa plataforma, caso tenha algum comentário envie-o no Fale Conosco no Menu.');
              this.ngOnInit();
            })
            .catch((err) => {
              this.alertGenerico(err.error);
            });
          }
        }
      ]
    });
    await alert.present();
  }

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

  async dadosLeilao(imagem: string, veiculo_id: number){
    
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
            this.criarLeilao(data.DataFinal, data.LanceInicial, veiculo_id, imagem);
          }
        },
        {
          text: 'cancelar',
          role: 'cancel',
          cssClass: 'buttons-alert',
          handler: () => {
            this.apiService.patchStatusVeiculo(this.shareDataService.id, veiculo_id, 'indisponível')
            .catch((err) => {
              this.alertGenerico(err.error);
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async criarLeilao(data_final: string, lance_inicial: number, veiculo_id: number, imagem: string){

      const anoN = data_final.substring(0,4);
      const mesN = data_final.substring(5,7);
      const diaN = data_final.substring(8,10);
      const data  = diaN+'/'+mesN+'/'+anoN;

      await this.apiService.postLeilao(imagem, data, lance_inicial, this.shareDataService.id, veiculo_id)
      .then((result) => {
        this.alertGenerico(result.data);
        this.ngOnInit();
      })
      .catch((err) => {
        this.alertGenerico(err.error);
      });
  }
}
