import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  async show(message: string, timer = 5000) {
    const toast = await this.toastController.create({
      message: message,
      duration: timer,
      position: "bottom",
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
          handler: () => {
            this.setOpen(false);
          },
        },
      ],
    });

    toast.present();
  }

  setOpen(isOpen: boolean) {
    console.log('Setting isOpen to:', isOpen);
  }
}