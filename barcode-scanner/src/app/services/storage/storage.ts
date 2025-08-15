import { Injectable } from '@angular/core';
import { Preferences } from "@capacitor/preferences";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  setStorage(key: string, value: string): void {
    Preferences.set({ key, value})
  }

  getStorage(key: string) {
    return Preferences.get({ key})
  }

  removeStorage(key: string): void {
    Preferences.remove({ key})
  }
}
