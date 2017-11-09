import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { ClassModel } from '../../models/classes-model';
import { CoursesClassesProvider } from '../../providers/courses-classes/courses-classes';

@IonicPage()
@Component({
  selector: 'page-classes',
  templateUrl: 'classes.html',
})
export class ClassesPage {

  idStudent: string;
  public idCours: number;
  public coursName: string;
  classes: any;
  channel: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, translate: TranslateService,
    private provider: CoursesClassesProvider) {
    this.idCours = navParams.get("idCours");
    this.coursName = navParams.get("coursName");
    this.idStudent = navParams.get("idStudent");
    this.channel = navParams.get("channel");
    this.classes = [];
    this.loadCoursesClasses();
    translate.setDefaultLang('en');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassesPage');
  }

  loadCoursesClasses(){
    this.provider.loadCoursesClasses(this.idCours)
    .then(data=>{
        let classesJson = data["Classes"];
        for(var i = 0; i < classesJson.length; i++){
          let jsonLine = classesJson[i];
          let classModel = new ClassModel( jsonLine["idCourses"],
                                      jsonLine["idClasses"],
                                      jsonLine["description"],
                                      jsonLine["date"]);
          this.classes.push(classModel);
        }
    });
  }

  classSelected(classModel: ClassModel){
    this.navCtrl.push('TaskPage',
                      {
                        "idCours": this.idCours,
                        "idClass": classModel.idClass,
                        "classTitle": classModel.classTitle,
                        "idStudent": this.idStudent,
                        "channel": this.channel
                      });
  }

}
