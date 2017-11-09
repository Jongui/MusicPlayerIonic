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
  interactionDisable = false;
  showKeyboardDiv = false;
  showInteractivDiv = true;
  keyboardDisable = false;
  iconName = "arrow-down";
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
      "desc": "C3",
      "color": "secondary"
    },
    {
      "note": 62,
      "desc": "D3",
      "color": "secondary"
    },
    {
      "note": 64,
      "desc": "E3",
      "color": "secondary"
    },
    {
      "note": 65,
      "desc": "F3",
      "color": "secondary"
    },
    {
      "note": 67,
      "desc": "G3",
      "color": "secondary"
    },
    {
      "note": 69,
      "desc": "A3",
      "color": "secondary"
    },
    {
      "note": 71,
      "desc": "B3",
      "color": "secondary"
    },
    {
      "note": 72,
      "desc": "C4",
      "color": "secondary"
    },
    {
      "note": 74,
      "desc": "D4",
      "color": "secondary"
    },
    {
      "note": 76,
      "desc": "E4",
      "color": "secondary"
    },
    {
      "note": 77,
      "desc": "F4",
      "color": "secondary"
    },
    {
      "note": 79,
      "desc": "G4",
      "color": "secondary"
    }
  ];

  lines: any;
  indexNotes: number;
  notes = [];
  translate: TranslateService;
  channel: number;

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private screenOrientation: ScreenOrientation,
      private platform: Platform, translate: TranslateService, public taskProvider: ClassesTasksProvider,
      private playerProvider: PlayerProvider) {
    if (this.platform.is('cordova')) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    }
    translate.setDefaultLang('en');
    this.idCours = navParams.get("idCours");
    this.idClass = navParams.get("idClass");
    this.idTask = navParams.get("idTask");
    this.idStudent = navParams.get("idStudent");
    this.channel = navParams.get("channel");
    this.btnRecordText = translate.instant("btnRecordAnswer");
    this.translate = translate;
    this.instruments = [];
    this.lines = [];
    this.dynamic = this.dynamics[0].value;
    this.taskAnswer = {};
    this.taskAnswer.notes = [];
    this.loadTaskInfo();
    this.loadStudentAnswer();
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

  loadStudentAnswer(){
    this.taskProvider.loadStudentAnswer(this.idCours, this.idClass, this.idTask, this.idStudent)
      .then(data=>{
        console.log(data);
        this.taskAnswer = data;
      })
  }

  ionViewDidLoad() {

  }

  playExercise(){
    this.toogleButtons();
    this.playerProvider.playExercise("task" + this.idCours + this.idClass + this.idTask)
      .then(data=>{
        this.toogleButtons();
      });
  }

  startNote(button: any){
    button.color = "primary";
    this.playerProvider.playNote(button.note, this.instrument, this.channel, this.dynamic, 0);
    if(this.recording){
      this.stopPause();
        this.notesAnswer = {};
        this.notesAnswer["note"] = button.note;
    }
    this.startTime = new Date().getTime() / 1000;
  }

  stopNote(button: any){
    button.color = "secondary";
    this.playerProvider.playNote(button.note, this.instrument, this.channel, this.dynamic, 1);
    let endTime = new Date().getTime() / 1000;
    let deltaTime = endTime - this.startTime;
    if(this.recording){
        this.notesAnswer["time"] = parseFloat(deltaTime.toFixed(2));
        this.taskAnswer.notes.push(this.notesAnswer);
        this.startPause();
    }
  }

  private startPause(){
    this.notesAnswer = {};
    this.notesAnswer["note"] = 0;
    this.startTime = new Date().getTime() / 1000;
  }

  private stopPause(){
    if(this.startTime == 0) return;
    let endTime = new Date().getTime() / 1000;
    let deltaTime = endTime - this.startTime;
    this.notesAnswer["time"] = parseFloat(deltaTime.toFixed(2));
    this.taskAnswer.notes.push(this.notesAnswer);
  }

  playInst(){
    this.toogleButtons();
    this.toogleDiv();
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
      this.toogleButtons();
      this.indexNotes = 0;
      return;
    }

    let button = this.findButton(playNotes[index].note);
    if(button != null) {
      button.color = "primary";
      this.playerProvider.playScript(playNotes[index].time, playNotes[index].note,
        this.instrument, this.dynamic)
        .then(data=>{
          index++;
          button.color = "secondary";
          this.playNote(index, playNotes);
        });
      } else {
        setTimeout(() => {
          index++;
          this.playNote(index, playNotes);
        },
        playNotes[index].time * 1000
      );
      }
  }

  private findButton(note: number){
    for(let i = 0; i < this.buttons.length; i++){
      let but = this.buttons[i];
      if(but.note == note){
        return but;
      }
    }
  }

  recordAnwser(){
    if(this.recording){
        this.startTime = 0;
        this.recording = false;
        this.btnRecordText = this.translate.instant("btnRecordAnswer");
        //btnRecord.innerHTML = textsUI.recordAnswer;
    } else {
        this.startTime = 0;
        this.taskAnswer = {};
        this.taskAnswer.notes = [];
        this.taskAnswer.inst = [];
        let instAnswer = {};
        instAnswer["code"] = this.instrument;
        this.taskAnswer.inst.push(instAnswer);
        this.recording = true;
        this.btnRecordText = this.translate.instant("stopRecording");;
        //btnRecord.innerHTML = textsUI.stopRecording;
    }
  }

  playAnswer(){
    this.indexNotes = 0;
    this.toogleButtons();
    console.log("this.taskAnswer: " + this.taskAnswer);
    this.playNote(this.indexNotes, this.taskAnswer.notes);
  }

  sendAnwser(){
    this.toogleButtons();
    let answer = JSON.stringify(this.taskAnswer);
    this.taskProvider.sendAnwser(this.idCours, this.idClass, this.idTask,
                this.idStudent, answer, navigator.language)
                .then(data=>{
                  let response: any;
                  this.toogleButtons();
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

  toogleButtons(){
    if(this.interactionDisable){
      this.interactionDisable = false;
    } else {
        this.interactionDisable = true;
    }
  }

  toogleDiv(){
    console.log("this.showKeyboardDiv: ", this.showKeyboardDiv);
    if(this.showKeyboardDiv){
      this.iconName = "arrow-down";
      this.showKeyboardDiv = false;
      this.showInteractivDiv = true;
      this.keyboardDisable = false;
    } else {
      this.iconName = "arrow-up";
      this.showKeyboardDiv = true;
      this.showInteractivDiv = false;
      this.keyboardDisable = true;
    }
  }

}
