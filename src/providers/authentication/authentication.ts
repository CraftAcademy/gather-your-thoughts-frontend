import {Injectable} from '@angular/core';


@Injectable()
export class AuthenticationProvider {
  currentUser: boolean = false;

  constructor() {}
}
