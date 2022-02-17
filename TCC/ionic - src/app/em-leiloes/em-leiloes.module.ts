import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmLeiloesPageRoutingModule } from './em-leiloes-routing.module';

import { EmLeiloesPage } from './em-leiloes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmLeiloesPageRoutingModule
  ],
  declarations: [EmLeiloesPage]
})
export class EmLeiloesPageModule {}
