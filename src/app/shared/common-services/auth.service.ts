import { Injectable } from "@angular/core";
import { GeneralRequestService } from "./general-request/general-request.service";
import { Observable } from "rxjs";
import { EndPoints } from "../dictionaries/end-points/end-points";
import { Login } from "@shared/interfaces/login.interface";
import { UserToken } from "@shared/interfaces/user.interface";

@Injectable()
export class AuthService {
    constructor(
        private readonly generalRequestService: GeneralRequestService,
        private readonly endPoints: EndPoints,
    ) {

    }

    auth (data: Login): Observable<UserToken> {
        return this.generalRequestService.post<UserToken, Login>(this.endPoints.login().auth(), data)
    }
    
}