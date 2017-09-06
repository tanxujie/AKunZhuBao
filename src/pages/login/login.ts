import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { MainPage } from '../../pages/pages';
import { Api } from '../../providers/api';
import { Settings } from '../../providers/settings';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { phoneNumber: string, password: string };

  // Our translated text strings
  private loginErrorString: string;

  constructor(private navCtrl: NavController,
    private toastCtrl: ToastController,
    private translateService: TranslateService,
    private api: Api,
    private settings: Settings) {
    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    });
    this.settings.getValue("REMEMBER_ACCOUNT").then(res => {
      if (res && !!res.rememberMe) {
        this.account = res.account;
      }
    }, err=>{});
  }

  // Attempt to login in through our User service
  doLogin() {
    this.api.post('app/login', {})
      .map(resp => resp.json())
      .subscribe(res=>{
        if (res.success) {
          this.settings.setValue("USER_INFO", res.user);
          this.navCtrl.push(MainPage);
        } else {
          this.settings.clear();
          this._showLoginFailure();
        }
      }, err=>{
        this.settings.clear();
        this._showLoginFailure();
      });

    /*
    this.user.login(this.account).subscribe((resp) => {
      this.navCtrl.push(MainPage);
    }, (err) => {
      //this.navCtrl.push(MainPage);
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });*/
  }

  private _showLoginFailure() {
    let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
    toast.present();
  }
}
