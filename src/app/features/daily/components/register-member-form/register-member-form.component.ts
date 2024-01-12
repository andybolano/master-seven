import { months } from '@shared/utils/months';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MemberService } from '@features/daily/services/member.service';
import { Observable, catchError, finalize, tap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '@shared/common-services/toast.service';
import { LoadingService } from '@shared/common-services/loading.service';
import { Member } from '@shared/interfaces/member.interface';
import { ResponseRequest } from '@shared/interfaces/reponse-request.interface';

@Component({
  selector: 'app-register-member-form',
  templateUrl: './register-member-form.component.html',
  styleUrls: ['./register-member-form.component.scss'],
})

export class RegisterMemberFormComponent {

  @Output()
  userRegistered = new EventEmitter<Member>();

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
    this.memberService.save(this.memberForm.value as Member)
    .pipe(
      tap( ( response: ResponseRequest<Member> ): void => this.successSave( response.data ) ),
      finalize( () => this.loading.close() ),
      catchError( ( error: HttpErrorResponse ): Observable<never> => this.errorRequest( error ) )
    ).subscribe();
  }

  successSave (member: Member): void {
    this.toast.show('Miembro registrado correctamente!')
    this.userRegistered.emit(member)
  }

  errorRequest (error: HttpErrorResponse ): Observable<never> {
    this.toast.show(error.error.message)
    return throwError(() => error);
  }
}
