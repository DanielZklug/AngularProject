import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { TranslateService } from '@ngx-translate/core';
import { addIcons } from "ionicons";

import { 
  settingsOutline,
  personCircleOutline,
  scanOutline,
  ticketOutline,
  listOutline,
  checkmarkCircle
} from "ionicons/icons";
import { Database } from './services/database/database';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  public appName: string = "e-Ticket";
  constructor(translate : TranslateService, private database : Database) {
    this.addAllIcons();
    this.initApp();
  }

  async initApp() {
    await this.database.initializePlugin();
  }

  addAllIcons(){
    addIcons({
      settingsOutline,
      personCircleOutline,
      scanOutline,
      ticketOutline,
      listOutline,
      checkmarkCircle
    })
  }
}
