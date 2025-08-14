import { Component, OnInit } from '@angular/core';
import { products } from 'src/app/database/database';
import JsBarcode from 'jsbarcode';
import 
{ 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonButtons, 
  IonBackButton, 
  IonList, 
  IonImg, 
  IonItem, 
  IonThumbnail, 
  IonText, 
  IonLabel, 
  IonButton,
  IonIcon,
  IonModal
} from '@ionic/angular/standalone';



@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonList,
    IonImg,
    IonThumbnail,
    IonItem,
    IonText,
    IonLabel,
    IonButton,
    IonIcon,
    IonModal
]
})
export class ProductsPage implements OnInit {

  public items : any[] = [];
  public itemsModel : any = {};
  public ItemModelName : string = '';
  public showBarcode : boolean = false;
  public currency : string = 'XOF';
  constructor() { }

  ngOnInit() {
    this.items = [...products];
  }

  getBarcodeData(item : any){
    this.itemsModel = {...item};
    this.showBarcode = true;

    setTimeout(()=>{
      this.getBarcode(item.barcode);
    }, 500)
  }

  getBarcode(barcode: string) {
    JsBarcode("#barcode", barcode, {
      // format: 'CODE128',
      displayValue: false,
      lineColor: "#0aa",
      width: 4,
      height: 200,
    });
  }
}