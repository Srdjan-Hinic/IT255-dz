import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service.service';
import { ApiService } from 'src/app/services/api.service';
import { Room } from 'src/app/models/room/room.component';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  rooms: any[];
  private roomObj: Room[];

  // tslint:disable-next-line: variable-name
  constructor(private _auth: AuthService, private _apiService: ApiService) { }

  ngOnInit() {
    this._apiService.get('getRoom.php').
      subscribe((data: any) => {
        this.rooms = data.rooms;
      });

  }
}
