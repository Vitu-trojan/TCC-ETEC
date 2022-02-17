import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { ShareDataService } from '../services/share-data.service';

@Component({
  selector: 'app-em-leiloes',
  templateUrl: './em-leiloes.page.html',
  styleUrls: ['./em-leiloes.page.scss'],
})
export class EmLeiloesPage implements OnInit {

  participando: any[] = [];
  leiloes: any[] = [];
  notFound: string;

  constructor(
    private shareDataService: ShareDataService,
    private apiService: ApiService,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.getLeiloesOn();
    this.notFound = null;
  }

  doRefresh(event: any) {
    this.ngOnInit();
    event.target.complete();
  }

  async getLeiloesOn(){
    this.leiloes = [];
    await this.apiService.getLeiloesParticipando(this.shareDataService.pk)
    .then((result) => {
      const aux = JSON.parse(result.data);

      for(let x in aux[0]){
        if(aux[0][x] != null) this.leiloes.push(aux[0][x]);
      }

      if(this.leiloes.length == 0){
        this.notFound = 'Você não está participando de leilões no momento.';
        
      } else{
        this.getLeiloes();
      }
    })
    .catch((err) => {
      if(err.status == 404){
        this.notFound = err.error;

      } else {
        this.alertGenerico(err.error);
      }
    });
  }

  async getLeiloes(){
    this.participando = [];
    for(let x=0; x<this.leiloes.length; x++){

      await this.apiService.getLeilaoParticipando(this.leiloes[x])
      .then((result) => {
        const aux =  JSON.parse(result.data);
        this.participando.push(aux[0]);
      })
      .catch((err) => {
        if(err.status == 404){
          this.notFound = err.error;

        } else {
          this.alertGenerico(err.error);
        }
      });
    }
  }

  selectLeilao(leilao_id: number, status: string){
    if(status != 'disponível'){
      this.sairLeilao(this.shareDataService.pk, leilao_id);

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

  async sairLeilao(usuario_pk: string, leilao_id: number){

    const alert = await this.alertController.create({
      message: 'Este leilão não está mais disponível, para que você possa ingressar em outros leilões vamos tirar este leilão da sua lista de leilões em que está participando. Caso você ficou com o maior lance e não entrou em contato com o vendedor o vendedor pode escolher entre outro comprador com maior lance depois de você ou iniciar outro leilão com o mesmo veículo. Dúvidas, críticas ou sugestões contate-nos em Menu > Fale Conosco.',
      backdropDismiss: false,
      cssClass: 'alert-css',
      buttons: [
        {
          text: 'ok',
          cssClass: 'buttons-alert',
          handler: () => {

            this.apiService.patchLeilao(usuario_pk, leilao_id)
            .then((result) => {
              this.alertGenerico(result.data);
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
}
