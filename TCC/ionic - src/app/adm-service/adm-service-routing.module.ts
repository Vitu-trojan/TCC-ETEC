import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmServicePage } from './adm-service.page';

const routes: Routes = [
  {
    path: '',
    component: AdmServicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmServicePageRoutingModule {}
