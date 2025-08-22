export interface Coupon {
  idcoupon : string;
  name : string;
  amount: number;
  create_at: number;
  status: number;
  type : string
}
export function  generateUniqueId(): string {
  return 'id-' + Math.random().toString(13).substr(2, 9) + '-' + Date.now();
}