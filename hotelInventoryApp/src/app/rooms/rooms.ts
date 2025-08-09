import { AfterViewChecked, AfterViewInit, Component, DoCheck, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Room, RoomList } from './rooms.interface';
import { Header } from '../header/header';
import { RoomsList } from './rooms-list/rooms-list';
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'app-rooms',
  imports: [RoomsList, JsonPipe, Header],
  templateUrl: './rooms.html',
  styleUrl: './rooms.scss'
})
export class Rooms implements OnInit, DoCheck, AfterViewInit, AfterViewChecked{
  hotelName = "Angular Hotel";
  numberOfRooms = 10;
  hideRooms = false;

  selectedRoom! : RoomList;

  title = 'Liste des chambres';

  rooms : Room = {
    totalRooms : 20,
    availableRooms : 10,
    bookedRooms : 5
  }

  roomList: RoomList[] = [];

  ngOnInit(): void{
    this.roomList = [
       {
    roomNumber : 1,
    roomType: "Chambre Standard",
    amenities: "Wi-Fi, Télévision, Climatisation",
    price: 35000,
    photos: "standard1.jpg",
    checkInTime: new Date("2025-07-12T14:00:00"),
    checkOutTime: new Date("2025-07-13T12:00:00"),
    rating : 3.5
  },
  {
    roomNumber : 2,
    roomType: "Suite Junior",
    amenities: "Wi-Fi, Télévision, Mini-bar, Balcon",
    price: 55000,
    photos: "junior_suite.jpg",
    checkInTime: new Date("2025-07-12T14:00:00"),
    checkOutTime: new Date("2025-07-13T12:00:00"),
    rating : 4.5
  },
  {
    roomNumber : 3,
    roomType: "Chambre Deluxe",
    amenities: "Wi-Fi, Baignoire, Vue sur jardin",
    price: 70000,
    photos: "deluxe.jpg",
    checkInTime: new Date("2025-07-12T14:00:00"),
    checkOutTime: new Date("2025-07-13T12:00:00"),
    rating : 1.3
  },
  {
    roomNumber : 4,
    roomType: "Chambre Économique",
    amenities: "Wi-Fi, Ventilateur",
    price: 20000,
    photos: "eco.jpg",
    checkInTime: new Date("2025-07-12T14:00:00"),
    checkOutTime: new Date("2025-07-13T12:00:00"),
    rating : 2.8
  },
  {
    roomNumber : 5,
    roomType: "Chambre Familiale",
    amenities: "Wi-Fi, 2 lits doubles, Micro-ondes",
    price: 60000,
    photos: "familiale.jpg",
    checkInTime: new Date("2025-07-12T14:00:00"),
    checkOutTime: new Date("2025-07-13T12:00:00"),
    rating : 4.8
  },
  {
    roomNumber : 6,
    roomType: "Chambre Solo",
    amenities: "Wi-Fi, lubrifiant, Savon, gel douche",
    price: 6000,
    photos: "familiale.jpg",
    checkInTime: new Date("2025-07-12T14:00:00"),
    checkOutTime: new Date("2025-07-13T12:00:00"),
    rating : 10.8
  }
    ]
  }

  toggle(){
    this.hideRooms = !this.hideRooms;
    this.title = "Liste des chambres";
  }

  ngDoCheck(): void {
    console.log('on changes is called')
  }

  selectRoom(room : RoomList){
    this.selectedRoom = room;
  }

  addRoom(){
    let room : RoomList = {
      roomNumber : 7,
      roomType: "Chambre UltraSolo",
      amenities: "Wi-Fi, lubrifiant, Savon, gel douche, coldgirl",
      price: 3000,
      photos: "familiale.jpg",
      checkInTime: new Date("2025-07-12T14:00:00"),
      checkOutTime: new Date("2025-07-13T12:00:00"),
      rating : 50.8
    }

    try {
      this.roomList = [...this.roomList, room];
    } catch (error) {
      console.error(error)
    }
    console.log(this.roomList);
  }

  @ViewChild(Header) header! : Header;

  @ViewChildren(Header) headerComponent! : QueryList<Header>;

  ngAfterViewInit(): void {
    this.header.title = "Interface des Chambres"
    this.headerComponent.last.title = "Hello";
  }

  ngAfterViewChecked(): void {
    
  }
}
