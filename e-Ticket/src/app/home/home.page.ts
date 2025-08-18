import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonItem, 
  IonLabel, 
  IonText, 
  IonThumbnail,
  IonListHeader,
  IonRow,
  IonCol,
  IonCard,
} from '@ionic/angular/standalone';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
// import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonButton,
    IonButtons,
    IonIcon,
    IonItem,
    IonThumbnail,
    IonLabel,
    IonText,
    IonListHeader,
    IonRow,
    IonCol,
    IonCard,
    RouterLink,
    TranslateModule
  ],
})
export class HomePage {
  public appName: string = "e-Ticket";
  
  public insights = [
    {
      thumbnail : 'rgba(240, 94, 112, 0.2)',
      icon : 'scan-outline',
      label : this.translate.instant('home.couponScan'),
      color : 'danger',
      route : '',
    },
     {
      thumbnail : 'rgba(255, 152, 0, 0.2)',
      icon : 'ticket-outline',
      label : this.translate.instant('home.newCoupon'),
      color : 'warning',
      route : 'coupon',
    },
    {
      thumbnail : 'rgba(76, 175, 80, 0.2)',
      icon : 'list-outline',
      label : this.translate.instant('home.history'),
      color : 'success',
      route : 'history',
    },
  ]
  constructor(private translate: TranslateService) {}
}
