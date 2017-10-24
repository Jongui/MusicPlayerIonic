import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the PlayerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlayerProvider {
  ip = "http://192.168.0.103:8080/";

  constructor(public http: Http) {

  }

  playExercise(fileName: string){
    //http://192.168.0.103:8080/playTask?fileName=task111
    return new Promise(resolve => {
      let url = this.ip + "playTask?fileName=" + fileName;

      this.http.get(url)
        .map(res => res.json())
        .subscribe(data => {
          console.log("data: " + data);
          let response =  data
          resolve(response);
        },
        error => {

        });
    });
  }

  playNote(note: number, inst: number, channel: number, dynamic: number, action: number){
    //http://192.168.0.103:8080/play?time=1.0&note=60&inst=20&channel=0&dynamic=120&action=0
    return new Promise(resolve => {
      let url = this.ip + "play?time=1&note=" + note + "&inst=" + inst + "&channel=" + channel + "&dynamic="
        + dynamic + "&action=" + action;

      this.http.get(url)
        .map(res => res.json())
        .subscribe(data => {
          console.log("data: " + data);
          let response =  data
          resolve(response);
        },
        error => {

        });
    });
  }
  playScript(time: number, note: number, instrument: number, dynamic: number){
    //http://192.168.0.103:8080/playScript?time=1.0&note=60&inst=20&channel=0&dynamic=120
    return new Promise(resolve => {
      let url = this.ip + "playScript?time=" + time + "&note=" + note + "&inst=" + instrument
        + "&channel=" + 0 + "&dynamic=" + dynamic;
      this.http.get(url)
        .map(res => res.json())
        .subscribe(data => {
          console.log("data: " + data);
          let response =  data
          resolve(response);
        },
        error => {
          console.log(error);
        });
    });
  }

}
