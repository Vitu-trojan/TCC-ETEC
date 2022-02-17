import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { AlertController, LoadingController, MenuController } from '@ionic/angular';
import { ApiService } from './services/api.service';
import { ShareDataService } from './services/share-data.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  opcao: string = 'SAIR';
  searchText: string;
  admMode: boolean;

  constructor(
    private router: Router,
    private menuController: MenuController,
    private shareDataService: ShareDataService,
    private alertController: AlertController,
    private appMinimize: AppMinimize,
    private loadingController: LoadingController,
    private apiService: ApiService
    ) 
  {
    this.searchText = '';
    this.admMode = false;
  }

  //barra de pesquisa
  pesquisando(dado: any){
    let val = dado.target.value;
    this.searchText = val;
    
    if(this.searchText && this.searchText.trim() != '' && this.searchText.length != 0){
      setTimeout(()=> {
        this.menuController.close();
        this.router.navigateByUrl(`/resultado-leiloes/${this.searchText}`);
      }, 3000);
    }
  }

  //router
  async goToLeiloes(){
    
    if(!this.shareDataService.pk){
      const alert = await this.alertController.create({

        message: 'Para ver seus leilões é necessário estar logado, gostaria de fazer login?',
        cssClass: 'alert-css',
        backdropDismiss: false,
        buttons: [
          {
            text: 'Sim',
            cssClass: 'buttons-alert',
            handler: () => {
              this.router.navigateByUrl('/login');
            }
          },
          {
            text: 'Não',
            role: 'cancel',            
            cssClass: 'buttons-alert'
          }
        ]
      });
      
      await alert.present();

    } else{
      this.router.navigateByUrl('/guias-leiloes');
    }
    this.menuController.close();
  }

  //router com condilção
  async goToAnunciar(){

    if(!this.shareDataService.pk){
      const alert = await this.alertController.create({

        message: 'Para poder anunciar é necessário estar logado, gostaria de fazer login?',
        cssClass: 'alert-css',
        backdropDismiss: false,
        buttons: [
          {
            text: 'Sim',
            cssClass: 'buttons-alert',
            handler: () => {
              this.router.navigateByUrl('/login');
            }
          },
          {
            text: 'Não',
            role: 'cancel',            
            cssClass: 'buttons-alert'
          }
        ]
      });
      
      await alert.present();

    } else{
      this.router.navigateByUrl('/guias-veiculos');
    }
    this.menuController.close();
  }

  //router
  goToPerfil(){
    
    if(!this.shareDataService.pk){
      this.router.navigateByUrl('/login');

    } else{
      this.router.navigateByUrl('/usuario');
    }

    this.menuController.close();
  }

  //router
  goToHome(){
    this.router.navigateByUrl('/home');
    this.menuController.close();
  }

  //Enviar mensagem para o email da QuemDa+
  async faleConosco(){

    if(!this.shareDataService.pk){
      const alert = await this.alertController.create({

        message: 'Para esta opção é necessário estar logado, gostaria de fazer login?',
        cssClass: 'alert-css',
        backdropDismiss: false,
        buttons: [
          {
            text: 'Sim',
            cssClass: 'buttons-alert',
            handler: () => {
              this.router.navigateByUrl('/login');
            }
          },
          {
            text: 'Não',
            role: 'cancel',            
            cssClass: 'buttons-alert'
          }
        ]
      });
      
      await alert.present();

    } else{
      this.mensagemUsuario();
    }
    this.menuController.close();
  }

  //router para fechar app ou deslogar
  quit(){

    if(this.opcao === 'DESCONECTAR'){
     this.logOut();

    } else{
      this.closeAll();
      
    }
  }

  //altera opção de logado no menu
  userOption(){

    if(this.shareDataService.pk){
      this.opcao = 'DESCONECTAR';
      this.admMode = this.shareDataService.ADM;

    } else{
      this.opcao = 'SAIR';
    }
  }

  //-------------Routes AdmMode--------------//
  goToLeiloesAdm(){
    this.router.navigateByUrl('/adm-service/leiloes');
    this.menuController.close();
  };

  goToVeiculos(){
    this.router.navigateByUrl('/adm-service/veiculos');
    this.menuController.close();
  };

  goToUsuarios(){
    this.router.navigateByUrl('/adm-service/usuarios');
    this.menuController.close();
  };

  //pergunta se o usuario deseja realmente sair da cont atual
  async logOut(){

    const alert = await this.alertController.create({
  
      message: 'Deseja sair da conta atual?',
      cssClass: 'alert-css',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Sim',
          cssClass: 'buttons-alert',
          handler: () => {
            this.shareDataService.deleteData();
            this.userOption();
            this.admMode = false;
            this.menuController.close();
            this.router.navigateByUrl('/login');
          }
        },
        {
          text: 'Não',
          role: 'cancel',            
          cssClass: 'buttons-alert'
        }
      ]
    });
    
    await alert.present();
  }

  //desloga e "fecha" o app
  async closeAll(){

    const alert = await this.alertController.create({
      
      message: 'Deseja fechar o aplicativo?',
      cssClass: 'alert-css',
      buttons: [
        {
          text: 'sim',
          cssClass: 'buttons-alert',
          handler: () => {
            this.shareDataService.deleteData();
            this.userOption();
            this.menuController.close();
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

  //loading em construção
  async loading(){
    const loading = await this.loadingController.create({
      cssClass: '',
      message: 'Carregando',
      duration: 3000
    });

    await loading.present();
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

    this.apiService.postEmail(mensagem, email, nome)
    .then((result) => {
      this.alertGenerico(result.data);
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
