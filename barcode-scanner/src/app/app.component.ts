import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { bagHandleOutline, barcodeOutline, cartOutline, checkmarkCircleOutline, closeOutline, listOutline, scanOutline } from "ionicons/icons";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {
    this.addAllIcons();
  }

  addAllIcons(){
    addIcons({
      cartOutline,
      scanOutline,
      listOutline,
      checkmarkCircleOutline,
      bagHandleOutline,
      barcodeOutline,
      closeOutline
    });
  }
}
