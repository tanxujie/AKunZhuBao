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
import { AgentProvider } from '../../providers/agent/agent';

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

  lowerAgentCount: number = 0;
  accountNo: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public callNumber: CallNumber,
    public agentProvider: AgentProvider) {
  }

  ionViewWillEnter() {
    // get lower-agent count
    let params = {
      supperAgentId: 1
    };
    this.agentProvider.count(params).subscribe((resp)=>{
      if (resp&& resp.success) {
        this.lowerAgentCount = resp.data;
      }
    }, err=> console.log(err));
  }

  ionViewDidLoad() {
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
    //this.navCtrl.push(LoginPage);
    this.navCtrl.first();
  }
}