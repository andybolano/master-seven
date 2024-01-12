import { ResponseRequest } from './../../../../shared/interfaces/reponse-request.interface';
import { LoadingService } from '@shared/common-services/loading.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Member } from '@shared/interfaces/member.interface';
import { MemberService } from '@features/daily/services/member.service';
import { Observable, catchError, finalize, map, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '@shared/common-services/toast.service';

@Component({
  selector: 'app-item-member',
  templateUrl: './item-member.component.html',
  styleUrls: ['./item-member.component.scss'],
})
export class ItemMemberComponent {

  @Input({ required: true }) member!: Member;
  
  @Output()
  memberUpdated = new EventEmitter<Member>();

  public isModalOpen = false;
  public actionSheetButtons = [
    {
      text: 'Si',
      role: 'destructive',
      data: {
        action: 'deactivateMember',
      },
    },
    {
      text: 'No',
      role: 'destructive',
    },
  ];

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private loading: LoadingService,
    private memberService: MemberService,
    private toast: ToastService,
  ) { }

  async showConfirm() {
    const title = this.member.status 
      ? `¿Realmente desea desactivar a ${ this.member.name }?`
      : `¿Realmente desea activar a ${ this.member.name }?`

    const confirmText =  this.member.status ? 'Si, Desactivar' : 'Si, Activar'

    const actionSheet = await this.actionSheetCtrl.create({
      header: title,
      buttons: [
        {
          text: 'No, cancelar',
        },
        {
          text: confirmText,
          role: 'confirm'
        },
      ],
    });

    await actionSheet.present();

    actionSheet.onDidDismiss().then((data: any)=> {
      if(data.role === 'confirm') {
        this.deactivateMember()
      }
    })
  }

  private deactivateMember (): void {
    this.loading.show('Actualizando Miembro')

    const member = structuredClone(this.member)
    member.status = !member.status
    this.memberService.toggleStatusMember(member)
    .pipe(
      catchError( ( error: HttpErrorResponse ): Observable<never> => this.errorRequest( error ) ),
      finalize((): void => this.loading.close()),
    ).subscribe({
      next: (response: ResponseRequest<Member>) => this.resolveUpdate(response.data)
    });
  }

  private resolveUpdate (member: Member): void {
    this.toast.show('Miembro actualizado correctamente')
    this.memberService.updateMemberStatus(member)
  }

  private errorRequest (error: HttpErrorResponse ): Observable<never> {
    this.toast.show(error.error.message)
    return throwError(() => error);
  }

}
