import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
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
    lastName: new FormControl()
  });

  constructor(private _api: ApiService, private _router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this._router.navigateByUrl('/home');
    }
  }

  public register() {
    const body = new HttpParams()
    .set('username', this.registerForm.value.username)
    .set('password', this.registerForm.value.password)
    .set('firstName', this.registerForm.value.firstName)
    .set('lastName', this.registerForm.value.lastName);

    this._api.post('registerUser.php', body.toString()).subscribe((data: any) => {
      console.log(data)
      localStorage.setItem('token', JSON.parse(data['_body']).token);
      this._router.navigate(['./']);
    }, (error) => {
      console.log(error);
      const obj = JSON.parse(error['_body']).error;
      
      const element  = <HTMLElement> document.getElementsByClassName('alert')[0];
      element.style.display = 'block';
      element.innerHTML = obj.split('\\r\\n').join('<br/>').split('\"').join('');
    });
  }

}
