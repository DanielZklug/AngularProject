import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonIcon, IonList, IonItemSliding, IonItem, IonItemOption, IonItemOptions, IonLabel, IonText, IonAlert, AlertController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonBackButton,
    IonButtons,
    IonList,
    IonItemSliding,
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonLabel,
    IonText,
]
})
export class HistoryPage implements OnInit {

  public currency : string = "fr";

  public coupons = [
    {
      id: this.generateUniqueId(),
      amount: 500,
      create_at : Date.now(),
      status: false
    },
    {
      id: this.generateUniqueId(),
      amount: 200,
      create_at : Date.now(),
      status: true
    },
    {
      id: this.generateUniqueId(),
      amount: 550,
      create_at : Date.now(),
      status: true
    },
    {
      id: this.generateUniqueId(),
      amount: 150,
      create_at : Date.now(),
      status: false
    },
    {
      id: this.generateUniqueId(),
      amount: 300,
      create_at : Date.now(),
      status: true
    },
     {
      id: this.generateUniqueId(),
      amount: 300,
      create_at : Date.now(),
      status: false
    },
  ]
  // Génère un identifiant unique sous forme de chaîne
  generateUniqueId(): string {
    return 'id-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now();
  }
  constructor(private alertController: AlertController) {}

  async presentAlert() {
    const alert = await this.alertController.create({
      message: 'Voulez-vous vraiment supprimer ce coupon ?',
      buttons: 
      [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            console.log("element supprimé");
          },
        },
      ],
    });

    await alert.present();
  }

  ngOnInit() {
  }

}
