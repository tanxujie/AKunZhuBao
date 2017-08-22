import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Api } from '../api';

/*
  Generated class for the MicroClassProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class MicroClassProvider {

  constructor(public http: Http, public api: Api) {
    console.log('Hello MicroClassProvider Provider');
  }

  query(params?: any) {
    return this.api.get('microclass/app/search', params).map(resp => resp.json()); 
  }
}
