import { ResponseRequest } from '@shared/interfaces/response-request.interface';
import { Injectable } from "@angular/core";
import { EndPoints } from "@shared/dictionaries/end-points/end-points";
import { GeneralRequestService } from "../../../shared/common-services/general-request/general-request.service";
import { Observable, Subject } from "rxjs";
import { Member } from "@shared/interfaces/member.interface";

@Injectable()
export class MemberService {

    public members: Member[] = [];
    public subject = new Subject<Member[]>();
    
    constructor (
        private readonly endpoint: EndPoints,
        private readonly generalRequest: GeneralRequestService
    ) {

    }

    public save (data: Member): Observable<ResponseRequest<Member>> {
        return this.generalRequest.post<ResponseRequest<Member>, Member>(this.endpoint.members().save(), data)
    }

    public toggleStatusMember (data: Member): Observable<ResponseRequest<Member>> {
        return this.generalRequest.patch<ResponseRequest<Member>, Member>(this.endpoint.members().update(data.id), data)
    }

    public setMembers (members: Member[]): void {
        this.members = members
        this.subject.next(this.members)
    }

    public getMemberByIndex (index: number): Member {
        return this.members[index]
    }

    public addMember (member: Member): void {
        this.members = [ ...this.members, member ]
        this.subject.next(this.members)
    }

    public updateMemberStatus (member: Member): void {
        const index = this.members.findIndex((item: Member) => item.id === member.id);
        if (index !== -1) {
            this.members[index].status = member.status
        }
        this.subject.next(this.members)
    }
}