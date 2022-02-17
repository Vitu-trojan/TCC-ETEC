import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AtualizarAvatarPage } from './atualizar-avatar.page';

const routes: Routes = [
  {
    path: '',
    component: AtualizarAvatarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AtualizarAvatarPageRoutingModule {}
