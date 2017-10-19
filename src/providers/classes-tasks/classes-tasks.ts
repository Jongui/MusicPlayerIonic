import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ClassesTasksProvider {
  ip = "http://192.168.0.103:8080/";

  constructor(public http: Http) {

  }

  loadClassesTasks(idCours: number, idClass: number){
    return new Promise(resolve => {
      //http://192.168.0.103:8080/classesTasks?idClasses=1&idCours=1
      let url = this.ip + "classesTasks?idClasses=" + idClass
        + "&idCours=" + idCours;

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

  loadTaskInfo(idCours: number, idClass: number, idTask: number){
    console.log("loadTaskInfo");
    return new Promise(resolve => {
      //http://192.168.0.103:8080/loadTaskInfo?idCours=1&idClasses=1&idTask=1
      let url = this.ip + "loadTaskInfo?idCours=" + idCours
        + "&idClasses=" + idClass + "&idTask=" + idTask;

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
