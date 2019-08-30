import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl()
  });

  constructor(private _api: ApiService, private _router: Router, private _auth: AuthService) { }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this._router.navigateByUrl('home');
    }
  }

  public register() {
    const body = new HttpParams()
      .set('username', this.registerForm.value.username)
      .set('password', this.registerForm.value.password)
      .set('firstName', this.registerForm.value.firstName)
      .set('lastName', this.registerForm.value.lastName)
      .set('email', this.registerForm.value.email);
    this._api.post('registerUser.php', body.toString()).subscribe((data: any) => {
      localStorage.setItem('token', data.token);
      this._auth.setAuth(true);
      this._router.navigate(['']);
    }, (error) => {
      const obj = error.error.error;

      const element = document.getElementsByClassName('alert')[0] as HTMLElement;
      element.style.display = 'block';
      element.innerHTML = obj.split('\\r\\n').join('<br/>').split('\"').join('');
    });
  }

}
