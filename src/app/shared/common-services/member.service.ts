import { Injectable } from "@angular/core";
import { EndPoints } from "@shared/dictionaries/end-points/end-points";
import { GeneralRequestService } from "./general-request/general-request.service";
import { Observable } from "rxjs";
import { Member } from "@shared/interfaces/member.interface";

@Injectable()
export class MemberService {
    constructor (
        private readonly endpoint: EndPoints,
        private readonly generalRequest: GeneralRequestService
    ) {

    }

    public save (data: Member): Observable<Member> {
        return this.generalRequest.post<Member, Member>(this.endpoint.members().save(), data)
    }

    public toggleStatusMember (data: Member): Observable<Member> {
        return this.generalRequest.patch<Member, Member>(this.endpoint.members().update(data.id), data)
    }
}