import { Component } from '@angular/core';
import { AlertController, IonicPage, Loading, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
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
  private loginProvider: LoginProvider, private storage: Storage) {
    translate.setDefaultLang('en');
    this.storage.get('idStudent').then((val) => {
      this.registerCredentials.idStudent = val;
      this.storage.get('password').then((val) =>{
        this.registerCredentials.password = val;
        this.login();
      });
  });
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
          this.storage.set("idStudent", this.registerCredentials.idStudent);
          this.storage.set("password", this.registerCredentials.password);
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
