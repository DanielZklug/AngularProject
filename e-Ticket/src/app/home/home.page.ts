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
import { TranslateModule } from '@ngx-translate/core';
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

  public en = {
    home: {
      dashboard: "Dashboard",
      yourOptions: "Your options",
      couponScan: "Coupon Scan",
      newCoupon: "New Coupon",
      history: "History",
    }
  };
  public fr = {
    home: {
      dashboard: "Tableau de bord",
      yourOptions: "Vos options",
      couponScan: "Scannez le coupon",
      newCoupon: "Nouveau coupon",
      history: "Historique",
    }
  };
  public currentLanguage = this.fr;

  public insights = [
    {
      thumbnail : 'rgba(240, 94, 112, 0.2)',
      icon : 'scan-outline',
      label :"Scannez le coupon",
      color : 'danger',
      route : '',
    },
     {
      thumbnail : 'rgba(255, 152, 0, 0.2)',
      icon : 'ticket-outline',
      label : "Nouveau coupon",
      color : 'warning',
      route : 'coupon',
    },
    {
      thumbnail : 'rgba(76, 175, 80, 0.2)',
      icon : 'list-outline',
      label : "Historique",
      color : 'success',
      route : 'history',
    },
  ]
  constructor() {}
}
