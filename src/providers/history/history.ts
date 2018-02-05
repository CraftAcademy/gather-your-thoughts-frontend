import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Angular2TokenService } from 'angular2-token';


@Injectable()
export class HistoryProvider {

  constructor(private _tokenService: Angular2TokenService) {}

  getDateEntries(date) {
    return this._tokenService.get(`history?date=${date}`)
      .map(res => res.json());
  }
}
