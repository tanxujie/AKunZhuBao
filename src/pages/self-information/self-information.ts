import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Settings } from '../../providers/settings';
import { PasswordeditPage } from '../passwordedit/passwordedit';

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
  name: string;
  phoneNumber:string;
  aliasName: string;
  wechatNumber: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private settings: Settings) {
    let accountInfo = settings.getValue("LOGIN_ACCOUNT");
    if (accountInfo) {
      this.name = accountInfo.name;
      this.phoneNumber = accountInfo.phoneNumber;
      this.aliasName = accountInfo.wechatNumber;
      this.wechatNumber = accountInfo.wechatNumber;
    }
  }

  ionViewDidLoad() {
  }

  openPasswordEdit() {
    this.navCtrl.push(PasswordeditPage);
  }
}