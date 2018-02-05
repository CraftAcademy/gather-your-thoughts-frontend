import { Injectable } from '@angular/core';


@Injectable()
export class AuthenticationProvider {
  currentUser: boolean = false;

  constructor() {
    console.log('Hello AuthenticationProvider Provider');
  }

  getUser() {
    if (this.currentUser) {
      return true }
    else {
      return false
    }
  }

}
