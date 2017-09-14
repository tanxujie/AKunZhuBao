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
  //account: { phoneNumber: string, password: string };
  phoneNumber: string;
  password: string;
  rememberPassword:boolean;
  autoLogin: boolean;

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
    this.settings.getValue("LOGIN_SETTING").then(res => {
      if (res && !!res.rememberPassword) {
        this.phoneNumber = res.phoneNumber;
        this.password = res.password;
        this.rememberPassword = true;
      }
    }, err=>{console.log(err);});
  }

  // Attempt to login in through our User service
  doLogin() {
    this.api.get('app/login', {phoneNumber: this.phoneNumber, password: this.password})
      .map(resp => resp.json())
      .subscribe(res => {
        if (res.success) {
          let loginSettings = {
            phoneNumber: this.phoneNumber
          };
          if (this.rememberPassword) {
            loginSettings['password'] = this.password;
            loginSettings['rememberPassword'] = true;
          }
          if (this.autoLogin) {
            loginSettings['autoLogin'] = true;
          }
          let values = {
            "LOGIN_ACCOUNT": res.data,
            "AUTH_TOKEN": res.data.authToken,
            "LOGIN_SETTING": loginSettings
          };
          this.settings.setAll(values);
          this.navCtrl.push(MainPage);
          /*
          this.settings.load().then(()=>{
            if (!!this.rememberPassword) {
              let rememberInfo = {
                rememberPassword: true,
                phoneNumber: this.phoneNumber,
                password: this.password
              };
              this.settings.setValue("ACCOUNT_REMEMBER_INFO", rememberInfo);
            } else {
              this.settings.clear();
            }
            this.settings.setValue("ACCOUNT_AUTH_TOKEN", res.data);
            this.navCtrl.push(MainPage);
          }, err=>console.log(err));
          */
        } else {
          this.settings.clear();
          this._showLoginFailure();
        }
      }, err => {
        this.settings.clear();
        this._showLoginFailure();
      });
  }

  private _showLoginFailure() {
    let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'middle'
      });
    toast.present();
  }
}