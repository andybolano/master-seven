import { Injectable } from "@angular/core";
import { EndPoints } from "@shared/dictionaries/end-points/end-points";
import { GeneralRequestService } from "./general-request/general-request.service";
import { Observable } from "rxjs";

@Injectable()
export class MemberService {
    constructor (
        private readonly endpoint: EndPoints,
        private readonly generalRequest: GeneralRequestService
    ) {

    }

    public save (data: any): Observable<any> {
        return this.generalRequest.post<any, any>(this.endpoint.members().save(), data)
    }
}