import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@shared/common-services/auth.service';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    title: 'Inicio de Sesión',
  }
]

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
  providers: [
    AuthService
  ]
})
export class LoginRoutingModule { }
