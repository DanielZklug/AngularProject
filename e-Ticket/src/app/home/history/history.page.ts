import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Mysql } from 'src/app/services/mysql/mysql';
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
  IonModal,
  IonMenu,
  IonMenuButton,
  IonListHeader,
  IonToggle,
  IonPopover
} from '@ionic/angular/standalone';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Sqlite } from 'src/app/services/sqlite/sqlite';
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
    QRCodeComponent,
    IonMenu,
    IonMenuButton,
]
})

export class HistoryPage implements OnInit{
  private currency : string = "fr";
  private qrOpen = false;
  private jsonData = '';
  private autodelete = true;

  // private coupons = this.database.getCoupons();
  private coupons: any = [];

  ngOnInit(): void {
    // this.coupons = this.localStorage.getCoupons()
    // this.mysql.getCoupons().subscribe(coupons => {
    //   this.coupons = coupons;
    // });
    this.coupons = this.sqlite.getCoupons()
    // this.autoDeleteOption();
  }

  constructor(
    private alertController: AlertController, 
    private translate: TranslateService,
    private toastCtrl: ToastController,
    private mysql : Mysql,
    private sqlite : Sqlite
  ) {}

  
  public get autodel() : boolean {
    return this.autodelete
  }
  

  public async presentAlert(id: string) {
    const alert = await this.alertController.create({
      message: this.translate.instant('history.confirmMessage'),
      buttons: [
        {
          text: this.translate.instant('history.cancel'),
          role: 'cancel',
          handler: () => {},
        },
        {
          text: this.translate.instant('history.ok'),
          role: 'confirm',
          handler: async () => {
            // this.localStorage.deleteCoupon(id,this.localStorage.firstKey)
            // this.mysql.deleteCoupon(id).subscribe({
            //   next: async () => {
            //     this.coupons = this.coupons.filter((c: any) => c.id !== id);
            //     const toast = await this.toastCtrl.create({
            //       message: this.translate.instant('history.success'),
            //       duration: 2000,
            //       position: 'middle',
            //       color: 'light',
            //       icon: 'checkmark-circle'
            //     });
            //     toast.present();
            //   },
            //   error: async () => {
            //     const toast = await this.toastCtrl.create({
            //       message: this.translate.instant('history.error'),
            //       duration: 2000,
            //       position: 'middle',
            //       color: 'danger',
            //       icon: 'close-circle'
            //     });
            //     toast.present();
            //   }
            // });
            try {
              this.sqlite.deleteCoupon(id);
              const toast = await this.toastCtrl.create({
                message: this.translate.instant('history.success'),
                duration: 2000,
                position: 'middle',
                color: 'light',
                icon: 'checkmark-circle'
              });
              toast.present();
            } catch (error) {
              const toast = await this.toastCtrl.create({
                message: this.translate.instant('history.error'),
                duration: 2000,
                position: 'middle',
                color: 'danger',
                icon: 'close-circle'
              });
              toast.present();
            }
          },
        },
      ],
    });

    await alert.present();
  }

  public activeQR(item: any){
    this.qrOpen = true;
    return this.jsonData = JSON.stringify(item);
  }

  public get couponCurrency() : string {
    return this.currency
  }
  
  public get couponQr() : boolean {
    return this.qrOpen
  }

  public set couponQr(v : boolean) {
    this.qrOpen = v;
  }
  
  public get couponQrJsonData() : string {
    return this.jsonData
  }

  public get couponsTable() : any[] {
    return this.coupons
  }

  public autoDel(){
    this.autodelete = !this.autodelete
  }
  
  public async autoDeleteOption() {
   try {
      // const response = this.localStorage.addCoupon(newCoupon,this.localStorage.firstKey)
      // this.mysql.autoDeleteCoupon().subscribe(coupon=>{
      //   this.coupons = coupon;
      // })
      // console.log('supprimer')
      const response = await this.sqlite.autoDeleteCoupon();
      this.coupons = this.sqlite.getCoupons()
      const toast = await this.toastCtrl.create({
        message: this.translate.instant('coupon.success'),
        duration: 2000,
        position: 'middle',
        color: 'light',
        icon: 'checkmark-circle'
      });
      toast.present();
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
}
