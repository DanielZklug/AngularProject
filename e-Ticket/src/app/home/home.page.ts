import { Component } from '@angular/core';
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
    RouterLink
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
      label : this.currentLanguage.home.couponScan,
      color : 'danger',
      route : '',
      click : 1,
    },
     {
      thumbnail : 'rgba(255, 152, 0, 0.2)',
      icon : 'ticket-outline',
      label : this.currentLanguage.home.newCoupon,
      color : 'warning',
      route : 'coupon',
      click : 0
    },
    {
      thumbnail : 'rgba(76, 175, 80, 0.2)',
      icon : 'list-outline',
      label : this.currentLanguage.home.history,
      color : 'success',
      route : 'history',
      click : 0
    },
  ]

  public trans() {
    return this.currentLanguage;
  }

  match(p:number){}
  constructor() {}
}
