import { Injectable, signal, WritableSignal } from '@angular/core';
import { SQLiteConnection, CapacitorSQLite, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Coupon } from '../variables';
const DB_ETICKET = 'eticketdb';


@Injectable({
  providedIn: 'root'
})
export class Sqlite {
  private sqlite : SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;
  private coupon : WritableSignal<Coupon[]> = signal<Coupon[]>([]);

  async initializePlugin() {
    this.db = await this.sqlite.createConnection(DB_ETICKET, false, 'no-encryption', 1,false);

    await this.db.open();

    const schema = `CREATE TABLE IF NOT EXISTS coupons (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      idcoupon VARCHAR NOT NULL,
      name VARCHAR NOT NULL,
      amount INTEGER NOT NULL,
      create_at INTEGER NOT NULL,
      status BOOLEAN NOT NULL,
      type VARCHAR NOT NULL
    )`;

    await this.db.execute(schema);
    this.getCoupons();
    return true;
  }
  
  public get Coupons() {
    return this.coupon;
  }

  public async getCoupons() {
    const result = await this.db.query('SELECT * FROM coupons');
    this.coupon.set(result.values as Coupon[]);
    return this.Coupons()
  }

  public async getMyCoupons() {
    const result = await this.db.query("SELECT * FROM coupons WHERE type = 'mycoupons'");
    this.coupon.set(result.values as Coupon[]);
    return this.Coupons()
  }

  public async addCoupon(coupon : Coupon){
    const query = `INSERT INTO coupons (idcoupon, name, amount, create_at, status) VALUES ('${coupon.idcoupon}', '${coupon.name}', '${coupon.amount}', '${coupon.create_at}', '${coupon.status}', '${coupon.type}')`;
    const result = await this.db.query(query);

    this.getCoupons();
    this.getMyCoupons();

    return result;
  }

  public async updateCoupon(idcoupon : string) {
    const query = `UPDATE coupons SET status= 0 WHERE idcoupon=${idcoupon} AND type = 'coupons'`;
    const result = await this.db.query(query);

    this.getCoupons();
    this.getMyCoupons();

    return result;
  }

  public async deleteCoupon(idcoupon : string){
    const query = `DELETE FROM coupons WHERE id=${idcoupon}`;
    const result = await this.db.query(query);

    this.getCoupons();
    this.getMyCoupons();

    return result;
  }

  public async autoDeleteCoupon(){
    const query = "DELETE FROM coupons WHERE status=0 AND type='coupons'";
    const result = await this.db.query(query);

    this.getCoupons();
    this.getMyCoupons();

    return result;
  }
}
