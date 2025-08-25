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
import { Sqlite } from 'src/app/services/sqlite/sqlite';
import { ToastController } from '@ionic/angular';
import { Mysql } from 'src/app/services/mysql/mysql';
import { generateUniqueId } from 'src/app/services/variables';



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
export class CouponPage{
  private couponAmount : number = 25
  private couponName : string = "e-Ticket";
  isMultipleOf25 : boolean = true;

  constructor(
    private toastCtrl: ToastController,
    private translate : TranslateService,
    private mysql : Mysql ,
    private sqlite : Sqlite
  ) { }

  
  public get amount() : number {
    return this.couponAmount;
  }

  public set amount(v : number) {
    this.couponAmount = parseInt(v.toString());
  }

  public get name() : string {
    return this.couponName;
  }

  
  public set name(v : string) {
    this.couponName = v;
  }
  
  
  

  async createCoupon() {
    const newCoupon = {
      idcoupon: generateUniqueId(),
      name : this.couponName.toString() === "" ? "e-Ticket" : this.couponName.toString(),
      amount: parseInt(this.couponAmount.toString()),
      create_at: Date.now(),
      status: 1,
      type : 'coupons'
    };

    try {
      // const response = this.localStorage.addCoupon(newCoupon,this.localStorage.firstKey)
      //const response = await this.mysql.addCoupon(newCoupon).toPromise();
      const response = await this.sqlite.addCoupon(newCoupon);
      console.log('Coupon ajouté:', response);

      const toast = await this.toastCtrl.create({
        message: this.translate.instant('coupon.success'),
        duration: 2000,
        position: 'middle',
        color: 'light',
        icon: 'checkmark-circle'
      });
      toast.present();

      this.couponAmount = 25;
      this.couponName = 'e-Ticket';
    } catch (error) {
      const toast = await this.toastCtrl.create({
        message: this.translate.instant('coupon.error'),
        duration: 2000,
        position: 'middle',
        color: 'danger',
        icon: 'close-circle'
      });
      toast.present();
      console.error('Erreur lors de l\'ajout du coupon:', error);
    }
  }

  public onAmountChange(event: any) {
    const value = Number(event.detail.value);
    this.isMultipleOf25 = this.validateMultipleOf25(value);
  }

  public validateMultipleOf25(amount: number): boolean {
    return amount > 0 && amount % 25 === 0;
  }

}
