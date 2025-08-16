import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from "ionicons";
import { 
  settingsOutline,
  personCircleOutline,
  scanOutline,
  ticketOutline,
  listOutline
} from "ionicons/icons";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  public appName: string = "e-Ticket";
  constructor() {
    this.addAllIcons();
  }

  addAllIcons(){
    addIcons({
      settingsOutline,
      personCircleOutline,
      scanOutline,
      ticketOutline,
      listOutline
    })
  }
}
