import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coupon } from '../variables';

@Injectable({
  providedIn: 'root'
})
export class Mysql {
  constructor(private http : HttpClient){}
  private apiUrl = 'http://localhost/e-Ticket/';

  public getCoupons() {
    return this.http.get(this.apiUrl + 'read.php');
  }

  public getMyCoupons(){
    return this.http.get(this.apiUrl + 'readmy.php');
  }

  public addCoupon(coupon: Coupon) {
    return this.http.post(this.apiUrl + 'create.php', coupon);
  }

  public updateCoupon(idcoupon: string, coupon: Coupon) {
    return this.http.put(this.apiUrl + `update.php?id=${idcoupon}`, coupon);
  }

  public deleteCoupon(idcoupon: string) {
    return this.http.delete(this.apiUrl + `delete.php?id=${idcoupon}`);
  }

  public autoDeleteCoupon() {
    return this.http.delete(this.apiUrl + `autodelete.php`);
  }
}
