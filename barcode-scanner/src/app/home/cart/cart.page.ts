import { Component, OnDestroy, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { Cart } from 'src/app/services/cart/cart';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonBackButton, IonIcon, IonCard, IonItem, IonThumbnail, IonImg, IonText, IonLabel, IonCol, IonRow, IonList, IonModal } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { QRCodeComponent } from 'angularx-qrcode';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButtons,
    IonBackButton,
    IonIcon,
    IonButton,
    IonCard,
    IonItem,
    IonThumbnail,
    IonImg,
    IonText,
    IonLabel,
    IonRow,
    IonCol,
    IonList,
    IonModal,
    QRCodeComponent
]
})
export class CartPage implements OnInit, OnDestroy {
  model: any = null;
  cartSub!: Subscription;
  currency = "XOF";
  isQrPay = false;
  isToast = false;
  toastData: any = {};

  private cartService = inject(Cart);

  constructor() { }

  ngOnInit() {
    this.cartSub = this.cartService.cart.subscribe({
      next : (cart) => {
        this.model = cart;
      }
    })
  }

  async startScan(){
    try{
      const code = await this.cartService.startScan();
      this.cartService.addItemByBarcode(code);
    }catch(e){
      console.log(e)
    }
  }

  addQuantity(item: any){
    this.cartService.addQuantity({...item, id: item?.item_id})
  }

  substractQuantity(item : any){
    this.cartService.substractQuantity({...item, id: item?.item_id})
  }

  ngOnDestroy() {
    if (this.cartSub) {
      this.cartSub.unsubscribe();
    }
  }

  async pay(modal : IonModal){
    try {
      const code = await this.cartService.startScan(0);
      if(!code){
        this.isToast = true;
        this.toastData = {
          color : 'danger',
          message : 'Error! Please Try again'
        }
        throw(this.toastData.message);
      }
      this.isToast = !this.isToast;
        this.toastData = {
          color : "success",
          message : "Payment sucessful"
      }
      modal.dismiss();

      this.cartService.clearCart();
    } catch (error) {
      console.log(error)
    }
  }
  
}
