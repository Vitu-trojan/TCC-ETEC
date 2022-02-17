import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuiasLeiloesPageRoutingModule } from './guias-leiloes-routing.module';

import { GuiasLeiloesPage } from './guias-leiloes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GuiasLeiloesPageRoutingModule
  ],
  declarations: [GuiasLeiloesPage]
})
export class GuiasLeiloesPageModule {}
