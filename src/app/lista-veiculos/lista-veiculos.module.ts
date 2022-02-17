import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaVeiculosPageRoutingModule } from './lista-veiculos-routing.module';

import { ListaVeiculosPage } from './lista-veiculos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaVeiculosPageRoutingModule
  ],
  declarations: [ListaVeiculosPage]
})
export class ListaVeiculosPageModule {}
