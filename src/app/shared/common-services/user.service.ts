import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { SchoolClass, User, UserToken } from "@shared/interfaces/user.interface";

@Injectable()
export class UserService {

    constructor (private readonly route: Router) {}

    setData (userToken: UserToken): void {
        localStorage.setItem('user', JSON.stringify(userToken.user))
        localStorage.setItem('token', JSON.stringify(userToken.token))
    }

    getUser (): User | null {
        try {
            const userData = localStorage.getItem('user');
            if (userData) {
                return JSON.parse(userData);
            }
        } catch (error) {
            console.error('Error parsing user data:', error);
        }
        return null; 
    }

    getToken (): string | null {
      return this.tokenExist() ? JSON.parse(localStorage.getItem('token') || '{}') : null
    }

    private tokenExist (): boolean {
        return !!localStorage.getItem('token')
    }

    isAuthenticated (): boolean {
        return this.tokenExist()
    }

    getClassInformation (): SchoolClass | null {
        return this.getUser()?.school_class || null
    }

    closeSession (routeToRedirect: string = '/'): void {
        localStorage.clear()
        this.route.navigateByUrl( routeToRedirect );
    }
}