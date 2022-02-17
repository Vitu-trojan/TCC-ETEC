import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//importando o plugins adicionais no app pra disponibiliza para todos os módulos
import { HTTP } from '@ionic-native/http/ngx';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';


//configuração para formatar o formato da moeda em real
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
registerLocaleData(ptBr);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
  { provide: LOCALE_ID, useValue: 'pt'}, HTTP, AppMinimize],
  bootstrap: [AppComponent],
})
export class AppModule {}
