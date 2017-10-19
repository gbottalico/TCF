import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { AppComponent } from './app.component';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './user/users.component';
import { LoginComponent } from './login/login.component';
import { ConsuntivazioneComponent } from './consuntivazione/consuntivazione.component';
import { ChangeEmailComponent } from './user/changeemail/changeemail.component';
import { ChangePwdComponent } from './user/changepwd/changepwd.component';
import { GestioneUtentiComponent } from './amministrazione/gestioneUtenti/gestioneUtenti.component';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'utenti', component: GestioneUtentiComponent, canActivate: [AuthGuard]},
  { path: 'consuntivazione', component: ConsuntivazioneComponent, canActivate: [AuthGuard] },
  { path: 'userChangeEmail', component: ChangeEmailComponent, canActivate: [AuthGuard] },
  { path: 'userChangePwd', component: ChangePwdComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}