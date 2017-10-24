import { Component } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { AlertController, IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
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
  idStudent: string;
  instrument: number;
  instruments: any;
  btnRecordText: string;

  taskAnswer: any;
  notesAnswer: {};
  recording = false;
  startTime: any;

  dynamic: number;
  dynamics = [
    {
      "value": 22,
      "desc": "pianissisimo"
    },
    {
      "value": 37,
      "desc": "pianissimo"
    },
    {
      "value": 52,
      "desc": "piano"
    },
    {
      "value": 67,
      "desc": "mezzo piano"
    },
    {
      "value": 82,
      "desc": "mezzo forte"
    },
    {
      "value": 97,
      "desc": "forte"
    },
    {
      "value": 112,
      "desc": "fortissimo"
    },
    {
      "value": 127,
      "desc": "fortississimo"
    }
  ];

  buttons = [
    {
      "note": 60,
      "desc": "C3"
    },
    {
      "note": 62,
      "desc": "D3"
    },
    {
      "note": 64,
      "desc": "E3"
    },
    {
      "note": 65,
      "desc": "F3"
    },
    {
      "note": 67,
      "desc": "G3"
    },
    {
      "note": 69,
      "desc": "A3"
    },
    {
      "note": 71,
      "desc": "B3"
    },
    {
      "note": 72,
      "desc": "C4"
    },
    {
      "note": 74,
      "desc": "D4"
    },
    {
      "note": 76,
      "desc": "E4"
    },
    {
      "note": 77,
      "desc": "F4"
    },
    {
      "note": 79,
      "desc": "G4"
    }
  ];

  lines: any;
  indexNotes: number;
  notes = [];
  translate: TranslateService;

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private screenOrientation: ScreenOrientation,
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
    this.idStudent = navParams.get("idStudent");
    this.btnRecordText = translate.instant("btnRecordAnswer");
    this.translate = translate;
    this.instruments = [];
    this.lines = [];
    this.dynamic = this.dynamics[0].value;
    this.taskAnswer = {};
    this.taskAnswer.notes = [];
    this.loadTaskInfo();
  }

  loadTaskInfo(){
    this.taskProvider.loadTaskInfo(this.idCours, this.idClass, this.idTask)
      .then(data=>{
        let linesJson = data["lines"];
        for(var i = 0; i < linesJson.length; i++){
          let jsonLine = linesJson[i];
          this.instruments.push(jsonLine["inst"]);
          this.lines.push(jsonLine);
        }
        if(this.instruments.length > 0){
          this.instrument = this.instruments[0].code;
        }
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KeyboardPage');
  }

  playExercise(){
    this.playerProvider.playExercise("task" + this.idCours + this.idClass + this.idTask);
  }

  startNote(note: number){
    console.log(this.instrument);
    this.playerProvider.playNote(note, this.instrument, 0, this.dynamic, 0);
    if(this.recording){
        this.notesAnswer = {};
        this.notesAnswer["note"] = note;
    }
    this.startTime = new Date().getTime() / 1000;
  }

  stopNote(note: number){
    console.log(this.instrument);
    this.playerProvider.playNote(note, this.instrument, 0, this.dynamic, 1);
    let endTime = new Date().getTime() / 1000;
    let deltaTime = endTime - this.startTime;
    if(this.recording){
        this.notesAnswer["time"] = parseFloat(deltaTime.toFixed(2));
        this.taskAnswer.notes.push(this.notesAnswer);
    }
  }

  playInst(){
    this.indexNotes = 0;
    for(var i = 0; i < this.lines.length; i++){
        let line = this.lines[i];
        let inst = line.inst;
        if(inst.code == this.instrument){
            this.notes = line.notes;
            break;
        }
    }
    this.playNote(this.indexNotes, this.notes);
  }

  playNote(index: number, playNotes: any[]){
    if(index >= playNotes.length){
      console.log("index: " + index);
      this.indexNotes = 0;
      return;
    }
    this.playerProvider.playScript(playNotes[index].time, playNotes[index].note,
      this.instrument, this.dynamic)
      .then(data=>{
        index++;
        this.playNote(index, playNotes);
      });
  }

  recordAnwser(){
    if(this.recording){
        this.recording = false;
        console.log(this.taskAnswer);
        this.btnRecordText = this.translate.instant("btnRecordAnswer");
        //btnRecord.innerHTML = textsUI.recordAnswer;
    } else {
        this.taskAnswer = {};
        this.taskAnswer.notes = [];
        this.recording = true;
        this.btnRecordText = this.translate.instant("stopRecording");;
        //btnRecord.innerHTML = textsUI.stopRecording;
    }
  }

  playAnswer(){
    this.indexNotes = 0;
    this.playNote(this.indexNotes, this.taskAnswer.notes);
  }

  sendAnwser(){
    let answer = JSON.stringify(this.taskAnswer);
    this.taskProvider.sendAnwser(this.idCours, this.idClass, this.idTask,
                this.idStudent, answer, navigator.language)
                .then(data=>{
                  let response: any;
                  response = data;
                  let title = this.translate.instant("sendAnswer");
                  let dismiss = this.translate.instant("dismiss");
                  const alert = this.alertCtrl.create({
                                title: title,
                                subTitle: response.message,
                                buttons: [dismiss]
                  });
                  alert.present();
                });
  }
}
