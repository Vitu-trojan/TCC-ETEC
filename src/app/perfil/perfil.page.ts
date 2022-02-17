import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ShareDataService } from '../services/share-data.service';
import { AppComponent } from '../app.component'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  cpf_cnpj: string;
  nome: string;
  telefone: number;
  email:string;
  endereco: string;
  link: string;
  senha: string;

  constructor(
     private shareData:ShareDataService,
     private router:Router,
     private api:ApiService,
     private appComponent: AppComponent,
     private alertController: AlertController
  ) {}

  ngOnInit() {
    this.getInfo();
    this.appComponent.userOption();
  }
  
  //Armazena nas variáveis os dados salvos do usuário logado.
  getInfo(){
    
    this.cpf_cnpj = this.shareData.pk;
    this.nome = this.shareData.nome;
    this.telefone = this.shareData.telefone;
    this.email = this.shareData.email;
    this.endereco = this.shareData.endereco;
    this.link = this.shareData.link;
    this.senha = this.shareData.senha;
  }

  getInfoToUp(
    nome: string,
    telefone: number,
    endereco: string,
    link: string,
    senha: string,
    cod: number 
  ){
    if(nome == null || telefone.toString.length == null || senha == null || cod == null){
      this.alertGenerico('Preencha todos os campos obrigatórios.');

    } else if(nome.length == 0 || telefone.toString.length == 0 || senha.length == 0 || cod.toString().length == 0){
      this.alertGenerico('Alguns dos campos obrigatórios está em branco, tente novamente.');

    } else if(
      nome == this.shareData.nome &&
      telefone == this.shareData.telefone &&
      endereco == this.shareData.endereco &&
      link == this.shareData.link &&
      senha == this.shareData.senha
    ){
      this.alertGenerico('Para atualizar os dados é necessário que haja a alteração nos campos, tente novamente.');

    } else if(senha == this.shareData.senha && this.shareData.cod == cod || senha != this.shareData.senha && this.shareData.cod == cod){
      this.updateInfo(nome, telefone, endereco, link, senha);

    } else {
      this.alertGenerico('Código de validação divergente, tente novamente.');
    }
  }

  //Caso o usuário resolva atualizar a informações, aqui, salva na sessão e no bd.
  updateInfo(
    nome: string,
    telefone: number,
    endereco: string,
    link: string,
    senha: string,
  ){
      const cpf_cnpj = this.cpf_cnpj;
      this.api.atualizarUser(cpf_cnpj, nome, telefone, endereco, link, senha)
      .then((result) => {
        this.alertGenerico(result.data);
        this.shareData.updateData(
          nome,
          telefone,
          endereco,
          link,
          senha);
        this.router.navigateByUrl('/usuario');
      })
      .catch((err) => {
        this.alertGenerico(err.error);
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
