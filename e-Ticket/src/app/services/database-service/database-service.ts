import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  
  public database(database : any){
    return new database()
  }

}
