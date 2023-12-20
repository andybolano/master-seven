import { Injectable } from "@angular/core";
import { GeneralRequestService } from "./general-request/general-request.service";
import { Observable } from "rxjs";
import { EndPoints } from "../dictionaries/end-points/end-points";

@Injectable()
export class AuthService {
    constructor(
        private readonly generalRequestService: GeneralRequestService,
        private readonly endPoints: EndPoints,
    ) {

    }

    auth (data: any): Observable<any> {
        return this.generalRequestService.post<any, any>(this.endPoints.login().auth(), data)
    }
    
}