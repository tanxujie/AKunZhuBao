import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import { Settings } from '../providers/settings';
import 'rxjs/add/operator/map';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  //private url: string = 'http://192.168.1.102:8080';
  //private url: string = 'http://123.56.11.216:80';
  private url: string = 'http://www.akunzhubao.com';

  constructor(public http: Http, private settings: Settings) {
  }

  get(endpoint: string, params?: any, options?: RequestOptions) {
    if (!options) {
      options = new RequestOptions();
    }

    if (!params) {
      params = {};
    }
    if ('app/login' !== endpoint) {
      params['authToken'] = this.settings.getValue('AUTH_TOKEN');
    }
    // Support easy query params for GET requests
    if (params) {
      let p = new URLSearchParams();
      for (let k in params) {
        p.set(k, params[k]);
      }
      // Set the search field if we have params and don't already have
      // a search field set in options.
      options.search = !options.search && p || options.search;
    }
    return this.http.get(this.url + '/' + endpoint, options);
  }

  post(endpoint: string, body: any, options?: RequestOptions) {
    body['authToken'] = this.settings.getValue('AUTH_TOKEN');
    return this.http.post(this.url + '/' + endpoint, body, options);
  }

  put(endpoint: string, body: any, options?: RequestOptions) {
    body['authToken'] = this.settings.getValue('AUTH_TOKEN');
    return this.http.put(this.url + '/' + endpoint, body, options);
  }

  delete(endpoint: string, options?: RequestOptions) {
    return this.http.delete(this.url + '/' + endpoint, options);
  }

  patch(endpoint: string, body: any, options?: RequestOptions) {
    body['authToken'] = this.settings.getValue('AUTH_TOKEN');
    return this.http.put(this.url + '/' + endpoint, body, options);
  }
}