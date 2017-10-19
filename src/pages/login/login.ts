import { Component } from '@angular/core';
import { AlertController, IonicPage, Loading, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { LoginProvider } from '../../providers/login/login';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { idStudent: '', password: '' };
  response: any;

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, translate: TranslateService,
  private loginProvider: LoginProvider) {
    translate.setDefaultLang('en');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    this.loginProvider.load(this.registerCredentials)
      .then(data=>{
        this.response = data;
        console.log("Login status: " + this.response.status);
        if(this.response.status == 0){
          this.navCtrl.setRoot('CoursesPage',
            {
              "idStudent": this.registerCredentials.idStudent
            });
        } else {
          const alert = this.alertCtrl.create({
            title: 'Login',
            subTitle: this.response.message,
            buttons: ['Dismiss']
          });
          alert.present();
        }
      });
  }

  createAccount(){
    this.navCtrl.push('NewAccountPage');
  }

}
