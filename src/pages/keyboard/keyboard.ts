import { Component } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { ClassesTasksProvider } from '../../providers/classes-tasks/classes-tasks';
import { PlayerProvider } from '../../providers/player/player';

@IonicPage()
@Component({
  selector: 'page-keyboard',
  templateUrl: 'keyboard.html',
})
export class KeyboardPage {

  idCours: number;
  idClass: number;
  idTask: number;
  instrument: any;
  instruments: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private screenOrientation: ScreenOrientation,
      private platform: Platform, translate: TranslateService, public taskProvider: ClassesTasksProvider,
      private playerProvider: PlayerProvider) {
    console.log("KeyboardConstructor");
    if (this.platform.is('cordova')) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    }
    translate.setDefaultLang('en');
    this.idCours = navParams.get("idCours");
    this.idClass = navParams.get("idClass");
    this.idTask = navParams.get("idTask");
    this.instruments = [];
    this.loadTaskInfo();
  }

  loadTaskInfo(){
    this.taskProvider.loadTaskInfo(this.idCours, this.idClass, this.idTask)
      .then(data=>{
        let linesJson = data["lines"];
        for(var i = 0; i < linesJson.length; i++){
          let jsonLine = linesJson[i];
          this.instruments.push(jsonLine["inst"]);
          if(i==0){
            this.instrument = jsonLine;
          }
        }
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KeyboardPage');
  }

  playExercise(){
    this.playerProvider.playExercise("task" + this.idCours + this.idClass + this.idTask);
  }

}
