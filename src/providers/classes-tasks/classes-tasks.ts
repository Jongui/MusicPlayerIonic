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

  loadStudentAnswer(idCours: number, idClass: number, idTask: number,
              idStudent: string){
    return new Promise(resolve => {
      //http://192.168.0.103:8080/loadStudentAnswer?idStudent=Android&idCours=1&idClasses=1&idTask=1
      let url = this.ip + "loadStudentAnswer?idStudent=" + idStudent
        + "&idCours=" + idCours
        + "&idClasses=" + idClass
        + "&idTask=" + idTask;
        this.http.get(url)
          .map(res => res.json())
          .subscribe(data => {
            let response =  data;
            console.log(response.message);
            resolve(response);
          },
          error => {

          });
    });
  }

  sendAnwser(idCours: number, idClass: number, idTask: number,
              idStudent: string, answer: string, locale: string){
    return new Promise(resolve => {
      //http://192.168.0.103:8080/sendAnswer?idCours=1&idClasses=1&idTask=1&idStudent=1&answer=json&locale=en-US
      let url = this.ip + "sendAnswer?idCours=" + idCours
        + "&idClasses=" + idClass + "&idTask=" + idTask
        + "&idStudent=" + idStudent + "&answer=" + answer
        + "&locale=" + locale;

      this.http.get(url)
        .map(res => res.json())
        .subscribe(data => {
          let response =  data;
          console.log(response.message);
          resolve(response);
        },
        error => {

        });
    });
  }

}
