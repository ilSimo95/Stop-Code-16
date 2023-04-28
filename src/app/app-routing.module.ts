import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ChiSiamoComponent } from './chi-siamo/chi-siamo.component';
import { ContattiComponent } from './contatti/contatti.component';
import { NewsComponent } from './news/news.component';
import { LoginComponent } from './login/login.component';
import { RegioniComponent } from './regioni/regioni.component';
import { RegioneComponent } from './regione/regione.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthenticationGuard } from './authentication.guard';

import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path: "", redirectTo:"/home", pathMatch:'full'},//localhost:4200/home
  {path: "home", component: HomeComponent},//localhost:4200/home
  {path: "chi-siamo", component: ChiSiamoComponent},//localhost:4200/chi-siamo
  {path: "contatti", component: ContattiComponent},//localhost:4200/contatti
  {path:"regioni", component:RegioniComponent},//localhost:4200/regioni
  {path:"regione/:nome", component: RegioneComponent}, //localhost:4200/regione/Liguria...
  {path: "dashboard/:token", component: DashboardComponent, canActivate: [AuthenticationGuard]}, //localhost:4200/dashboard/token
  {path: "news", component: NewsComponent, /*canActivate: [AuthenticationGuard]*/}, //localhost:4200/news
  {path: "login", component: LoginComponent},//localhost:4200/login
  {path: "**", component: NotFoundComponent},//localhost:4200/not-found
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
