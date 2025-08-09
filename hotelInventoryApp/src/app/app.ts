import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Rooms } from './rooms/rooms'
// import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Rooms],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit{
  protected title = 'hotelInventoryApp';

  role = "Admin";

  date = '';

  set(){
   let input = document.querySelector('input');
   if(input !== null){
    this.date = input.value;
   }
  }

  @ViewChild('name',{static : true}) name! : ElementRef;

  ngOnInit(): void {
    this.name.nativeElement.innerText = "Hotel hilton";
  }
}
