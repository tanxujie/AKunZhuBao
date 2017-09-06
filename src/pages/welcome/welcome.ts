import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Settings } from '../../providers/settings';
import { LoginPage } from '../login/login';
/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(private navCtrl: NavController, private settings: Settings) { 
    if (!this.checkLoginToken()) {// TODO
      this.navCtrl.push(TabsPage);
    } else {
      this.navCtrl.push(LoginPage);
    }
  }

  checkLoginToken() {
    let userInfo: any = this.settings.getValue("USER_INFO");
    if (!userInfo || !userInfo.token) {
      this.settings.clear();
      return false;
    } else {
      return true;
    }
  }
}
