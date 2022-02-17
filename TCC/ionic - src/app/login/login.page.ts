import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ShareDataService } from '../services/share-data.service';
import { AppComponent } from '../app.component';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  caminho: string;
  complemento: string;

  constructor(
    private router:Router,
    private api:ApiService,
    private shareDataService:ShareDataService,
    private appComponent: AppComponent,
    private alertController: AlertController
  ) {}

  ngOnInit() {
  }
  
  login(email: string, cod: string,  senha: string){

      this.api.login(email, senha)
      .then((result) => {

        if(result.status === 206){
          this.primeiroLogin(email, cod, result);

        } else {
          this.saveInfo(result.data);
          this.appComponent.userOption();
          this.router.navigateByUrl('/home');

        }
      })
      .catch((err) => {
        this.alertGenerico(err.error);

      });
  }

  loginByValidate(email: string, cod: string){
    
    this.api.loginByVal(email, cod)
    .then((result) => {

      if(result.status === 206){
        this.primeiroLogin(email, cod, result);
        
      } else{
        this.saveInfo(result.data);
        this.appComponent.userOption();
        this.router.navigateByUrl('/home');
      }
    })
    .catch((err) => {
      this.alertGenerico(err.error);
    });
  }

  primeiroLogin(email: string, cod: string, result: any){
    
    if(cod){
      if(result.data === cod){
        this.validador(email, cod);
        this.loginByValidate(email, cod);
      
      } else{
        this.alertGenerico('Código não reconhecido.');

      }
    } else{
      this.alertGenerico('Para o primeiro login é necessário preencher o campo, código de validação, com o código enviado ao seu e-mail.');

    }
  }
  

  goToCadastro(){
    this.router.navigateByUrl('/cadastro');
  }

  goToHome(){
    this.router.navigateByUrl('/home');
  }

  semSenha(cpf_cnpj: string, email: string){
    this.api.atualizarCode(cpf_cnpj, email)
    .then((result) => {
      this.alertGenerico(result.data);
    })
    .catch((err) => {
      this.alertGenerico(JSON.stringify(err));
    });
  }

  // ----------------------- Funções complementáres --------------------//

  //Função que verifica se o código de validação esta correto.
  validador(email: string, cod: string){
    this.api.validarUser(email, cod)
    .catch((err) => {
      this.alertGenerico(err.error);
    });
  }

  //Após a confirmação do usuário é salva as principais informações do user em um serviço,
  //essas informações vão ser utilizadas ao longo da navegação do usuário, até ele fazer o logOff.
  saveInfo(result: string){
    const dados = JSON.parse(result);
    
    this.shareDataService.shareData(
      dados.id,
      dados.cpf_cnpj,
      dados.nome,
      dados.telefone,
      dados.email,
      dados.endereco,
      dados.link,
      dados.senha,
      dados.path_avatar,
      dados.tipo,
      dados.cod_validacao
    );
  }

  //validação dos inputs do login
  validateInputs(email: string, cod: string, senha: string){

    if(email === undefined && senha === undefined && cod === undefined){
      this.alertGenerico('Preencha todos os campos');

    } else if(email != undefined && senha != undefined && email.length != 0 && senha.length != 0){
      this.login(email, cod, senha);

    } else if(email != undefined && cod != undefined && email.length != 0 && cod.length != 0){
        this.loginByValidate(email, cod);
      
    } else{
      this.alertGenerico('Há alguns campos estão em branco, verifique-os.');
    }
  }

  //------------------Alerts----------------//

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

  async esqueciMinhaSenha(){

    const alert = await this.alertController.create({
      message: 'Para continuar confirme alguns dados:',
      cssClass: 'alert-css',
      backdropDismiss: false,
      inputs: [
        {
          name: 'cpf_cnpj',
          placeholder: 'CPF/CNPJ',
          type: 'text',
          min: '11'
        },
        {
          name: 'email',
          placeholder: 'E-mail',
          type: 'email'
        }
      ],
      buttons: [
        {
          text: 'confirmar',
          cssClass: 'buttons-alert',
          handler: (data) => {
            this.semSenha(data.cpf_cnpj, data.email);
          }
        },
        {
          text: 'cancelar',
          role: 'cancel',
          cssClass: 'buttons-alert',
        }
      ]
    });

    await alert.present();
  }
}
