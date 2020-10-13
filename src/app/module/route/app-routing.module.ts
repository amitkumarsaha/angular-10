import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../../component/dashboard/dashboard.component';
import { RegisterComponent } from '../../component/register/register.component';
import { LoginComponent } from '../../component/login/login.component';
import { ProfileComponent } from '../../component/profile/profile.component';
import { HomeComponent } from '../../component/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
