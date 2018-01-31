import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Angular2TokenService } from 'angular2-token';


@Injectable()
export class LabelsProvider {

  constructor(private _tokenService: Angular2TokenService) {}

  getLabels() {
    return this._tokenService.get('labels')
          .map(res => res.json());
  }

  getLabelThoughts(labelId) {
    return this._tokenService.get(`labels/${labelId}`)
            .map(res => res.json());
  }
}
