import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChiSiamoComponent } from './chi-siamo/chi-siamo.component';
import { ContattiComponent } from './contatti/contatti.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NewsComponent } from './news/news.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegioneComponent } from './regione/regione.component';
import { RegioniComponent } from './regioni/regioni.component';
import { RicercaPipe } from './ricerca.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ChiSiamoComponent,
    ContattiComponent,
    DashboardComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    NewsComponent,
    NotFoundComponent,
    RegioneComponent,
    RegioniComponent,
    RicercaPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
