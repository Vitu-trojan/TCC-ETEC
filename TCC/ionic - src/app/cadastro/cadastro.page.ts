import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  file: File;
  pk: string;
  nome: string;
  dt_nasc: string;
  email: string;
  tel: string;
  endereco: string;
  link: string;
  senha: string;

  constructor(
    private api: ApiService,
    private router: Router,
    private alertController: AlertController
    ) { }

  ngOnInit() {
  }
  
  loadImageFromDevice(event: any) {

    if(event.target.files && event.target.files[0]){
      this.file = event.target.files[0];
    }
  };
  
  getInfoCadastrar(
    pk: string,
    nome: string,
    dt_nasc: string,
    email: string,
    email2: string,
    tel: string,
    endereco: string,
    link: string,
    senha: string,
    senha2: string
  ){

    if(pk == null || nome == null || dt_nasc == null || email == null || tel == null || senha == null || this.file == undefined){
      this.alertGenerico('Preencha todos os dados obrigatórios.');

    } else if(pk.length == 0 || nome.length == 0 || dt_nasc.length == 0 || email.length == 0 || tel.length == 0 || senha.length == 0 || this.file.size == 0){
      this.alertGenerico('Alguns campos estão em branco, verifique-os.');

    } else{

      const doc = this.verificaDoc(pk);
      const valIdade = this.validarIdade(dt_nasc);
  
      if(!doc){
        this.alertGenerico('CPF/CNPJ inválido');
        
      } else if(tel.length != 11 && tel.length != 10){
        this.alertGenerico('Número de telefone inválido.');
  
      } else if(!valIdade){
        this.alertGenerico('Cadastro liberado apenas para pessoas maiores de 18 anos.');
  
      } else if( email === email2 && senha ===  senha2){
        this.pk = pk;
        this.nome = nome;
        this.dt_nasc = dt_nasc;
        this.email = email;
        this.tel = tel;
        this.endereco = endereco;
        this.link = link;
        this.senha = senha;
  
        this.cadastrar();
        
      } else{
        this.alertGenerico('Alguns dos campos de confirmação está divergente, verifique-os por favor!');
      }
    }

  }

  cadastrar(){

    this.api.cadastro(this.pk, this.nome, this.tel, this.email, this.dt_nasc, this.endereco, this.link, this.senha)
    .then((result) => {

      const stImg = this.cadastrarAvatar(this.pk);
      if(!stImg) alert('Erro na imagem de avatar, tente novamente por favor.');
      
      this.alertGenerico(result.data);
      this.router.navigateByUrl('/login');
    })
    .catch((err) => {
      this.alertGenerico(err.error);
    });
  };

  async cadastrarAvatar(pk: string) {
    try{
      await this.api.cadastroAvatar(this.file, pk)
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      })
    } catch(error){
      return false;
    }
  };

  verificaDoc(pk: string): boolean {

    let resultado: boolean;

    if(pk.length == 11){
      resultado = this.cpf(pk);

      if(!resultado){
        return false;

      } else{
        return true;
      }
      
    } else if(pk.length == 14){
      resultado = this.cnpj(pk);

      if(!resultado){
        return false;

      } else{
        return true;
      }

    } else{
      return false;
    }
  };

  cpf(cpf: string): boolean {

    if (cpf == null) {
        return false;
    }

    if ((cpf == '00000000000') || (cpf == '11111111111') || (cpf == '22222222222') || (cpf == '33333333333') || (cpf == '44444444444') || (cpf == '55555555555') || (cpf == '66666666666') || (cpf == '77777777777') || (cpf == '88888888888') || (cpf == '99999999999')) {
        return false;
    }

    let numero: number = 0;
    let caracter: string = '';
    let numeros: string = '0123456789';
    let j: number = 10;
    let somatorio: number = 0;
    let resto: number = 0;
    let digito1: number = 0;
    let digito2: number = 0;
    let cpfAux: string = '';
    cpfAux = cpf.substring(0, 9);

    for (let i: number = 0; i < 9; i++) {
        caracter = cpfAux.charAt(i);
        if (numeros.search(caracter) == -1) {
            return false;
        }
        numero = Number(caracter);
        somatorio = somatorio + (numero * j);
        j--;
    }
    resto = somatorio % 11;
    digito1 = 11 - resto;

    if (digito1 > 9) {
        digito1 = 0;
    }

    const aux = digito1.toString();

    if (cpf.substring(9, 10) != aux){
      return false;
    }

    j = 11;
    somatorio = 0;
    cpfAux = cpfAux + digito1;
    for (let i: number = 0; i < 10; i++) {
        caracter = cpfAux.charAt(i);
        numero = Number(caracter);
        somatorio = somatorio + (numero * j);
        j--;
    }

    resto = somatorio % 11;
    digito2 = 11 - resto;

    if (digito2 > 9) {
        digito2 = 0;
    }

    cpfAux = cpfAux + digito2;

    if (cpf != cpfAux) {
        return false;
    }
    else {
        return true;
    }
  };

  cnpj(cnpj: any): boolean {

    if(cnpj == null) {
      return false;
    }
    
    // Esta função retira os caracteres . / - da string do cnpj, deixando apenas os números 
    var strCNPJ = cnpj.replace('.', '').replace('.', '').replace('/', '').replace('-', '');

    // Testa as sequencias que possuem todos os dígitos iguais e se o cnpj não tem 14 dígitos, retonando falso e exibindo uma msg de erro

    if (strCNPJ === '00000000000000' || strCNPJ === '11111111111111' || strCNPJ === '22222222222222' || strCNPJ === '33333333333333' ||
      strCNPJ === '44444444444444' || strCNPJ === '55555555555555' || strCNPJ === '66666666666666' || strCNPJ === '77777777777777' ||
      strCNPJ === '88888888888888' || strCNPJ === '99999999999999' || strCNPJ.length !== 14) {
      return false;
    }

    // A variável numeros pega o bloco com os números sem o DV, a variavel digitos pega apenas os dois ultimos numeros (Digito Verificador).

    var tamanho = strCNPJ.length - 2;
    var numeros = strCNPJ.substring(0, tamanho);
    var digitos = strCNPJ.substring(tamanho);
    var soma = 0;
    var pos = tamanho - 7;

    // Os quatro blocos seguintes de funções irá reaizar a validação do CNPJ propriamente dito, conferindo se o DV bate. Caso alguma das funções não consiga verificar
    // o DV corretamente, mostrará uma mensagem de erro ao usuário e retornará falso, para que o usário posso digitar novamente um número 

    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }

    var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

    if (resultado != digitos.charAt(0)) {
      return false;
    }

    tamanho = tamanho + 1;
    numeros = strCNPJ.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let k = tamanho; k >= 1; k--) {
      soma += numeros.charAt(tamanho - k) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }

    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

    if (resultado != digitos.charAt(1)) {

      return false;
    }

    return true;
  };

  validarIdade(data: string){
    //separa e pega o dia, mês e ano de nasciemnto do usuário.
    const anoN = parseInt(data.substring(0,4));
    const mesN = parseInt(data.substring(5,7));
    const diaN = parseInt(data.substring(8,10));

    //pegar dia, mês e ano atual.
    const hoje = new Date();
    const dia = hoje.getDate();
    const mes = hoje.getMonth() +1;
    const ano = hoje.getFullYear();
    
    let idade = ano - anoN;

    if(mes < mesN || mes == mesN && dia < diaN){
      idade = idade -1 ;
    }

    if(idade < 18){
      return false;

    } else{
      return true;
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