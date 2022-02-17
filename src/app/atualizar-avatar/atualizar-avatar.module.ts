import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AtualizarAvatarPageRoutingModule } from './atualizar-avatar-routing.module';

import { AtualizarAvatarPage } from './atualizar-avatar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AtualizarAvatarPageRoutingModule
  ],
  declarations: [AtualizarAvatarPage]
})
export class AtualizarAvatarPageModule {}
