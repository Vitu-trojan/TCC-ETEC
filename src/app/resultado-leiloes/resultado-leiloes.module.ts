import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResultadoLeiloesPageRoutingModule } from './resultado-leiloes-routing.module';

import { ResultadoLeiloesPage } from './resultado-leiloes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResultadoLeiloesPageRoutingModule
  ],
  declarations: [ResultadoLeiloesPage]
})
export class ResultadoLeiloesPageModule {}
