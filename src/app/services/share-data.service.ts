//--------------------------------------------------------------
//
// Esse serviço foi criado pelo Prof. Barth da ETEC Jd.Ângela
// 
// ela serve como um armazenador de dados simples, quando um
// usuário faz login, os dados digitados que poderão ser usados
// depois são guardados durante a sessão. O share-data foi criado
// para servir no mobile como um section do PHP.
//
// este serviço além de armazenar, atualiza os dados do usuário
// caso necessário e também apaga ao final da sessão.
//
// Como aluno pude usufruir de sua criação que funciona muito
// bem, obrigado "Let"!.
//
//---------------------------------------------------------------

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  id: number;
  pk: string;
  nome: string;
  telefone: number;
  email: string;
  endereco: string;
  link: string;
  senha:string;
  path_avatar: string;
  tipo: number;
  cod: number;
  ADM: boolean;

  constructor() { }
  
  shareData(
    id: number,
    pk: string,
    nome: string,
    telefone: number,
    email:string,
    endereco: string,
    link: string,
    senha: string,
    path_avatar: string,
    tipo: number,
    cod: number
  )
  {
    this.id = id;
    this.pk = pk;
    this.nome = nome;
    this.telefone = telefone;
    this.email = email;
    this.endereco = endereco;
    this.link = link;
    this.senha = senha;
    this.path_avatar = path_avatar;
    this.tipo = tipo;
    this.cod = cod;

    if('validacao'){
      this.ADM = true;

    } else{
      this.ADM = false;
    }
  }

  deleteData(){
    this.shareData(
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    );
  }

  updateData(
    nome: string,
    telefone: number,
    endereco: string,
    link: string,
    senha: string,
  ){
    this.nome = nome;
    this.telefone = telefone;
    this.endereco = endereco;
    this.link = link;
    this.senha = senha;
  }

  updateAvatar(path_avatar: string){
    this.path_avatar = path_avatar;
  }

}