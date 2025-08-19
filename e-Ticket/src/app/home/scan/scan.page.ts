import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Scan } from 'src/app/services/scan/scan';
import { Subscription } from 'rxjs';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonToast
} from '@ionic/angular/standalone';

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
    IonToast
  ]
})
export class ScanPage implements OnInit {
  isToast = false;
  toastData : any = {};
  private scanService = inject(Scan);
  scanSub!: Subscription;

  constructor() { }

  ngOnInit() {
    this.scanQrcode();
    this.scanSub = this.scanService.scan.subscribe({
      next : (scan) => {
        console.log(scan);
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

  async scanQrcode(params?:number){
    try {
      const code = await this.scanService.startScan(params);
      if(!code){
        this.isToast = !this.isToast;
        this.toast(params);
        throw(this.toastData.message);
      }
      if (params) {
        this.isToast = !this.isToast;
        this.toastData = {
          color : "success",
          message : "Payment sucessful"
        }
      }
      console.log(code);
         } catch (error) {
      console.log(error)
    }
  }

}
