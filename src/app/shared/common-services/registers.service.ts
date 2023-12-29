import { Injectable } from "@angular/core";
import { GeneralRequestService } from "./general-request/general-request.service";
import { EndPoints } from "@shared/dictionaries/end-points/end-points";
import { Observable } from "rxjs";

@Injectable()
export class RegistersService {
    constructor(
        private readonly generalRequestService: GeneralRequestService,
        private readonly endPoints: EndPoints,
    ) {

    }

    getByDate (date: string): Observable<any> {
        return this.generalRequestService.get<any>(this.endPoints.registers().getByDate(date))
    }

    save (data: any): Observable<any> {
        return this.generalRequestService.post<any, any>(this.endPoints.registers().save(), data)
    }

}