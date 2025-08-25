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
  IonSegmentButton,
  IonFab,
  IonFabButton

} from '@ionic/angular/standalone';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastController } from '@ionic/angular';
import { QRCodeComponent } from 'angularx-qrcode';
import { Mysql } from 'src/app/services/mysql/mysql';
import { Sqlite } from 'src/app/services/sqlite/sqlite';

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
export class MycouponsPage implements OnInit{
  private currency : string = "fr";
  private qrOpen = false;
  private jsonData = '';

  private coupons : any = []
  public categories :any = [];

  constructor(
    private translate: TranslateService,
    private alertController: AlertController,
    private toastCtrl: ToastController,
    private mysql : Mysql,
    private sqlite : Sqlite
  ) { }

  ngOnInit(): void {
    // this.coupons = this.localStorage.getMyCoupons()
    // this.mysql.getMyCoupons().subscribe(coupons => {
    //   this.coupons = coupons;
    // });

    this.coupons = this.sqlite.getMyCoupons()
  }
  
  public createCategories(){
    this.coupons.forEach((element : any) => {
      this.categories.push(element.name);
      this.categories = [...new Set(this.categories)]
    });
    return this.categories
  }
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
            // this.localStorage.deleteCoupon(id,this.localStorage.secondKey);
            // this.coupons = this.localStorage.getMyCoupons();
            // this.mysql.deleteCoupon(id).subscribe({
            //   next: async () =>{
            //     this.coupons = this.mysql.getMyCoupons();
            //     const toast = await this.toastCtrl.create({
            //       message: this.translate.instant('history.success'),
            //       duration: 2000, // 2 secondes
            //       position: 'middle',
            //       color: 'light',
            //       icon : 'checkmark-circle'
            //     });
            //     toast.present();
            //   },
            //   error : async ()=>{
            //     const toast = await this.toastCtrl.create({
            //       message: this.translate.instant('history.error'),
            //       duration: 2000,
            //       position: 'middle',
            //       color: 'danger',
            //       icon: 'close-circle'
            //     });
            //     toast.present();
            //   }
            // })
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

  activeQR(item: any){
    this.qrOpen = true;
    return this.jsonData = item;
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

  public filter(event : CustomEvent){
    if (event.detail.value !== 'all') {
      // this.mysql.filterCoupon(event.detail.value).subscribe(coupons =>{
      //   this.coupons = coupons;
      // })
      this.coupons = this.sqlite.filterCoupon(event.detail.value);
    }else{
      // this.mysql.getMyCoupons().subscribe(coupons => {
      //   this.coupons = coupons;
      // });
      this.coupons = this.sqlite.getMyCoupons()
    }
  }
}
