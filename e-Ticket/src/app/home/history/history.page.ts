import { Component, OnInit, Injectable } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  AlertController 
} from '@ionic/angular/standalone';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
// import { Database } from 'src/app/services/database';
import { LocalStorage } from 'src/app/services/localstorage/local-storage';
import { ToastController } from '@ionic/angular';

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
    IonIcon
]
})

export class HistoryPage implements OnInit {

  public currency : string = "fr";

  // public coupons = this.database.getCoupons();
  public coupons = this.localStorage.getAll();
  generateUniqueId(): string {
    return 'id-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now();
  }
  constructor(
    private alertController: AlertController, 
    private translate: TranslateService,
    private localStorage : LocalStorage,
    private toastCtrl: ToastController
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
            this.localStorage.delete(id);
            this.coupons = this.localStorage.getAll(); //Mettre à jour la liste des coupons
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

  ngOnInit() {
  }

}
