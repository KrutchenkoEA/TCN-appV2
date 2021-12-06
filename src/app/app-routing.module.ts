import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from "./login-page/login-page.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {RegisterPageComponent} from "./login-page/register-page/register-page.component";
import {ForgotPasswordPageComponent} from "./login-page/forgot-password-page/forgot-password-page.component";
import {AuthGuard} from "./shared/auth.guard";

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginPageComponent},
  // {path: 'home', component: HomePageComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomePageComponent},
  {path: 'login/register', component: RegisterPageComponent},
  {path: 'login/forgot-password', component: ForgotPasswordPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
