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
  IonBackButton
} from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { Database } from 'src/app/services/database';

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

  constructor(private database : Database) { }

  async createCoupon(){
    await this.database.addCoupon(this.couponAmount);
    this.couponAmount = 0;
  }

  ngOnInit() {
  }

}
