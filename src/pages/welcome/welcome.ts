import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Settings } from '../../providers/settings';
import { LoginPage } from '../login/login';
import { Api } from '../../providers/api';

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

  constructor(private navCtrl: NavController, private settings: Settings, private api: Api) {
    //this.navCtrl.push(TabsPage);
    this.settings.load().then(()=>{ 
      let res = this.settings.getValue("LOGIN_SETTING");
        // 仅在自动登录设置时，执行自动登录
        if (res && !!res.autoLogin) {
          this.checkLoginToken();
        } else {
          this.navCtrl.push(LoginPage);
        }
     // });
    });
  }

  checkLoginToken() {
    let authToken = this.settings.getValue("AUTH_TOKEN");
      //.then((res) => {
    if (authToken) {
      this.api.get('/app/checkAuthToken', {authToken: authToken}).map(r=>r.json()).subscribe((res)=>{
        if (res && res.success) {
          this.navCtrl.push(TabsPage);
        } else {
          this.settings.clear();
          this.navCtrl.push(LoginPage);
        }
      }, err=>{
        this.settings.clear();
        this.navCtrl.push(LoginPage);
      });
    } else {
        this.settings.clear();
        this.navCtrl.push(LoginPage);
    }
    /*}, err=>{ 
        this.settings.clear();
        this.navCtrl.push(LoginPage);
    });*/
  }
}
