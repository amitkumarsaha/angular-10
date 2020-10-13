import { NgModule} from '@angular/core';
import { AppComponent } from './app.component';

import { AngularModule } from './module/angular/angular.module';
import { MaterialModule } from './module/material/material.module';
import { AppRoutingModule } from './module/route/app-routing.module';

import { NavMenuComponent } from './component/nav-menu/nav-menu.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { NotifierComponent } from './component/notifier/notifier.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ProfileComponent } from './component/profile/profile.component';
import { HomeComponent } from './component/home/home.component';
import { FooterComponent } from './component/footer/footer.component';

import { ValidationService } from './service/validation/validation.service';
import { UserService } from './service/user/user.service';

import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    DashboardComponent,
    NotifierComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    HomeComponent,
    FooterComponent,
    NavbarComponent    
  ],
  imports: [
    AngularModule,
    AppRoutingModule,
    MaterialModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [ ValidationService, UserService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
