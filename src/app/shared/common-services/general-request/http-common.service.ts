import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { UserService } from '../user.service';

@Injectable({
    providedIn: 'root'
})
export class HttpCommonService {
    constructor (private readonly user: UserService) {

    }

    handleError<T>(error: HttpErrorResponse): Observable<T> {
        if (error.status === 401) {
            this.user.closeSession()
        }
        return throwError(() => error);
    }
}
