import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the StudentCoursesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StudentCoursesProvider {
  ip = "http://192.168.0.103:8080/";

  constructor(public http: Http) {

  }

  loadStudentCourses(idStudent: string){
    return new Promise(resolve => {
      //http://192.168.0.103:8080/studentCourses?idStudent=Android
      var url = this.ip + "studentCourses?idStudent=" + idStudent;

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
