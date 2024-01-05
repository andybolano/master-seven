import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@shared/common-services/auth.service';
import { LoadingService } from '@shared/common-services/loading.service';
import { ToastService } from '@shared/common-services/toast.service';
import { UserService } from '@shared/common-services/user.service';
import { Login } from '@shared/interfaces/login.interface';
import { UserToken } from '@shared/interfaces/user.interface';
import { Observable, catchError, finalize, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  public authForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,  
    private route: ActivatedRoute,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly toast: ToastService,
    private readonly loading: LoadingService
  ) { }

  onSubmit (): void {
    this.loading.show('Autenticando')
    this.authService.auth(this.authForm.value as Login)
    .pipe(
      tap( ( userToken: UserToken ): void => this.successLogin( userToken ) ),
      finalize( () => this.loading.close()),
      catchError( ( error: HttpErrorResponse ): Observable<never> => this.errorLogin( error ) )
    ).subscribe();
  }

  successLogin (userToken: UserToken): void {
    this.userService.setData(userToken)
    this.router.navigate(['/daily'], { relativeTo: this.route });
  }

  errorLogin (error: HttpErrorResponse ): Observable<never> {
    console.log(error)
    this.toast.show(error.error.message)
    return throwError(() => error);
  }
}
