import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/page/home/home.component';
import { AboutComponent } from './components/page/about/about.component';
import { NewMomentComponent } from './components/page/new-moment/new-moment.component';
import { MomentFormComponent } from './components/moment-form/moment-form.component';
import { MessagesComponent } from './components/messages/messages.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// Importar a localidade brasileira
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { MomentComponent } from './components/page/moment/moment.component';
// Registrar a localidade brasileira
registerLocaleData(localePt);
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    NewMomentComponent,
    MomentFormComponent,
    MessagesComponent,
    MomentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())  // Adiciona o uso de fetch
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
