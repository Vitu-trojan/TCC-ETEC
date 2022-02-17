import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'guias-veiculos',
    loadChildren: () => import('./guias-veiculos/guias-veiculos.module').then( m => m.GuiasVeiculosPageModule)
  },
  {
    path: 'info-veiculo/:id',
    loadChildren: () => import('./info-veiculo/info-veiculo.module').then( m => m.InfoVeiculoPageModule)
  },
  {
    path: 'usuario',
    loadChildren: () => import('./usuario/usuario.module').then( m => m.UsuarioPageModule)
  },
  {
    path: 'guias-leiloes',
    loadChildren: () => import('./guias-leiloes/guias-leiloes.module').then( m => m.GuiasLeiloesPageModule)
  },
  {
    path: 'resultado-leiloes/:pesquisa',
    loadChildren: () => import('./resultado-leiloes/resultado-leiloes.module').then( m => m.ResultadoLeiloesPageModule)
  },
  {
    path: 'leilao/:id',
    loadChildren: () => import('./leilao/leilao.module').then( m => m.LeilaoPageModule)
  },
  {
    path: 'adm-service/:servico',
    loadChildren: () => import('./adm-service/adm-service.module').then( m => m.AdmServicePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
