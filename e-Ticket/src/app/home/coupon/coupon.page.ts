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
    IonBackButton
  ]
})
export class CouponPage implements OnInit {
  public sectionName : string = "Nouveau Coupon";
  

  constructor() { }

  ngOnInit() {
  }

}
