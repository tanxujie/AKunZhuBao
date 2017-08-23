import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MySettingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-setting',
  templateUrl: 'my-setting.html',
})
export class MySettingPage {

  accountNo: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
}
