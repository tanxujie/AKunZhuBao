import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Api } from '../api';

/*
  Generated class for the ProductProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ProductProvider {
  constructor(public http: Http, public api: Api) {
    console.log('Hello ProductProvider Provider');
  }

  query(params?: any) {
    return this.api.get('product/app/search', params).map(resp => resp.json());
  }
}
