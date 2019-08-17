import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { AuthService} from "./services/auth-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private _router: Router, private _authService: AuthService) {}

  logout() {
    !!localStorage.getItem('admin') ? localStorage.removeItem('admin') : '';
    !!localStorage.getItem('token') ? localStorage.removeItem('token') : '';
    this._authService.setAuth(false);
    this._router.navigateByUrl('home');
  }
}
