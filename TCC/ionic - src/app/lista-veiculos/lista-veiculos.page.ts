import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { ShareDataService } from '../services/share-data.service'

@Component({
  selector: 'app-lista-veiculos',
  templateUrl: './lista-veiculos.page.html',
  styleUrls: ['./lista-veiculos.page.scss'],
})
export class ListaVeiculosPage implements OnInit {

  results: any[] = [];
  notfound: string;

  constructor(
    private api: ApiService,
    private shareData: ShareDataService,
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.listarVeiculos();
    this.notfound = null;
  }

  doRefresh(event: any) {
    this.ngOnInit();
    event.target.complete();
  }

  //através do array com dados recebidos da api, é criada um lista com estes veículos.
  listarVeiculos(){
    this.results = [];

    this.api.getProdutos(this.shareData.id)
    .then((result) => {
      const aux = JSON.parse(result.data);

      for(let v = 0; v < aux.length; v++){
        this.results.push(aux[v]);
      }
    })
    .catch((err) => {
      if(err.status == 404){
        this.notfound = err.error;

      } else{
        this.alertGenerico(err.error);
      }
    });
  }

  //
  verVeiculo(veiculo_id: number, status_veiculo: string){
    if(status_veiculo == 'disponível'){
      this.router.navigateByUrl(`info-veiculo/${veiculo_id}`);

    } else{
      this.alertGenerico('O veículo não está disponível para leilão.');
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
}
