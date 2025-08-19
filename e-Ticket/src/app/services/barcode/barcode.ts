import { Injectable } from '@angular/core';
import JsBarcode from 'jsbarcode';

@Injectable({
  providedIn: 'root'
})
export class Barcode {
  public items : any[] = [];
  public itemsModel : any = {};
  public ItemModelName : string = '';
  public showBarcode : boolean = false;
  
  getBarcode(barcode: string) {
    JsBarcode("#barcode", barcode, {
      // format: 'CODE128',
      displayValue: true,
      lineColor: "#0aa",
      width: 4,
      height: 200,
    });
  }
}
