import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Angular2TokenService } from 'angular2-token';


@Injectable()
export class EntriesProvider {

  constructor(private _tokenService: Angular2TokenService) {}

  saveEntry(data) {
    return this._tokenService.post('entries', data).map(data => data);
  }

  getEntry(entryId) {
    return this._tokenService.get(`entries/${entryId}`)
          .map(res => res.json());
  }

  deleteEntry(entryId) {
    return this._tokenService.delete(`entries/${entryId}`)
          .map(res => res.json());
  }

  getRecentEntries() {
    return this._tokenService.get('entries').map(res => res.json());
  }

  updateEntry(entryId, data) {
    return this._tokenService.put(`entries/${entryId}`, data).map(data => data);
  }

  getWeeklyThoughts() {
    return this._tokenService.get('activity').map(res => res.json());
  }
}
