import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModalComponent } from './modal/modal.component';
import { ModalOwnerComponent } from './modal/modal-owner/modal-owner.component';
import { ModalPetSitterComponent } from './modal/modal-pet-sitter/modal-pet-sitter.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OwnerComponent } from './edit/owner/owner.component';
import { TokenInterceptor } from './Interceptors/token-interceptor.interceptor';
import { FormErrorComponent } from './components/form-error/form-error.component';
import { InfoIconComponent } from './components/info-icon/info-icon.component';
import { AddAnimalComponent } from './edit/owner/add-animal/add-animal.component';
import { registerLocaleData } from '@angular/common';
import localFr from '@angular/common/locales/fr';
import { NotfoundComponent } from './components/notfound/notfound.component';
registerLocaleData(localFr);
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    ModalComponent,
    ModalOwnerComponent,
    ModalPetSitterComponent,
    DashboardComponent,
    OwnerComponent,
    FormErrorComponent,
    InfoIconComponent,
    AddAnimalComponent,
    NotfoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'fr-FR' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
