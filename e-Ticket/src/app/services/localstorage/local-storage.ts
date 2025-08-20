import { Injectable } from '@angular/core';

export interface Coupon {
  id: string;
  amount: number;
  create_at: number;
  status: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorage {
  firstStorageKey = 'coupons';
  secondStorageKey = 'mycoupons';

  constructor() {}

  /** 🔹 Récupérer tous les coupons */
  getAll(storageKey : string): Coupon[] {
    const data = localStorage.getItem(storageKey);
    return data ? JSON.parse(data) : [];
  }

  generateUniqueId(): string {
    return 'id-' + Math.random().toString(13).substr(2, 9) + '-' + Date.now();
  }

  /** 🔹 Sauvegarder un nouveau coupon */
  save(coupon: Coupon,storageKey : string): void {
    const coupons = this.getAll(storageKey);

    // Vérifier si le code existe déjà
    const exists = coupons.some(c => c.id === coupon.id);
    if (!exists) {
      coupons.push(coupon);
      localStorage.setItem(storageKey, JSON.stringify(coupons));
    } else {
      console.warn('Coupon déjà existant : ' + coupon.id);
    }
  }

  /** 🔹 Supprimer un coupon par code */
  delete(code: string,storageKey: string): void {
    let coupons = this.getAll(storageKey);
    coupons = coupons.filter(c => c.id !== code);
    localStorage.setItem(storageKey, JSON.stringify(coupons));
  }

  /** 🔹 Vider tous les coupons */
  clear(): void {
    localStorage.removeItem(this.firstStorageKey);
  }

}
