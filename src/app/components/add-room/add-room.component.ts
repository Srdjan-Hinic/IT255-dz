import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

import { ApiService } from '../../services/api.service';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit {

  public addRoomForm = new FormGroup({
    roomSize: new FormControl(),
    numOfBeds: new FormControl(),
    seaView: new FormControl()
  });

  constructor(private _api: ApiService, private _router: Router, private _auth: AuthService) { }

  ngOnInit() {
    if (this._auth.isAuth && this._auth.isAdmin) { } else {
      this._router.navigateByUrl('home');
    }
  }

  submitRoom() {

    if (this.addRoomForm.value.seaView === true) {
      this.addRoomForm.value.seaView = 1;
    } else {
      this.addRoomForm.value.seaView = 0;
    }
    const body = new HttpParams()
      .set('roomsize', this.addRoomForm.value.roomSize)
      .set('beds', this.addRoomForm.value.numOfBeds)
      .set('seaview', this.addRoomForm.value.seaView);

    this._api.post('addRoom.php', body.toString()).subscribe((data: any) => {
      const element = document.getElementsByClassName('alert')[0] as HTMLElement;
      element.style.display = 'block';
      element.style.background = 'rgb(56, 207, 96)';
      element.innerHTML = 'Room added.';
    }, (error) => {
      const obj = error.error.error;

      const element = document.getElementsByClassName('alert')[0] as HTMLElement;
      element.style.display = 'block';
      element.style.background = 'rgb(227, 68, 68)';
      element.innerHTML = obj.split('\\r\\n').join('<br/>').split('\"').join('');
    });
  }

}
