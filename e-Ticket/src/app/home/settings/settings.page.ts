import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LocalStorage } from 'src/app/services/localstorage/local-storage';
import { ToastController } from '@ionic/angular';
import { 
  IonButtons,
  IonContent, 
  IonHeader, 
  IonItem, 
  IonList, 
  IonListHeader, 
  IonTitle, 
  IonToggle, 
  IonToolbar,
  IonBackButton, 
  IonSelect,
  IonSelectOption,
  AlertController
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule,
    IonList,
    IonListHeader,
    IonItem,
    IonToggle,
    IonButtons,
    IonBackButton,
    IonSelect,
    IonSelectOption,
    TranslateModule,

  ]
})
export class SettingsPage implements OnInit {
  private delete = false;
  private sectionName = 'Paramètres';
  private paletteToggle = false;
  private theme = this.paletteToggle ? 'ligth' : 'dark'
  // Use matchMedia to check the user preference
  private prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  constructor(
    private translate: TranslateService,
    private localstorage : LocalStorage,
    private alertController: AlertController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    // value of the prefers-color-scheme media query
    this.initializeDarkPalette(this.prefersDark.matches);

    // Listen for changes to the prefers-color-scheme media query
    this.prefersDark.addEventListener('change', (mediaQuery) => this.initializeDarkPalette(mediaQuery.matches));
  }
  

  // Check/uncheck the toggle and update the palette based on isDark
  initializeDarkPalette(isDark: boolean) {
    this.paletteToggle = isDark;
    this.toggleDarkPalette(isDark);
  }

  // deleteOption(){
  //   const storage = this.localstorage.getAll(this.localstorage.firstStorageKey);
  //   storage.forEach(element => {
  //     if (element.status === false) {
  //       this.localstorage.delete(element.id,this.localstorage.firstStorageKey)
  //     }
  //   });
  // }

  // async presentAlert() {
  //   const alert = await this.alertController.create({
  //     message: 'Cette option supprime automatiquement les coupons utilisés , voulez vous vraiment l\'activée',
  //     buttons: 
  //     [
  //       {
  //         text: this.translate.instant('history.cancel'),
  //         role: 'cancel',
  //         handler: () => {
  //         },
  //       },
  //       {
  //         text: this.translate.instant('history.ok'),
  //         role: 'confirm',
  //         handler: async () => {
  //           this.deleteOption();
  //           const toast = await this.toastCtrl.create({
  //             message: this.translate.instant('history.success'),
  //             duration: 2000, // 2 secondes
  //             position: 'middle',
  //             color: 'light',
  //             icon : 'checkmark-circle'
  //           });
  //           toast.present();
  //         },
  //       },
  //     ],
  //   });

  //   await alert.present();
  // }

  // Listen for the toggle check/uncheck to toggle the dark palette
  toggleChange(event: CustomEvent) {
    this.toggleDarkPalette(event.detail.checked);
  }

  // Add or remove the "ion-palette-dark" class on the html element
  toggleDarkPalette(shouldAdd: boolean) {
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
  }

  handleChange(event: CustomEvent) {
    const lang = event.detail.value; // exemple: 'fr' ou 'en'
    this.translate.use(lang);

    return lang;
  }

  public get themeToggle() : boolean {
    return this.paletteToggle;
  }
  
  public set themeSettings(v : boolean) {
    this.paletteToggle = v;
  }
  
}
