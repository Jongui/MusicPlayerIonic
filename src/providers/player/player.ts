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
      var url = this.ip + "playTask?fileName=" + fileName;

      this.http.get(url)
        .map(res => res.json())
        .subscribe(data => {
          let response =  data
          resolve(response);
        },
        error => {

        });
    });
  }

}
