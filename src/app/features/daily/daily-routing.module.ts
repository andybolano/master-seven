import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DailyComponent } from './daily.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterMemberFormComponent } from './components/register-member-form/register-member-form.component';

const routes: Routes = [
  {
    path: '',
    component: DailyComponent
  }
]

@NgModule({
  declarations: [
    DailyComponent,
    RegisterMemberFormComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [
    RouterModule
  ]
})
export class DailyRoutingModule { }
