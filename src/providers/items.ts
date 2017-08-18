import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Api } from './api';

import { Item } from '../models/item';

@Injectable()
export class Items {
  items: Item[] = [];

  constructor(public http: Http, public api: Api) {
  }

  query(params?: any) {
    this.api.get('product/search', params)
            .toPromise()
            .then(res => this.handleResult(res.json()) )
            .catch(err => console.log(err));
    return this.items;
  }

  private handleResult(res) {
    let content = res.content;
    this.items.length = 0;
    if (res.success) {
      for (let item of content) {
        this.items.push(new Item(item));
      }
    }

    return this.items;
  }

  add(item: Item) {
    //this.items.push(item);
  }

  delete(item: Item) {
    //this.items.splice(this.items.indexOf(item), 1);
  }
}
