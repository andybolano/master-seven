import { Injectable } from "@angular/core";
import { environment } from "@env";

@Injectable({
    providedIn: 'root'
})
export class EndPoints {
    private readonly urlApi: string;
  
    constructor () {
      this.urlApi = environment.urlApi;
    }

    public login () {
        return {
            auth: (): string => `${this.urlApi}/login`,
        };
    }

    public registers () {
        return {
            getByDate: (date: string): string => `${this.urlApi}/registers/${date}`,
            save: (): string => `${this.urlApi}/registers`
        }
    }

    public members () {
        return {
            save: (): string => `${this.urlApi}/members`
        }
    }
}
  