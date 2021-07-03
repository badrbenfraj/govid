import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/auth/login/login.component';
import { SignupComponent } from './core/auth/signup/signup.component';
import {NotFoundComponent} from './core/not-found/not-found.component';
import {HomeComponent} from './components/home/home.component';
import {ForgotPasswordComponent} from './core/auth/forgot-password/forgot-password.component';
import { AuthGuard } from './core/auth/helpers';
import { ListMedecinsComponent } from './components/Medecins/list-medecins/list-medecins.component';
import { AjouterMedecinComponent } from './components/Medecins/ajouter-medecin/ajouter-medecin.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  { path: 'reset', component: ForgotPasswordComponent },
  { path: 'ListMedecins', component: ListMedecinsComponent },
  { path: 'AddMedecin', component: AjouterMedecinComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
