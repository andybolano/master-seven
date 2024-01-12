import { Injectable } from "@angular/core";
import { GeneralRequestService } from "../../../shared/common-services/general-request/general-request.service";
import { EndPoints } from "@shared/dictionaries/end-points/end-points";
import { Observable } from "rxjs";
import { Member } from "@shared/interfaces/member.interface";
import { ResponseRequest } from "@shared/interfaces/reponse-request.interface";
import { RegisterToSave } from "@shared/interfaces/register-to-save.interface";

@Injectable()
export class RegistersService {
    constructor(
        private readonly generalRequestService: GeneralRequestService,
        private readonly endPoints: EndPoints,
    ) {

    }

    getByDate (date: string): Observable<ResponseRequest<Member[]>> {
        return this.generalRequestService.get<any>(this.endPoints.registers().getByDate(date))
    }

    save (data: RegisterToSave[]): Observable<ResponseRequest<Member[]>> {
        return this.generalRequestService.post<ResponseRequest<Member[]>, RegisterToSave[]>(this.endPoints.registers().save(), data)
    }

}