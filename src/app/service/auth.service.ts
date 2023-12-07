import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isAuthenticated = false;

  get isAuthenticated() {
    return this._isAuthenticated;
  }

  constructor() { }

  authenticate() {
    this._isAuthenticated = true;
  }

  deauthenticate() {
    this._isAuthenticated = false;
  }

}