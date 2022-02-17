import { Component, OnInit } from '@angular/core';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { AlertController } from '@ionic/angular';
import { ShareDataService } from '../services/share-data.service';
import { AppComponent } from '../app.component';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  leiloes: any[] = [];
  lance: any[] = [];
  notFound: string;

  leiloesD: any[] = [];
  lanceD: any[] = [];
  notFoundD: string;

  constructor(
    private alertController: AlertController,
    private shareDataService: ShareDataService,
    private appMinimize: AppMinimize,
    private appComponent: AppComponent,
    private apiService: ApiService,
    private router: Router
    ) {
      this.appComponent.userOption();
      }
  
  ngOnInit(){
      this.getLeiloesDisponiveis();
      this.getLeiloesDestaque();
      this.notFoundD = null;
      this.notFound = null;
  }

  doRefresh(event: any) {

    this.ngOnInit();
    event.target.complete();
  }

  async getLeiloesDisponiveis(){
    this.leiloes = [];

    await this.apiService.getLeiloesDisponiveis()
    .then((result) => {
      const aux = JSON.parse(result.data);
      
      for(let v = 0; v < aux.length; v++){
        this.leiloes.push(aux[v]);
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

  async getLeiloesDestaque(){
    this.leiloesD = [];

     await this.apiService.getLeiloesDestaque()
    .then((result) => {
      const aux = JSON.parse(result.data);

      for(let v = 0; v < aux.length; v++){
        this.leiloesD.push(aux[v]);
      }
    })
    .catch((err) => {
      if(err.status == 404){
        this.notFoundD = err.error;
      } else{

        this.alertGenerico(err.error);
      }
    });
  }

  selectLeilao(leilao_id: number){
    this.router.navigateByUrl(`/leilao/${leilao_id}`);
  }

  //Caso o usuário aperte o botão de voltar no aparelho
  // é perguntado a ele se deseja realmente sair...
  async exit(){

    const alert = await this.alertController.create({
      message: 'Deseja fechar o aplicativo?',
      cssClass: 'alert-css',
      buttons: [
        {
          text: 'sim',
          cssClass: 'buttons-alert',
          handler: () => {
            this.shareDataService.deleteData();
            this.appComponent.userOption();
            this.appMinimize.minimize();
          }
        },
        {
          text: 'não',
          role: 'cancel',
          cssClass: 'buttons-alert'
        }
      ]
    });

    await alert.present();
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

}
