import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeusLeiloesPageRoutingModule } from './meus-leiloes-routing.module';

import { MeusLeiloesPage } from './meus-leiloes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeusLeiloesPageRoutingModule
  ],
  declarations: [MeusLeiloesPage]
})
export class MeusLeiloesPageModule {}
