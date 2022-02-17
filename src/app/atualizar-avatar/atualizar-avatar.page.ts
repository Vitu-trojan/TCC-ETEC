import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { ShareDataService } from '../services/share-data.service';

@Component({
  selector: 'app-atualizar-avatar',
  templateUrl: './atualizar-avatar.page.html',
  styleUrls: ['./atualizar-avatar.page.scss'],
})
export class AtualizarAvatarPage implements OnInit {

  avatar: string;
  file: File;

  constructor(
    private shareData: ShareDataService,
    private apiService: ApiService,
    private alertController: AlertController
    ) { }

  ngOnInit() {
    this.currentAvatar();
  }

  loadImageFromDevice(event: any) {
    if(event.target.files && event.target.files[0]){
      this.file = event.target.files[0];
    } else{
      this.file = null;
    }
  };

  currentAvatar(){
    this.avatar = this.shareData.path_avatar;
  };

  updateAvatar(){
    if(this.file != undefined){

      if(this.file.size && this.file.size != 0){

        this.apiService.atualizarAvatar(this.shareData.pk, this.file)
        .then((result) => {
          this.shareData.updateAvatar(result.data);
          this.currentAvatar();
          this.alertGenerico('Avatar alterado com sucesso.');
        })
        .catch((err) => {
          this.alertGenerico(err.data);
        });  
      } else{
        this.alertGenerico('Para atualizar o avatar selecione o novo avatar.');
      }
    } else{
      this.alertGenerico('Para atualizar o avatar selecione o novo avatar.');
    }
  };

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
