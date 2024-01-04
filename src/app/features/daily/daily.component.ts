import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoadingService } from '@shared/common-services/loading.service';
import { RegistersService } from '@shared/common-services/registers.service';
import { ToastService } from '@shared/common-services/toast.service';
import { UserService } from '@shared/common-services/user.service';
import { SchoolClass } from '@shared/interfaces/user.interface';
import { Observable, catchError, finalize, map, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.scss']
})
export class DailyComponent {
  public members: any[] = []
  public schoolClass: SchoolClass = this.userService.getClassInformation() as SchoolClass;
  public isModalOpen = false;
  private dateSelected = ''

  constructor (
    private readonly registersService: RegistersService,
    private readonly userService: UserService,
    private readonly toast: ToastService,
    private readonly loading: LoadingService,
  ) { }

  private getRegisters (date: string): void {
    this.loading.show('Consultando registros')
    this.registersService.getByDate(date)
    .pipe(
      map((response: any) => response),
      finalize((): void => this.loading.close()),
      catchError( ( error: HttpErrorResponse ): Observable<never> => this.errorRequest( error ) )
    ).subscribe({
      next: (response: any) => this.resolveList(response)
    });
  }

  private resolveList (list: any): void {
    this.members = list.members
  }

  public saveRegisters (): void {
    this.loading.show('Guardando registros')
    const dataToSave = this.members.map(member => (
      {
        memberId: member.id,
        date: this.dateSelected,
        registerTypes: member.registerTypes
      }
    ))

    this.registersService.save(dataToSave)
    .pipe(
      finalize((): void => this.loading.close() ),
      tap(( response: any ): void => this.successRegister() ),
      catchError( ( error: HttpErrorResponse ): Observable<never> => this.errorRequest( error ) )
    ).subscribe({
      next: () => this.getRegisters(this.dateSelected)
    });
  }

  private successRegister (): void {
    this.toast.show('Bien hecho, se ha realizado el registro corretamente.')
  }

  public setSelectedDate (date: string): void {
    this.dateSelected = date
    this.getRegisters(date)
  }

  private errorRequest (error: HttpErrorResponse ): Observable<never> {
    this.toast.show(error.error.message)
    return throwError(() => error);
  }

  public userRegistered (): void {
    this.setToggleModalMember(false)
    this.getRegisters(this.dateSelected)
  }

  public setToggleModalMember(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  public logout(): void {
    this.userService.closeSession()
  }
}
