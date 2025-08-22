import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Scan } from 'src/app/services/scan/scan';
import { LocalStorage } from 'src/app/services/localstorage/local-storage';
import { Subscription } from 'rxjs';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonToast,
  IonRow,
  IonCol,
  IonCard,
  IonIcon,
  IonThumbnail,
  IonLabel,
  ToastController
} from '@ionic/angular/standalone';
import { Mysql } from 'src/app/services/mysql/mysql';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule,
    TranslateModule,
    IonBackButton,
    IonButtons,
    IonToast,
    IonRow,
    IonCol,
    IonCard,
    IonIcon,
    IonThumbnail,
    IonLabel

  ]
})
export class ScanPage implements OnInit {
  private toastOpen = false;
  private toastData : any = {};
  private scanService = inject(Scan);
  private scanSub!: Subscription;

  private scans = [
    {
      thumbnail : 'rgba(255, 152, 0, 0.2)',
      icon : 'scan-circle-outline',
      label : 'scan.full',
      color : 'warning',
    },
    {
      thumbnail : 'rgba(76, 175, 80, 0.2)',
      icon : 'scan-circle-sharp',
      label : 'scan.id',
      color : 'success',
    }
  ]

  constructor(
    private localStorage : LocalStorage,
    private translate : TranslateService, 
    private toastCtrl : ToastController,
    private mysql : Mysql
  ) { }

  ngOnInit() {
    
  }

  public scanCoupon(){
    this.addByQrcode();
    this.scanSub = this.scanService.scan.subscribe({
      next : (scan) => {
        console.log(scan)
      }
    })
  }

  public scanId(){
    this.updateByQrcode();
    this.scanSub = this.scanService.scan.subscribe({
      next : (scan) => {
        console.log(scan)
      }
    })
  }



  public toast(params?:number) {
    if (!params) {
      this.toastData = {
        color : 'danger',
        message : 'No such barcode available'
      }
    }else{
      this.toastData = {
        color : 'danger',
        message : 'Error! Please Try again'
      }
    }
    
  }

  public async addByQrcode(params?:number){
    try {
      const code = await this.scanService.startScan(params);
      if(!code){
        this.toastOpen = !this.toastOpen;
        this.toast(params);
        throw(this.toastData.message);
      }
      const newCoupon  = {
        idcoupon : JSON.parse(code).idcoupon,
        name : JSON.parse(code).name,
        amount : JSON.parse(code).amount,
        create_at : JSON.parse(code).create_at,
        status : JSON.parse(code).status,
        type : "mycoupons"
      }
      // const response = this.localStorage.addCoupon(newCoupon,this.localStorage.secondKey)
      const response = await this.mysql.addCoupon(newCoupon).toPromise();
      console.log('Coupon ajouté:', response);
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

  public async updateByQrcode(params?:number) {
    const code = await this.scanService.startScan(params);
    const updatedCoupon = { ...JSON.parse(code) };
    this.mysql.updateCoupon(code, updatedCoupon).subscribe({
      next: async () => {
        const toast = await this.toastCtrl.create({
          message: "Mise à jour réussie",
          duration: 2000,
          position: 'middle',
          color: 'light',
          icon: 'checkmark-circle'
        });
        toast.present();
      },
      error: async () => {
        const toast = await this.toastCtrl.create({
          message: "Échec de la mise à jour",
          duration: 2000,
          position: 'middle',
          color: 'danger',
          icon: 'close-circle'
        });
        toast.present();
      }
    });
  }

  
  public get scansTable() : any[] {
    return this.scans
  }
  
  
  public get ToastOpen() : boolean {
    return this.toastOpen
  }

  
  public set toastopen(v : boolean) {
    this.toastOpen = v;
  }
  
  
  public get toastdata() : any {
    return this.toastData;
  }
  
  

}
