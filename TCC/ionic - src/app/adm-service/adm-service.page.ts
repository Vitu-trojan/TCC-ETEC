import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AlertController } from '@ionic/angular';
import { ShareDataService } from '../services/share-data.service';

@Component({
  selector: 'app-adm-service',
  templateUrl: './adm-service.page.html',
  styleUrls: ['./adm-service.page.scss'],
})
export class AdmServicePage implements OnInit {

  result: any[] = [];
  servico: string;
  pk: string;
  tipo: number;
  notFound: string;

  leiloes: boolean;
  usuarios: boolean;
  veiculos: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private shareDataService: ShareDataService,
    private alertController: AlertController,
    private router: Router
  ) { 
    this.servico = this.activatedRoute.snapshot.paramMap.get('servico');
    this.getServico();
    this.notFound = null;
    this.leiloes = false;
    this.usuarios = false;
    this.veiculos = false;
  }

  ngOnInit() {
  }

  getServico(){
    this.pk = this.shareDataService.pk;
    this.tipo = this.shareDataService.tipo;
    this.result = [];

    if(this.servico == 'usuarios'){
      this.apiService.getAllUsuarios(this.pk, this.tipo)
      .then((result) => {
        this.saveResults(result.data);
        this.usuarios = true;
      })
      .catch((err) => {
        this.notFound = err.error;
      });
      
    } else if(this.servico == 'leiloes'){
      this.apiService.getAllLeiloes(this.pk, this.tipo)
      .then((result) => {
        this.saveResults(result.data);
        this.leiloes = true;
      })
      .catch((err) => {
        this.notFound = err.error;
      });

    } else if(this.servico == 'veiculos'){
      this.apiService.getAllVeiculos(this.pk, this.tipo)
      .then((result) => {
        this.saveResults(result.data);
        this.veiculos = true;
      })
      .catch((err) => {
        this.notFound = err.error;
      });
    } else{
      this.alertGenerico('Dados não encontrados.');
    }
  }

  saveResults(result: string){
    const aux = JSON.parse(result);

      for(let v = 0; v < aux.length; v++){
        this.result.push(aux[v]);
      }
  }

  verLeilao(leilao_id: number){
    this.router.navigateByUrl(`/leilao/${leilao_id}`);
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
