import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the NewAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-account',
  templateUrl: 'new-account.html',
})
export class NewAccountPage {
  registerCredentials = { email: '', password: '', confirmPassword: '' };
  constructor(public navCtrl: NavController, public navParams: NavParams, translate: TranslateService) {
  translate.setDefaultLang('en');
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewAccountPage');
  }
  cancel(){
    this.navCtrl.pop();
  }
}
