import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authToken: string;
  user: String;

  constructor() { }

  getAuthToken(): string{
      this.authToken = localStorage.getItem('id_token');
      return this.authToken;
  }
  
  storeAuthData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user=user;
  }

  invalidate(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
