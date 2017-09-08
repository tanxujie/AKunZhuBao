import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { SelfInformationPage } from '../self-information/self-information';
import { AgentPage } from '../agent/agent';
import { KunFriendsPage } from '../kun-friends/kun-friends';
import { CompanyInfoPage } from '../company-info/company-info';
import { AboutPage } from '../about/about';
import { SelfSettingsPage } from '../self-settings/self-settings';
import { LoginPage } from '../login/login';

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
    this.navCtrl.push(SelfInformationPage);
  }

  openAgents() {
    this.navCtrl.push(AgentPage);
  }

  openKunFriends() {
    this.navCtrl.push(KunFriendsPage);
  }
  openCompanyInfo() {
    this.navCtrl.push(CompanyInfoPage);
  }

  callHotLine() {
    this.callNumber.callNumber("15053340877", true)
      .then(() => console.log('succeed call.'))
      .catch((err) => console.log('failed call:' + err));
  }

  openAbout() {
    this.navCtrl.push(AboutPage);
  }

  openSelfSettings() {
    this.navCtrl.push(SelfSettingsPage);
  }

  logout() {
    this.navCtrl.push(LoginPage);
  }
}
