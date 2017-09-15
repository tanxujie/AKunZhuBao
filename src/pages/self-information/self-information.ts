import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Settings } from '../../providers/settings';

/**
 * Generated class for the SelfInformationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-self-information',
  templateUrl: 'self-information.html',
})
export class SelfInformationPage {

  phoneNumber:string;
  aliasName: string;
  wechatNumber: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private settings: Settings) {
    let vals = settings.getValue("LOGIN_ACCOUNT");
    if (vals) {
      this.phoneNumber = vals.phoneNumber;
      this.aliasName = vals.wechatNumber;
      this.wechatNumber = vals.wechatNumber;
    }
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad SelfInformationPage');
  }
}