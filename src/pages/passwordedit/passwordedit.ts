import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../providers/user';
import { Settings } from '../../providers/settings';
/**
 * Generated class for the PasswordeditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-passwordedit',
  templateUrl: 'passwordedit.html',
})
export class PasswordeditPage {

  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public userProvider: User,
              public settings: Settings,
              public alertController: AlertController) {
  }

  ionViewDidLoad() {
  }

  modifyPassword() {
    if (!this.oldPassword) {
      this._showMessage('请输入旧密码');
      return;
    }
    if (!this.newPassword) {
      this._showMessage('请输入新密码');
      return;
    }
    if (!this.newPasswordConfirm) {
      this._showMessage('请输入新密码确认');
      return;
    }
    if (this.newPassword !== this.newPasswordConfirm) {
      this._showMessage('新密码与确认新密码不一样，请重新输入。');
      return;
    }
    let accountInfo = this.settings.getValue('LOGIN_ACCOUNT');
    this.userProvider.modifyPassword(accountInfo.id, this.oldPassword, this.newPassword).subscribe(resp => {
      if (resp) {
        if (resp.success) {
          //let accountInfo = this.settings.getValue('LOGIN_ACCOUNT');
          if (accountInfo) {
            accountInfo['password'] = this.newPassword;
            this.settings.setValue('LOGIN_ACCOUNT', accountInfo);
          }
        }
        this._showMessage(resp.data);
      }
    }, err=> console.log(err));
  }

  /*
  * 显示消息
  */
  private _showMessage(msg: string) {
    let alert = this.alertController.create({
        title: "提示",
        subTitle: msg,
        buttons: ['OK']
    });
    alert.present();
  }
}