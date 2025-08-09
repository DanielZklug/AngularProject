import { CurrencyPipe, DatePipe, DecimalPipe, UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { RoomList } from '../rooms.interface';


@Component({
  selector: 'app-rooms-list',
  imports: [DatePipe, CurrencyPipe, DecimalPipe, UpperCasePipe],
  templateUrl: './rooms-list.html',
  styleUrl: './rooms-list.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomsList implements OnInit, OnChanges{

  @Input() rooms : RoomList[] = [];

  @Input() title : string = '';

  @Output() selectedRoom = new EventEmitter<RoomList>();

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes['title']) {
      this.title = changes['title'].currentValue.toUpperCase();
    }
  }

  selectRoom(room: RoomList){
    this.selectedRoom.emit(room);
  }
}
