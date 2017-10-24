import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginProvider {
  ip = "http://192.168.0.103:8080/";

  data: any;
  constructor(public http: Http) {

  }

  load(registerCredentials: any) {
    // don't have the data yet
    return new Promise(resolve => {
      var locale = navigator.language;
        //http://192.168.0.103:8080/login?idStudent=Android&password=aaa&locale=en-US
      var url = this.ip + "login?idStudent=" + registerCredentials.idStudent + "&password="
          + registerCredentials.password + "&locale=" + locale;

      this.http.get(url)
        .map(res => res.json())
        .subscribe(data => {
          console.log("data: " + data);
          let response =  {
                            "status": data.status,
                            "message": data.message
                          }
          resolve(response);
        },
        error => {

        });
      });
    }
}
