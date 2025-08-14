import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Cart } from '../services/cart/cart';
import 
{ IonHeader, IonToolbar, IonContent, IonButton, IonButtons, IonIcon, IonItem, IonLabel, IonText, IonThumbnail, IonListHeader, IonRow, IonCol, IonCard, IonToast, IonBadge } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { cart } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonContent,
    IonButton,
    IonButtons,
    IonIcon,
    IonItem,
    IonLabel,
    IonText,
    IonThumbnail,
    IonListHeader,
    IonRow,
    IonCol,
    IonCard,
    RouterLink,
    IonToast,
    IonBadge
],
})
export class HomePage {
  isToast = false;
  toastData : any = {};
  totalItems: number = 0;
  cartSub!: Subscription;
  private cartService = inject(Cart);
  public userAvatar : string = 'assets/imgs/avatar.jpg';
  public insights = [
    {
      thumbnail : 'rgba(240, 94, 112, 0.2)',
      icon : 'scan-outline',
      label : 'Scan Product barcode',
      color : 'danger',
      route : '',
      click : 1,
    },
    {
      thumbnail : 'rgba(255, 152, 0, 0.2)',
      icon : 'list-outline',
      label : 'Products',
      color : 'warning',
      route : 'products',
      click : 0
    },
    {
      thumbnail : 'rgba(76, 175, 80, 0.2)',
      icon : 'checkmark-circle-outline',
      label : 'Transactions',
      color : 'success',
      route : '',
      click : 0
    },
    {
      thumbnail : 'rgba(94, 155, 240, 0.2)',
      icon : 'bag-handle-outline',
      label : 'Orders',
      color : 'tertiary',
      route : '',
      click : 0
    },
    {
      thumbnail : 'rgba(240, 143, 94, 0.2)',
      icon : 'scan-outline',
      label : 'Scan QRCode & Pay',
      color : '',
      route : '',
      click : 5
    },
  ]

  /**
   * toast
   */
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

  async scanBarcode(params?:number){
    try {
      const code = await this.cartService.startScan(params);
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
      this.cartService.addItemByBarcode(code);
    } catch (error) {
      console.log(error)
    }
  }

  match(expression : number){
    switch (expression) {
      case 1:
        this.scanBarcode();
      break;
      case 5:
        this.scanBarcode(0)
      break;
      default:
        break;
    }
  }

  ngOnInit(){
    this.cartSub = this.cartService.cart.subscribe({
      next : (cart) => {
        console.log(cart);
        this.totalItems = cart ? cart?.totalItems : 0;
      }
    })
  }
  constructor() {}
}
