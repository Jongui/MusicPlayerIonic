import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CoursesClassesProvider {
  ip = "http://192.168.0.103:8080/";

  constructor(public http: Http) {
  }

  loadCoursesClasses(idCours: number){
    return new Promise(resolve => {
      //http://192.168.0.103:8080/coursClasses?idCours=1
      let url = this.ip + "coursClasses?idCours=" + idCours;

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
