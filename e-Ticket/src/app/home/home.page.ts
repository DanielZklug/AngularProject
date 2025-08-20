import { Component, Input, OnInit } from '@angular/core';
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
  IonBadge,
  IonRefresher,
  IonRefresherContent,
  RefresherCustomEvent
} from '@ionic/angular/standalone';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LocalStorage } from '../services/localstorage/local-storage';

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
    TranslateModule,
    IonBadge,
    IonRefresher,
    IonRefresherContent
  ],
})
export class HomePage{
  public appName: string = "e-Ticket";
  public nbrCoupons = this.localStorage.getAll(this.localStorage.firstStorageKey).length
  public nbrMyCoupons = this.localStorage.getAll(this.localStorage.secondStorageKey).length
  

  public insights = [
    {
      thumbnail : 'rgba(240, 94, 112, 0.2)',
      icon : 'scan-outline',
      label : 'home.couponScan',
      color : 'danger',
      route : 'scan',
    },
     {
      thumbnail : 'rgba(255, 152, 0, 0.2)',
      icon : 'ticket-outline',
      label : 'home.newCoupon',
      color : 'warning',
      route : 'coupon',
    },
    {
      thumbnail : 'rgba(76, 175, 80, 0.2)',
      icon : 'list-outline',
      label : 'home.history',
      color : 'success',
      route : 'history',
    },
    {
      thumbnail : 'rgba(94, 155, 240, 0.2)',
      icon : 'list-outline',
      label : 'home.myCoupon',
      color : 'tertiary',
      route : 'mycoupons',
    }
  ]
  constructor(private translate: TranslateService,private localStorage : LocalStorage,) {}

  handleRefresh(event: RefresherCustomEvent) {
    setTimeout(() => {
      // Any calls to load data go here
      this.nbrCoupons = this.localStorage.getAll(this.localStorage.firstStorageKey).length
      this.nbrMyCoupons = this.localStorage.getAll(this.localStorage.secondStorageKey).length
      event.target.complete();
    }, 2000);
  }

}
