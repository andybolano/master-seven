import { Injectable } from "@angular/core";
import { SchoolClass, User, UserToken } from "@shared/interfaces/user.interface";

@Injectable()
export class UserService {

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

    getClassInformation (): SchoolClass | null {
        return this.getUser()?.school_class || null
    }
    
}