import { months } from '@shared/utils/months';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-register-member-form',
  templateUrl: './register-member-form.component.html',
  styleUrls: ['./register-member-form.component.scss'],
})

export class RegisterMemberFormComponent {

  public monthsList: string[] = months
  public daysOfMonth: number = 31
  public memberForm = this.formBuilder.group({
    names: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: [''],
    birthDay: [''],
    birthMonth: ['']
  })

  constructor(private formBuilder: FormBuilder) { }

  public onSubmit (): void {
    console.log(this.memberForm.value)
  }
}
