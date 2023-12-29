import { months } from '@shared/utils/months';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as dayjs from 'dayjs';
import { MemberService } from '@shared/common-services/member.service';
import { Observable, catchError, finalize, tap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '@shared/common-services/toast.service';

@Component({
  selector: 'app-register-member-form',
  templateUrl: './register-member-form.component.html',
  styleUrls: ['./register-member-form.component.scss'],
})

export class RegisterMemberFormComponent {

  @Output()
  userRegistered = new EventEmitter<string>();
  
  public loading: boolean = false
  public monthsList: string[] = months
  public daysOfMonth: number = 31
  public memberForm = this.formBuilder.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: [''],
    birthDay: [''],
    birthMonth: ['']
  })

  constructor(
    private readonly formBuilder: FormBuilder, 
    private readonly memberService: MemberService,
    private readonly toast: ToastService,
  ) { }

  public onSubmit (): void {
    this.memberService.save(this.memberForm.value)
    .pipe(
      tap( ( userToken: any ): void => this.successSave( userToken ) ),
      finalize( (): boolean => this.loading = false ),
      catchError( ( error: HttpErrorResponse ): Observable<never> => this.errorRequest( error ) )
    ).subscribe();
  }

  successSave (data: any): void {
     this.userRegistered.emit('')
  }

  errorRequest (error: HttpErrorResponse ): Observable<never> {
    this.toast.show(error.error.message)
    return throwError(() => error);
  }
}
