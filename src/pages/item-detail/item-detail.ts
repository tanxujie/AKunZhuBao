import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Items } from '../../providers/providers';

declare let Wechat: any;

@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item: any;

  constructor(public navCtrl: NavController, navParams: NavParams, items: Items) {
    this.item = navParams.get('item');// || items.defaultItem;
  }

  shareWxTimeLine() {
    /*Wechat.isInstalled(function (installed) {
      alert("Wechat installed: " + (installed ? "Yes" : "No"));
    }, function (reason) {
      alert("Failed: " + reason);
    });*/

    Wechat.share({
      message: {
        title: this.item.name,
        description: this.item.description || '',
        //thumb: this.item.imageName,
        media: {
          type: Wechat.Type.IMAGE,
          image: this.item.imageName
        }
      },
      //text: "This is just a plain string",
      scene: Wechat.Scene.SESSION   // share to Timeline
    }, function () {
      alert("Success");
    }, function (reason) {
      alert("Share " + this.item.imageName + " Failed: " + reason);
    });
  }
}
