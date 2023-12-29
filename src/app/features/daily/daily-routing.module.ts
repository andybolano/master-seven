import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DailyComponent } from './daily.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterMemberFormComponent } from './components/register-member-form/register-member-form.component';
import { RegistersService } from '@shared/common-services/registers.service';
import { MemberService } from '@shared/common-services/member.service';
import { SelectDateComponent } from './components/select-date/select-date.component';

const routes: Routes = [
  {
    path: '',
    component: DailyComponent
  }
]

@NgModule({
  declarations: [
    DailyComponent,
    RegisterMemberFormComponent,
    SelectDateComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    CommonModule,
  ],
  exports: [
    RouterModule,
  ],
  providers: [
    RegistersService,
    MemberService,
  ]
})
export class DailyRoutingModule { }
