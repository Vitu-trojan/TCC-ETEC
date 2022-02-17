import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-resultado-leiloes',
  templateUrl: './resultado-leiloes.page.html',
  styleUrls: ['./resultado-leiloes.page.scss'],
})
export class ResultadoLeiloesPage implements OnInit {

  pesquisar: string;
  result: any[] = [];
  notFound: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private alertController: AlertController
  ){
    this.notFound = null;
    this.pesquisar = this.activatedRoute.snapshot.paramMap.get('pesquisa');
    this.getPesquisaLeilao();
   }

  ngOnInit() {
  }

  getPesquisaLeilao(){
    this.result = [];

    this.apiService.getPesquisaLeiloes(this.pesquisar)
    .then((result) => {
      const aux = JSON.parse(result.data);
      
      for(let v = 0; v < aux.length; v++){
        this.result.push(aux[v]);
      }
    })
    .catch((err) => {
      if(err.status == 404){
        this.notFound = err.error;
        if(err.error == 'Caminho não encontrado!') this.notFound = 'Não foram encontrados leilões com esta informação.';
        
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
  };
}
