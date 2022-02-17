import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //myUrl: string = (url da sua api); -LOCALMENTE 
  /* *Quando era necessário modificações, era feito localmente
   e depois de estar tudo certo era enviado para a nuvem */

  myUrl: string = 'Api'; // - NUVEM

  constructor(
    private http:HTTP
  ) { }

  //Usuários:
  //
  getAllUsuarios(pk: string, tipo: number){

    const body = {};
    const headers = { 'Content-Type': 'application/json; charset=UTF-8' };
    const url = this.myUrl + `/quemdamais/usuarios/all/${pk}/${tipo}`;
    this.http.setDataSerializer('json');

    return this.http.get(url, body, headers);
  };

  getInfoUsuarios(usuario_id: number, usuario_id2: number, usuario_id3: number){

    const body = {}
    const headers = { 'Content-Type': 'application/json; charset=UTF-8' };
    const url = this.myUrl + `/usuarios/usuario/${usuario_id}/${usuario_id2}/${usuario_id3}`;
    this.http.setDataSerializer('json');

    return this.http.get(url, body, headers);
  };

  getInfoUsuario(usuario_id: number){

    const body = {}
    const headers = { 'Content-Type': 'application/json; charset=UTF-8' };
    const url = this.myUrl + `/usuarios/usuario/${usuario_id}`;
    this.http.setDataSerializer('json');

    return this.http.get(url, body, headers);
  };

  login(email: string, senha: string){

    const body = {}
    const headers = { 'Content-Type': 'application/json; charset=UTF-8' };
    const url = this.myUrl + `/usuarios/usuario/${email}/${senha}`;
    this.http.setDataSerializer('json');

    return this.http.get(url, body, headers);
  };

  loginByVal(email: string, cod: string){

    const body = {};
    const headers = { 'Content-Type': 'application/json; charset=UTF-8' };
    const url = this.myUrl + `/usuarios/usuariov2/${email}/${cod}`;
    this.http.setDataSerializer('json');

    return this.http.get(url, body, headers);
  };

  cadastro(pk: string, nome: string, tel: string, email: string, data_nasc: string, endereco: string, link: string, senha: string){

    const body = {
      'cpf_cnpj': pk,
      'nome': nome,
      'telefone': tel,
      'email': email,
      'data_nasc': data_nasc,
      'endereco': endereco,
      'link': link,
      'senha': senha
    };

    const headers = { 'Content-Type': 'application/json; charset=UTF-8' };
    const url = this.myUrl + '/usuarios/usuario';
    this.http.setDataSerializer('json');

    return this.http.post(url, body, headers);
  };

  cadastroAvatar(avatar: any, pk: string){

    const formData = new FormData();
    formData.append('avatar_usuario', avatar);

    const headers = { 'Content-Type': 'multipart/form-data; charset=UTF-8' };
    const url = this.myUrl + `/usuarios/usuario/avatar/${pk}`;
    this.http.setDataSerializer('multipart');

    return this.http.post(url, formData, headers);

  };

  validarUser(email: string, cod: string){

    const body = {};
    const headers = { 'Content-Type': 'application/json; charset=UTF-8' };
    const url = this.myUrl + `/usuarios/usuario/validation/${email}/${cod}`;
    this.http.setDataSerializer('json');

    return this.http.patch(url, body, headers);
  };

  atualizarUser(cpf_cnpj: string, nome: string, telefone: number, endereco: string, link: string, senha: string){

    const body = {
      'cpf_cnpj': cpf_cnpj,
      'nome': nome,
      'telefone': telefone,
      'endereco': endereco,
      'link': link,
      'senha': senha
    };

    const headers = { 'Content-Type': 'application/json; charset=UTF-8' };
    const url = this.myUrl + '/usuarios/usuario';
    this.http.setDataSerializer('json');

    return this.http.patch(url, body, headers);

  };

  atualizarAvatar(pk: string, avatar: any){

    const formData = new FormData();
    formData.append('avatar_usuario', avatar);

    const headers = { 'Content-Type': 'multipart/form-data; charset=UTF-8' };
    const url = this.myUrl + `/usuarios/usuario/avatar/${pk}`;
    this.http.setDataSerializer('multipart');

    return this.http.patch(url, formData, headers);
  };

  atualizarCode(cpf_cnpj: string, email: string){

    const body = {
      'cpf_cnpj': cpf_cnpj,
      'email': email
    };

    const headers = { 'Content-type': 'application/json; charset=UTF-8' };
    const url = this.myUrl + '/usuarios/usuario/codeValidation';
    this.http.setDataSerializer('json');

    return this.http.patch(url, body, headers);
  };
  
  patchLeilao(usuario_pk: string, leilao_id: number){

    const body = {
      'usuario_pk': usuario_pk,
      'leilao_id': leilao_id
    };

    const headers = { 'Content-type': 'application/json; charset=UTF-8' };
    const url = this.myUrl + '/usuarios/usuario/leilao';
    this.http.setDataSerializer('json');

    return this.http.patch(url, body, headers);
  };

  postEmail(mensagem: string, email: string, nome: string){

    const body = {
      "mensagem": mensagem,
      "email": email,
      "nome": nome
    };

    const headers = { 'Content-Type': 'application/json; charset=UTF-8' };
    const url = this.myUrl + '/usuarios/usuario/email';
    this.http.setDataSerializer('json');

    return this.http.post(url, body, headers);
  }

  //---------------------------------------------------//

  //Veículos:
  //
  getAllVeiculos(pk: string, tipo: number){

    const body = {};
    const headers = { 'Content-Type': 'application/json; charset=UTF-8' };
    const url = this.myUrl + `/quemdamais/veiculos/all/${pk}/${tipo}`;
    this.http.setDataSerializer('json');

    return this.http.get(url, body, headers);
  };

  getVeiculo(veiculo_id: number){
    
    const body = {};
    const headers = { 'Content-Type': 'application/json; charset=UTF-8' };
    const url = this.myUrl + `/veiculos/veiculo/${veiculo_id}`;
    this.http.setDataSerializer('json');

    return this.http.get(url, body, headers);
  };

  getProdutos(vendedor_id: number){

    const body = {};
    const headers = { 'Content-Type': 'application/json; charset=UTF-8' };
    const url = this.myUrl + `/veiculos/produtos/${vendedor_id}`;
    this.http.setDataSerializer('json');

    return this.http.get(url, body, headers);
  };

  postVeiculo(
    renavam: string,
    fabricante: string,
    modelo: string,
    ano: string,
    cambio: string,
    cor: string,
    carroceria: string,
    combustivel: string,
    condicao: string,
    info: string,
    vendedor_id: number
  ){

    const body = {
      "renavam": renavam,
      "fabricante": fabricante,
      "modelo": modelo,
      "ano": ano,
      "cambio": cambio,
      "cor": cor,
      "carroceria": carroceria,
      "combustivel": combustivel,
      "condicao": condicao,
      "informacoes_adicionais": info,
      "vendedor_id": vendedor_id
    };

    const headers = { 'Content-Type': 'application/json; charset=UTF-8' };
    const url = this.myUrl + '/veiculos/veiculo';
    this.http.setDataSerializer('json');

    return this.http.post(url, body, headers);

  };

  postVeiculoImagem(renavam: string, imagem: any){
    
    const formData = new FormData();
    formData.append('imagem', imagem );

    const headers = { 'Content-Type': 'multipart/form-data; charset=UTF-8' };
    const url = this.myUrl + `/veiculos/veiculo/imagem/${renavam}`;
    this.http.setDataSerializer('multipart');

    return this.http.post(url, formData, headers);
  };

  patchStatusVeiculo(vendedor_id: number, veiculo_id: number, status: string){

    const body = {
      "veiculo_id": veiculo_id,
      "status": status
    };
    const headers = { 'Content-Type': 'application/json; charset=UTF-8' };
    const url = this.myUrl + `/veiculos/veiculo/status/${vendedor_id}`;
    this.http.setDataSerializer('json');

    return this.http.get(url, body, headers);
  }

  patchVeiculoImagem(renavam: string, id_vendedor: number, imagem: any){

    const formData = new FormData();
    formData.append('imagem', imagem );

    const headers = { 'Content-Type': 'multipart/form-data; charset=UTF-8' };
    const url = this.myUrl + `/veiculos/veiculo/imagem/${renavam}/${id_vendedor}`;
    this.http.setDataSerializer('multipart');

    return this.http.patch(url, formData, headers);
  };

  patchVeiculoImagem2(renavam: string, id_vendedor: number, imagem: any){

    const formData = new FormData();
    formData.append('imagem2', imagem );

    const headers = { 'Content-Type': 'multipart/form-data; charset=UTF-8' };
    const url = this.myUrl + `/veiculos/veiculo/imagem2/${renavam}/${id_vendedor}`;
    this.http.setDataSerializer('multipart');

    return this.http.patch(url, formData, headers);
  };

  patchVeiculoImagem3(renavam: string, id_vendedor: number, imagem: any){

    const formData = new FormData();
    formData.append('imagem3', imagem );

    const headers = { 'Content-Type': 'multipart/form-data; charset=UTF-8' };
    const url = this.myUrl + `/veiculos/veiculo/imagem3/${renavam}/${id_vendedor}`;
    this.http.setDataSerializer('multipart');

    return this.http.patch(url, formData, headers);
  };

  patchVeiculoImagem4(renavam: string, id_vendedor: number, imagem: any){

    const formData = new FormData();
    formData.append('imagem4', imagem );

    const headers = { 'Content-Type': 'multipart/form-data; charset=UTF-8' };
    const url = this.myUrl + `/veiculos/veiculo/imagem4/${renavam}/${id_vendedor}`;
    this.http.setDataSerializer('multipart');

    return this.http.patch(url, formData, headers);
  };

  patchVeiculoImagem5(renavam: string, id_vendedor: number, imagem: any){

    const formData = new FormData();
    formData.append('imagem5', imagem );

    const headers = { 'Content-Type': 'multipart/form-data; charset=UTF-8' };
    const url = this.myUrl + `/veiculos/veiculo/imagem5/${renavam}/${id_vendedor}`;
    this.http.setDataSerializer('multipart');

    return this.http.patch(url, formData, headers);
  };

  //-----------------------------------------

  //Leilões:
  //
  getAllLeiloes(pk: string, tipo: number){

    const body = {};
    const headers = { 'Content-Type': 'application/json; charset=UTF-8' };
    const url = this.myUrl + `/quemdamais/leiloes/all/${pk}/${tipo}`;
    this.http.setDataSerializer('json');

    return this.http.get(url, body, headers);
  };

  getLeiloesDisponiveis(){

    const body = {};
    const headers = { 'Content-Type': 'application/json; charset=UTF-8' };
    const url = this.myUrl + '/leiloes/disponiveis';
    this.http.setDataSerializer('json');

    return this.http.get(url, body, headers);
  };

  getLeiloesDestaque(){
  
    const body = {};
    const headers = { 'Content-Type': 'application/json; charset=UTF-8' };
    const url = this.myUrl + '/leiloes/destaque';
    this.http.setDataSerializer('json');

    return this.http.get(url, body, headers);
  };

  getPesquisaLeiloes(dado: string){

    const body = {};
    const headers = { 'Content-Type': 'application/json; charset=UTF-8' };
    const url = this.myUrl + `/leiloes/categoria/${dado}`;
    this.http.setDataSerializer('json');

    return this.http.get(url, body, headers);
  };

  getLeilao(id: number){

    const body = {};
    const headers = { 'Content-Type': 'application/json; charset=UTF-8' };
    const url = this.myUrl + `/leiloes/leilao/${id}`;
    this.http.setDataSerializer('json');

    return this.http.get(url, body, headers);
  };

  getLeiloesCriados(vendedor_id: number){

    const body = {};
    const headers = { 'Content-Type': 'application/json; charset=UTF-8' };
    const url = this.myUrl + `/leiloes/criados/${vendedor_id}`;
    this.http.setDataSerializer('json');

    return this.http.get(url, body, headers);
  };

  getParticipantesLeilao(leilao_id: number){

    const body = {};
    const headers = { 'Content-Type': 'application/json; charset=UTF-8' };
    const url = this.myUrl + `/usuarios/leilao/${leilao_id}`;
    this.http.setDataSerializer('json');

    return this.http.get(url, body, headers);
  };

  getLeiloesParticipando(pk: string){

    const body = {};
    const headers = { 'Content-Type': 'application/json; charset=UTF-8' };
    const url = this.myUrl + `/leiloes/participando/${pk}`;
    this.http.setDataSerializer('json');

    return this.http.get(url, body, headers);
  };

  getLeilaoParticipando(leilao_id: number){

    const body = {};
    const headers = { 'Content-Type': 'application/json; charset=UTF-8' };
    const url = this.myUrl + `/leiloes/leilao/participando/${leilao_id}`;
    this.http.setDataSerializer('json');

    return this.http.get(url, body, headers);
  };

  postLeilao(imagem_principal: string, data_final: string, lance_inicial: number, vendedor_id: number, veiculo_id: number){

    const body = {
      "imagem_principal": imagem_principal,
      "data_final": data_final,
      "lance_inicial": lance_inicial,
      "vendedor_id": vendedor_id,
      "veiculo_id": veiculo_id
    };

    const headers = { 'Content-Type': 'application/json; charset=UTF-8' };
    const url = this.myUrl + '/leiloes/leilao';
    this.http.setDataSerializer('json');

    return this.http.post(url, body, headers);
  };

  patchLances(
    leilao_id: number,
    lance: number,
    usuario_id: number,
    nome: string,
    telefone: number,
    pk: string,
    participa: number,
    slot: string
    ){

      const body = {
        "leilao_id": leilao_id,
        "usuario_lance": lance,
        "usuario_id": usuario_id,
        "pk": pk,
        "nome": nome,
        "telefone": telefone,
        "participante": participa,
        "slot": slot
      };

    const headers = { 'Content-Type': 'application/json; charset=UTF-8' };
    const url = this.myUrl + '/leiloes/leilao/lance/entrar';
    this.http.setDataSerializer('json');

    return this.http.patch(url, body, headers);
  };

  patchStatusLeilao(vendedor_id: number, leilao_id: number, patchVeiculo: boolean, veiculo_id: number){

    const body ={
      "leilao_id": leilao_id,
      "patchVeiculo": patchVeiculo,
      "veiculo_id": veiculo_id
    };

    const headers = { 'Content-Type': 'application/json; charset=UTF-8' };
    const url = this.myUrl + `/leiloes/leilao/status/${vendedor_id}`;
    this.http.setDataSerializer('json');

    return this.http.patch(url, body, headers);
  };
}
