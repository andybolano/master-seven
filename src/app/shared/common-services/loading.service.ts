import { Injectable } from "@angular/core";
import { LoadingController } from "@ionic/angular";

@Injectable({
    providedIn: 'root',
})
export class LoadingService {
    constructor(private loadingCtrl: LoadingController) {}
    
    private loading: HTMLIonLoadingElement | null = null;

    async show(message: string): Promise<void> {
        this.loading = await this.loadingCtrl.create({
          message: message,
        });
    
        this.loading.present();
    }

    close (): void {
        if (this.loading) {
            this.loading.dismiss();
        }
    }
}