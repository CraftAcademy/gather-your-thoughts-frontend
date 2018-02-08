import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class AnalyticsProvider {

  constructor(private _tokenService: Angular2TokenService) {}

  getLabels(text) {
    return this._tokenService.get(`analyses?text=${text}`)
      .map(res => res.json());
  }
}
