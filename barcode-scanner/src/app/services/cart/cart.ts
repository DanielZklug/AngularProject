import { inject, Injectable } from '@angular/core';
import { CapacitorBarcodeScanner } from "@capacitor/barcode-scanner";
import { BehaviorSubject } from 'rxjs';
import { products } from 'src/app/database/database';
// import{ StorageService } from ''
@Injectable({
  providedIn: 'root'
})
export class Cart {
  model : any = null;
  cartStoreName = 'barcode_cart';
  products : any[] = [...products]
  private carts = new BehaviorSubject<any>(null);

  
  get cart(){
    return this.carts.asObservable();
  }

  private storageService = inject(Storage)
  
  
  async startScan(val?: number){
    try {
      const result = await CapacitorBarcodeScanner.scanBarcode({
        hint : val || 17,
        cameraDirection : 1
      })
      console.log(result);
      return result.ScanResult;
    } catch (error) {
      throw(error);
    }
  }

  addItemByBarcode(barcode : string){
    const item = this.products.find((item) => item.barcode == barcode);
    if (!item) {
      throw 'No such item found';
    }
    this.addQuantity(item);
  }

  addQuantity(item : any){
    console.log(item);

    if(this.model){
      const index = this.model.items.findIndex(
        (data: any) => data.item_id == item.id
      )
    }
  }
}
