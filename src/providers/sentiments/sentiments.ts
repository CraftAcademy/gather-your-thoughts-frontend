import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Angular2TokenService} from 'angular2-token';

@Injectable()
export class SentimentsProvider {

  constructor(private _tokenService: Angular2TokenService) {
  }

  getSentiments() {
    return this._tokenService.get('sentiments')
      .map(res => res.json());
  }

  getSentimentEntries(sentimentId) {
    return this._tokenService.get(`sentiments/${sentimentId}`)
      .map(res => res.json());
  }

  getMonthSentiments() {
    return this._tokenService.get('sentiments/statistics')
      .map(res => res.json());
  }
}
