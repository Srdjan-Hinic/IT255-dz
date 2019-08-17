import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class AuthService implements OnInit {

  private isAuth: boolean;
  private $isAdmin: Subject<boolean> = new Subject;
  private isAdmin: Observable<boolean>;

  constructor() {
    this.isAuth = this.isAuthenticated();
    this.isAdmin = this.$isAdmin.next(this.isAdministrator());
    
  }

  ngOnInit() {

  }

  public isAuthenticated(): boolean {

    const token = localStorage.getItem('token');
    if (token != null) {
      this.isAuth = true;
      return true;
    }
    else {
      this.isAuth = false;
      return false;
    }
  }

  public isAdministrator(): boolean {
    const admin = localStorage.getItem('admin');
    if (admin != null) {
      this.isAdmin = true;
      return true;
    }
    this.isAdmin = false;
    return false;
  }

  public getAuth() {
    return this.isAuth;
  }

  public setAuth(auth: boolean) {
    this.isAuth = auth;
  }

  public getAdmin() {
    return this.isAdmin;
  }
  

}
