import { Component, OnInit, Injectable } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Barcode } from 'src/app/services/barcode/barcode';
import { 
  IonButtons, 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonBackButton, 
  IonIcon, 
  IonList, 
  IonItemSliding, 
  IonItem, 
  IonItemOption, 
  IonItemOptions, 
  IonLabel, 
  IonText, 
  AlertController, 
  IonButton,
  IonModal
} from '@ionic/angular/standalone';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
// import { Database } from 'src/app/services/database';
import { LocalStorage } from 'src/app/services/localstorage/local-storage';
import { ToastController } from '@ionic/angular';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonBackButton,
    IonButtons,
    IonList,
    IonItemSliding,
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonLabel,
    IonText,
    TranslateModule,
    IonIcon,
    IonButton,
    IonModal,
    QRCodeComponent
]
})

export class HistoryPage{
  public currency : string = "fr";
  isQrPay = false;
  jsonData = '';

  // public coupons = this.database.getCoupons();
  public coupons = this.localStorage.getAll(this.localStorage.firstStorageKey);
  constructor(
    private alertController: AlertController, 
    private translate: TranslateService,
    private localStorage : LocalStorage,
    private toastCtrl: ToastController,
  ) {}

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
            this.localStorage.delete(id,this.localStorage.firstStorageKey);
            this.coupons = this.localStorage.getAll(this.localStorage.firstStorageKey); //Mettre à jour la liste des coupons
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
    return this.jsonData = JSON.stringify(item);
  }
}
