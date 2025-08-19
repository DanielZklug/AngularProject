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
import { Barcode } from 'src/app/services/barcode/barcode';

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
    IonSegmentButton
  ]
})
export class MycouponsPage implements OnInit{
  showBarcode = this.barcode.showBarcode;
  public currency : string = "fr";

  public coupons : Coupon[] = [
    {
      id: this.localStorage.generateUniqueId(),
      amount: 500,
      create_at: Date.now(),
      status : true
    },
    {
      id: this.localStorage.generateUniqueId(),
      amount: 50,
      create_at: Date.now(),
      status : true
    },
    {
      id: this.localStorage.generateUniqueId(),
      amount: 150,
      create_at: Date.now(),
      status : true
    },
    {
      id: this.localStorage.generateUniqueId(),
      amount: 550,
      create_at: Date.now(),
      status : true
    },
    {
      id: this.localStorage.generateUniqueId(),
      amount: 300,
      create_at: Date.now(),
      status : true
    }
  ]

  constructor(
    private translate: TranslateService, 
    private localStorage : LocalStorage,
    private alertController: AlertController,
    private toastCtrl: ToastController,
    private barcode : Barcode
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
    this.barcode.items = [...this.coupons];
  }

  getBarcodeData(item : any){
    this.barcode.itemsModel = {...item};
    this.showBarcode = true;

    setTimeout(()=>{
      this.barcode.getBarcode(item.id);
    }, 500)
  }
}
