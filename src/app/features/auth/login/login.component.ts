import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@shared/common-services/auth.service';
import { Observable, catchError, finalize, map, takeUntil, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loading: boolean = false

  public authForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,  
    private route: ActivatedRoute,
    private readonly authService: AuthService,
  ) { }

  onSubmit (): void {

    this.authService.auth(this.authForm.value)
    .pipe(
      tap( ( userToken: any ): void => this.successLogin( userToken ) ),
      finalize( (): boolean => this.loading = false ),
      catchError( ( error: HttpErrorResponse ): Observable<never> => this.errorLogin( error ) )
    ).subscribe();
  }

  successLogin (userToken: any): void {
    this.router.navigate(['/daily'], { relativeTo: this.route });
  }

  errorLogin (error: HttpErrorResponse ): Observable<never> {
    return throwError( error );
  }
}
