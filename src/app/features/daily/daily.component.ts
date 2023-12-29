import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoadingService } from '@shared/common-services/loading.service';
import { RegistersService } from '@shared/common-services/registers.service';
import { ToastService } from '@shared/common-services/toast.service';
import { UserService } from '@shared/common-services/user.service';
import { SchoolClass } from '@shared/interfaces/user.interface';
import { Observable, catchError, finalize, map, throwError } from 'rxjs';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.scss']
})
export class DailyComponent  implements OnInit {
  public members: any[] = []
  public schoolClass: SchoolClass = this.userService.getClassInformation() as SchoolClass;
  public isModalOpen = false

  constructor (
    private readonly registersService: RegistersService,
    private readonly userService: UserService,
    private readonly toast: ToastService,
    private readonly loading: LoadingService,
  ) { }

  ngOnInit() {
    this.getRegisters()
  }

  private getRegisters (): void {
    this.loading.show('Consultando registros')
    this.registersService.getByDate('2023-12-12')
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
    const dataToSave = this.members.map(member => {
      return {
        memberId: member.id,
        date: '2023-12-12',
        registerTypes: member.registerTypes
      }
    })

    this.registersService.save(dataToSave)
    .pipe(
      finalize((): void => this.loading.close() ),
      catchError( ( error: HttpErrorResponse ): Observable<never> => this.errorRequest( error ) )
    ).subscribe({
      next: () => this.getRegisters()
    });
  }

  private errorRequest (error: HttpErrorResponse ): Observable<never> {
    this.toast.show(error.error.message)
    return throwError(() => error);
  }

  public userRegistered (): void {
    this.setOpen(false)
    this.getRegisters()
  }

  public setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}
