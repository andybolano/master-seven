import { months } from '@shared/utils/months';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MemberService } from '@shared/common-services/member.service';
import { Observable, catchError, finalize, tap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '@shared/common-services/toast.service';
import { UserToken } from '@shared/interfaces/user.interface';
import { LoadingService } from '@shared/common-services/loading.service';

@Component({
  selector: 'app-register-member-form',
  templateUrl: './register-member-form.component.html',
  styleUrls: ['./register-member-form.component.scss'],
})

export class RegisterMemberFormComponent {

  @Output()
  userRegistered = new EventEmitter<string>();

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
    private readonly loading: LoadingService
  ) { }

  public onSubmit (): void {
    this.loading.show('Registrando miembro')
    this.memberService.save(this.memberForm.value)
    .pipe(
      tap( ( userToken: UserToken ): void => this.successSave( userToken ) ),
      finalize( () => this.loading.close() ),
      catchError( ( error: HttpErrorResponse ): Observable<never> => this.errorRequest( error ) )
    ).subscribe();
  }

  successSave (data: UserToken): void {
    this.toast.show('Miembro registrado correctamente!')
     this.userRegistered.emit('')
  }

  errorRequest (error: HttpErrorResponse ): Observable<never> {
    this.toast.show(error.error.message)
    return throwError(() => error);
  }
}
