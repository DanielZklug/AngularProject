import { Injectable } from '@angular/core';
import { Coupon } from '../variables';


@Injectable({
  providedIn: 'root'
})
export class LocalStorage {
  private firstStorageKey = 'coupons';
  private secondStorageKey = 'mycoupons';

  constructor() {}

  getCoupons(): Coupon[] {
    const data = localStorage.getItem(this.firstStorageKey);
    return data ? JSON.parse(data) : [];
  }

  getMyCoupons(): Coupon[] {
    const data = localStorage.getItem(this.secondStorageKey);
    return data ? JSON.parse(data) : [];
  }

  addCoupon(coupon: Coupon,storageKey : string): void{
    if (storageKey === this.firstStorageKey) {
      localStorage.setItem(storageKey, JSON.stringify(this.getCoupons().push(coupon)));
    } else if(storageKey === this.secondStorageKey) {
      localStorage.setItem(storageKey, JSON.stringify(this.getMyCoupons().push(coupon)));
    }else{
      console.warn('Error message')
    }
  }

  deleteCoupon(idcoupon: string,storageKey: string): void {
    if (storageKey === this.firstStorageKey) {
      localStorage.setItem(storageKey, JSON.stringify(this.getCoupons().filter(c => c.idcoupon !== idcoupon)));
    } else if(storageKey === this.secondStorageKey) {
      localStorage.setItem(storageKey, JSON.stringify(this.getCoupons().filter(c => c.idcoupon !== idcoupon)));
    }else{
      console.warn('Error message')
    }
  }

  updateCoupon(idcoupon: string, storageKey : string){
    if (storageKey === this.firstStorageKey) {
      this.getCoupons().forEach(element => {
        if (element.idcoupon = idcoupon) {
          element.status = 0;
        }
      });
    } else if(storageKey === this.secondStorageKey){
      this.getMyCoupons().forEach(element => {
        if (element.idcoupon = idcoupon) {
          element.status = 0;
        }
      });
    }else{
      console.warn('Error message')
    }
  }

  // clear(): void {
  //   localStorage.removeItem(this.firstStorageKey);
  // }

  
  public get firstKey() : string {
    return this.firstStorageKey
  }
  
  public get secondKey() : string {
    return this.secondStorageKey
  }
}
