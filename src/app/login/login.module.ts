import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MatCardModule, MatInputModule } from '@angular/material';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    SharedModule,
    LoginRoutingModule,
    MatCardModule,
    MatInputModule
  ]
})
export class LoginModule { }
