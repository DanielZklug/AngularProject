import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
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
  IonSelectOption
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
    TranslateModule
  ]
})
export class SettingsPage implements OnInit {
  sectionName = 'Paramètres';
  paletteToggle = false;
  theme = this.paletteToggle ? 'ligth' : 'dark'
  // Use matchMedia to check the user preference
  prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  constructor(private translate: TranslateService) { }

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
  }

}
