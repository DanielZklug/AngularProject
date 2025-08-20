import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonBackButton,
  IonButtons,
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonModal,
  IonLabel,
  IonIcon,
  IonList,
  IonItem,
  IonItemSliding,
  IonText,
  IonItemOption,
  IonItemOptions,
  AlertController,
  IonButton,
  IonSegment,
  IonSegmentButton

} from '@ionic/angular/standalone';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LocalStorage ,Coupon } from 'src/app/services/localstorage/local-storage';
import { ToastController } from '@ionic/angular';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-mycoupons',
  templateUrl: './mycoupons.page.html',
  styleUrls: ['./mycoupons.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader,  
    IonToolbar, 
    CommonModule, 
    FormsModule,
    TranslateModule,
    IonBackButton,
    IonButtons,
    IonLabel,
    IonIcon,
    IonList,
    IonItem,
    IonItemSliding,
    IonText,
    IonItemOption,
    IonItemOptions,
    IonModal,
    IonButton,
    IonSegment,
    IonSegmentButton,
    QRCodeComponent
  ]
})
export class MycouponsPage{
  public currency : string = "fr";
  isQrPay = false;
  jsonData = '';

  public coupons = this.localStorage.getAll(this.localStorage.secondStorageKey)

  constructor(
    private translate: TranslateService, 
    private localStorage : LocalStorage,
    private alertController: AlertController,
    private toastCtrl: ToastController
  ) { }

  async presentAlert(id : string) {
    const alert = await this.alertController.create({
      message: this.translate.instant('history.confirmMessage'),
      buttons: 
      [
        {
          text: this.translate.instant('history.cancel'),
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: this.translate.instant('history.ok'),
          role: 'confirm',
          handler: async () => {
            this.localStorage.delete(id,this.localStorage.secondStorageKey);
            this.coupons = this.localStorage.getAll(this.localStorage.secondStorageKey); //Mettre à jour la liste des coupons
            const toast = await this.toastCtrl.create({
              message: this.translate.instant('history.success'),
              duration: 2000, // 2 secondes
              position: 'middle',
              color: 'light',
              icon : 'checkmark-circle'
            });
            toast.present();
          },
        },
      ],
    });

    await alert.present();
  }

  activeQR(item: any){
    this.isQrPay = true;
    return this.jsonData = item;
  }
}
