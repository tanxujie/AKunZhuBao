import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';

/**
 * Generated class for the MySettingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-my-setting',
  templateUrl: 'my-setting.html',
})
export class MySettingPage {

  accountNo: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public callNumber: CallNumber) {
    this.accountNo = '12345678';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MySettingPage');
  }

  openMyself() {
    alert('This is me.');
  }

  openAgents() {

  }

  openKunFriends() {
  }

  callHotLine() {
    this.callNumber.callNumber("13335193164", true)
      .then(() => console.log('succeed call.'))
      .catch((err) => console.log('failed call:' + err));
  }
}
