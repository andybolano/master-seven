import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonButton, IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RequestHeadersInterceptor } from '@shared/common-services/interceptors/request-header.interceptor';
import { environment } from '@env';
import { UserService } from '@shared/common-services/user.service';
import { ToastService } from '@shared/common-services/toast.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule, 
    AppRoutingModule, 
    IonicModule.forRoot()
  ],
  providers: [
    { 
      provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy 
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: RequestHeadersInterceptor,
        multi: true,
    },
    {
        provide: 'env',
        useValue: environment,
    },
    UserService,
    ToastService,
  ],
  bootstrap: [AppComponent],
  exports:[IonicModule,  IonButton]
})
export class AppModule {}
