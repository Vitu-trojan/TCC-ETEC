import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuiasVeiculosPageRoutingModule } from './guias-veiculos-routing.module';

import { GuiasVeiculosPage } from './guias-veiculos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GuiasVeiculosPageRoutingModule
  ],
  declarations: [GuiasVeiculosPage]
})
export class GuiasVeiculosPageModule {}
