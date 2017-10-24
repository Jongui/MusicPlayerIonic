import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { CoursModel } from '../../models/courses-model';
import { StudentCoursesProvider } from '../../providers/student-courses/student-courses';

@IonicPage()
@Component({
  selector: 'page-courses',
  templateUrl: 'courses.html',
})
export class CoursesPage {
  idStudent: string;
  courses: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, translate: TranslateService,
  private provider: StudentCoursesProvider) {
    this.idStudent = navParams.get("idStudent");
    /*this.courses = [  new CoursModel(1, 'Music Harmony','2017-08-01', '2017-11-30', 60),
                      new CoursModel(2, 'Music Ritm','2017-08-01', '2017-11-30', 60),
                      new CoursModel(3, 'Music Theory','2017-08-11', '2017-11-30', 60),
                      new CoursModel(4, 'Music Listening','2017-08-01', '2017-11-30', 60)
    ];*/
    this.courses = [];
    this.loadCourses();
    translate.setDefaultLang('en');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CoursesPage');
  }

  private loadCourses(){
    this.provider.loadStudentCourses(this.idStudent)
      .then(data=>{
          let coursesJson = data["Courses"];
          for(var i = 0; i < coursesJson.length; i++){
            let jsonLine = coursesJson[i];
            console.log(jsonLine);
            let cours = new CoursModel( jsonLine["idCourses"],
                                        jsonLine["coursName"],
                                        jsonLine["initDate"],
                                        jsonLine["endDate"],
                                        jsonLine["hours"]);
            this.courses.push(cours);
          }

      });
  }

  coursSelected(cours: CoursModel){
    this.navCtrl.push('ClassesPage',
    {
      "idCours": cours.idCours,
      "coursName": cours.coursName,
      "idStudent": this.idStudent
    });
  }

}
