import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service.service';
import { ApiService } from 'src/app/services/api.service';
import { Room } from 'src/app/models/room/room.component';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {


  rooms: any[];
  private roomObj: Room[];
  private room: any = {};
  public editRoomForm = new FormGroup({
    roomSize: new FormControl(),
    numOfBeds: new FormControl(),
    seaView: new FormControl()
  });
  private sub: Subscription;

  // tslint:disable-next-line: variable-name
  constructor(private _auth: AuthService, private _apiService: ApiService) { }

  ngOnInit() {
    this.sub = this.getRooms();
  }

  getRooms() {
    return this._apiService.get('getRoom.php').
      subscribe((data: any) => {
        this.rooms = data.rooms;
        this.rooms.map(x => +x.sea_view === 1 ? x.sea_view = true : x.sea_view = false);
      });
  }

  editRoom(room) {
    this.room = room;
  }

  deleteRoom(room) {
    const body = new HttpParams()
      .set('id', room.id)
    this._apiService.post('deleteRoom.php', body.toString()).subscribe(x=>{
      this.sub.unsubscribe();
      this.sub = this.getRooms();
    })
  }

  submitRoom() {
    if (this.editRoomForm.value.seaView === true) {
      this.editRoomForm.value.seaView = 1;
    } else {
      this.editRoomForm.value.seaView = 0;
    }
    const body = new HttpParams()
      .set('roomsize', this.editRoomForm.value.roomSize)
      .set('beds', this.editRoomForm.value.numOfBeds)
      .set('id', this.room.id)
      .set('seaview', this.editRoomForm.value.seaView);

    this._apiService.post('editRoom.php', body.toString()).subscribe((data: any) => {
      this.sub.unsubscribe();
      this.sub = this.getRooms();
      document.getElementById('close-modal').click();
      this.editRoomForm.reset();
      this.room = {};
    }, (error) => {
      const obj = error.error.error;
    });
  }
}
