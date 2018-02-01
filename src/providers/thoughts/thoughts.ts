import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Angular2TokenService } from 'angular2-token';


@Injectable()
export class ThoughtsProvider {

  constructor(private _tokenService: Angular2TokenService) {}

  saveThought(data) {
    return this._tokenService.post('thoughts', data).map(data => data);
  }

  getThought(thoughtId) {
    return this._tokenService.get(`thoughts/${thoughtId}`)
          .map(res => res.json());
  }

}
