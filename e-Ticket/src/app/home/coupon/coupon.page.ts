import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent, 
  IonHeader, 
  IonInput, 
  IonText, 
  IonTitle, 
  IonToolbar,
  IonBackButton,
} from '@ionic/angular/standalone';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Database } from 'src/app/services/database/database';
import { ToastController } from '@ionic/angular';
import { LocalStorage, Coupon } from 'src/app/services/localstorage/local-storage';


@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.page.html',
  styleUrls: ['./coupon.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule,
    IonCardContent,
    IonInput,
    IonCard,
    IonCardHeader,
    IonButton,
    IonText,
    IonButtons,
    IonBackButton,
    TranslateModule
  ]
})
export class CouponPage implements OnInit {
  public couponAmount = 0

  constructor(
    private localStorage : LocalStorage,
    private toastCtrl: ToastController,
    private translate : TranslateService
  ) { }

  // parseInt(){
  //   this.couponAmount = parseInt(this.couponAmount.toString());
  // }

  // async createCoupon(){
  //   await this.database.addCoupon(this.couponAmount);
  //   this.couponAmount = 0;
  // }

  async createCoupon(){
    const newCoupon: Coupon = {
      id: 'ABC' + Math.floor(Math.random() * 1000),
      amount: parseInt(this.couponAmount.toString()),
      create_at: Date.now(),
      status : true
    };

    this.localStorage.save(newCoupon);

    const toast = await this.toastCtrl.create({
      message: this.translate.instant('coupon.success'),
      duration: 2000, // 2 secondes
      position: 'middle',
      color: 'light',
      icon : 'checkmark-circle'
    });
    toast.present();

    this.couponAmount = 0;
  }
  ngOnInit() {
  }

}
