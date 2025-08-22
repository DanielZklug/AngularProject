import { Component, OnInit } from '@angular/core';
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
import { Mysql } from '../services/mysql/mysql';

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
export class HomePage implements OnInit{
  private appName: string = "e-Ticket";
  private nbrCoupons = 0
  private nbrMyCoupons = 0;

  public refresh(){
    let nbrCoupons : any = []
    let nbrMyCoupons : any = []
    this.mysql.getCoupons().subscribe(coupons => {
      nbrCoupons = coupons;
      this.nbrCoupons = nbrCoupons.length;
    });
    this.mysql.getMyCoupons().subscribe(coupons => {
      nbrMyCoupons = coupons;
      this.nbrMyCoupons = nbrMyCoupons.length;
    });
  }

  ngOnInit(): void {
    this.refresh()
  }

  private insights = [
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
  constructor(private translate: TranslateService,private localStorage : LocalStorage, private mysql : Mysql) {}

  handleRefresh(event: RefresherCustomEvent) {
    setTimeout(() => {
      // Any calls to load data go here
      this.refresh()
      event.target.complete();
    }, 2000);
  }
  
  public get app() : string {
    return this.appName
  }
  
  public get insightsTable() : any[]  {
    return this.insights
  }
  
  public get nbrCouponsHome() : number {
    return this.nbrCoupons
  }

  
  public get nbrMyCouponsHome() : number {
    return this.nbrMyCoupons
  }
  
}
