import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { ShareDataService } from '../services/share-data.service';

@Component({
  selector: 'app-cadastro-veiculo',
  templateUrl: './cadastro-veiculo.page.html',
  styleUrls: ['./cadastro-veiculo.page.scss'],
})
export class CadastroVeiculoPage implements OnInit {

  imagem: File;
  imagem2: File;
  imagem3: File;
  imagem4: File;
  imagem5: File;
  
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

  constructor(
    private api:ApiService,
    private shareData:ShareDataService,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
  }


  //métodos para pegar individualmente imagens do veículo, decidi deixar assim para caso houver uma escolha errada em algum dos inputs, será possível o usuário clicar e alterar no mesmo.
  loadImageFromDevice(event: any) {

    if(event.target.files && event.target.files[0]){
      this.imagem = event.target.files[0];

    } else{
      this.imagem = File[''];
    }
  };

  loadImageFromDevice2(event: any) {

    if(event.target.files && event.target.files[0]){
      this.imagem2 = event.target.files[0];

    } else{
      this.imagem2 = File[''];
    }
  };

  loadImageFromDevice3(event: any) {

    if(event.target.files && event.target.files[0]){
      this.imagem3 = event.target.files[0];

    } else{
      this.imagem3 = File[''];
    }
  };

  loadImageFromDevice4(event: any) {

    if(event.target.files && event.target.files[0]){
      this.imagem4 = event.target.files[0];

    } else{
      this.imagem4 = File[''];
    }
  };

  loadImageFromDevice5(event: any) {

    if(event.target.files && event.target.files[0]){
      this.imagem5 = event.target.files[0];

    } else{
      this.imagem5 = File[''];
    }
  };
  //-------------------------------------------//

  //Método onde verifico os valores recebidos nas variáveis do formulário e chamo o método que envia para a API.
  getInfoCadastro(
    renavam:string,
    fabricante:string,
    modelo:string,
    ano:string,
    cambio:string,
    cor:string,
    carroceria:string,
    combustivel:string,
    condicao:string,
    info:string
  ){
    
    if(
      renavam == null ||
      fabricante == null ||
      modelo == null ||
      ano == null ||
      cambio == null ||
      cor == null ||
      carroceria == null ||
      combustivel == null ||
      condicao == null
    ){
      this.alertGenerico('Preencha todos os campos obrigatórios.');

    } else if(this.imagem == null || this.imagem.size == 0){
      this.alertGenerico('Envie pelo menos uma imagem do veículo no primeiro campo.');

    } else if(
      renavam.length == 0 ||
      fabricante.length == 0 ||
      modelo.length == 0 ||
      ano.length == 0 ||
      cambio.length == 0 ||
      cor.length == 0 ||
      carroceria.length == 0 ||
      combustivel.length == 0 ||
      condicao.length == 0
    ){
      this.alertGenerico('Algum dos campos obrigatórios está vazio.');

    } else {
      
      this.renavam = renavam;
      this.fabricante = fabricante;
      this.modelo = modelo;
      this.ano = ano;
      this.cambio = cambio;
      this.cor = cor;
      this.carroceria = carroceria;
      this.combustivel = combustivel;
      this.condicao = condicao;
      this.info = info; 

      this.cadastrarVeiculo();
    }
  }

  //Método que recebera as informações do veículo e ás enviará para a API.
  cadastrarVeiculo(){

      this.api.postVeiculo(this.renavam, this.fabricante, this.modelo, this.ano, this.cambio, this.cor, this.carroceria, this.combustivel, this.condicao, this.info, this.shareData.id)
      .then((result) => {
        this.enviarImagensVeiculo();
        this.alertGenerico(result.data);
        this.router.navigateByUrl('/guias-veiculos');
      })
      .catch((err) => {
        this.alertGenerico(err.error);
      });
      
  }
  //----------------------------------------------//


  //Métodos que vão subir as imagens para a API.
  async cadastrarImagem(renavam: string){
      try {
        
        await this.api.postVeiculoImagem(renavam, this.imagem)
        .catch((err) => {
          this.alertGenerico(err.error);
        });

      } catch (error) {
        this.alertGenerico(error); 
      }
  }

  async cadastrarImagem2(renavam: string){
      try {
        
        await this.api.patchVeiculoImagem2(renavam, this.shareData.id ,this.imagem2)
        .catch((err) => {
          this.alertGenerico(err.error);
        });

      } catch (error) {
        this.alertGenerico(error); 
      }
  }

  async cadastrarImagem3(renavam: string){
      try {
        
        await this.api.patchVeiculoImagem3(renavam, this.shareData.id ,this.imagem3)
        .catch((err) => {
          this.alertGenerico(err.error);
        });

      } catch (error) {
        this.alertGenerico(error); 
      }
  }

  async cadastrarImagem4(renavam: string){
      try {
        
        await this.api.patchVeiculoImagem4(renavam, this.shareData.id ,this.imagem4)
        .catch((err) => {
          this.alertGenerico(err.error);
        });

      } catch (error) {
        this.alertGenerico(error); 
      }
  }

  async cadastrarImagem5(renavam: string){
      try {
        
        await this.api.patchVeiculoImagem5(renavam, this.shareData.id ,this.imagem5)
        .catch((err) => {
          this.alertGenerico(err.error);
        });

      } catch (error) {
        this.alertGenerico(error); 
      }
  }
  //--------------------------------------------------//

  async enviarImagensVeiculo(){

    await this.cadastrarImagem(this.renavam);
    
    if(this.imagem2.size != null && this.imagem2.size != 0){
      await this.cadastrarImagem2(this.renavam);

    }
    
    if(this.imagem3.size != null && this.imagem3.size != 0){
      await this.cadastrarImagem3(this.renavam);

    }

    if(this.imagem4.size != null && this.imagem4.size != 0){
      await this.cadastrarImagem4(this.renavam);

    }

    if(this.imagem5.size != null && this.imagem5.size != 0){
      await this.cadastrarImagem5(this.renavam);
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
