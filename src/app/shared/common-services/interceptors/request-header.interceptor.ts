import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Injectable()
export class RequestHeadersInterceptor implements HttpInterceptor {
    constructor (private userService: UserService) {

    }
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const token: string | null = this.userService.getToken();

        request = request.clone({
            setHeaders: {
                'Content-Type': 'application/json',
            }
        });

        if (token) {
            request = request.clone({ 
                headers: request.headers.set('Authorization', `Bearer ${token}`) 
            });
        }

    
        return next.handle(request);
    }
}
