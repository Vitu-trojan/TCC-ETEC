import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdmServicePageRoutingModule } from './adm-service-routing.module';

import { AdmServicePage } from './adm-service.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdmServicePageRoutingModule
  ],
  declarations: [AdmServicePage]
})
export class AdmServicePageModule {}
