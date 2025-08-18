import { Injectable, signal, WritableSignal } from '@angular/core';
import { SQLiteConnection, CapacitorSQLite, SQLiteDBConnection } from '@capacitor-community/sqlite';

const DB_ETICKET = 'couponsdb';

export interface Coupon {
  id: string;
  amount: number;
  create_at: number;
  status: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class Database {
  private sqlite : SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;
  private coupon : WritableSignal<Coupon[]> = signal<Coupon[]>([]);

  async initializePlugin() {
    this.db = await this.sqlite.createConnection(DB_ETICKET, false, 'no-encryption', 1,false);

    await this.db.open();

    const schema = `CREATE TABLE IF NOT EXISTS coupons (
      id TEXT PRIMARY KEY,
      amount INTEGER NOT NULL,
      create_at INTEGER NOT NULL,
      status BOOLEAN NOT NULL
    )`;

    await this.db.execute(schema);
    this.loadCoupons();
    return true;
  }

  getCoupons(){
    return this.coupon;
  }

  // CRUD

  async loadCoupons() {
    const result = await this.db.query('SELECT * FROM coupons');
    this.coupon.set(result.values as Coupon[]);
  }

  async addCoupon(amount : number){
    // Génère un identifiant unique sous forme de chaîne
    function generateUniqueId(): string {
      return 'id-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now();
    }
    const query = `INSERT INTO coupons (id, amount, create_at, status) VALUES ('${generateUniqueId()}', '${amount}', '${Date.now()}', '${true}')`;
    const result = await this.db.query(query);

    this.loadCoupons();

    return result;
  }

  async deleteCouponById(id : string){
    const query = `DELETE FROM coupons WHERE id=${id}`;
    const result = await this.db.query(query);

    this.loadCoupons();

    return result;
  }
}
