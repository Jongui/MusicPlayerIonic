import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { TaskModel } from '../../models/tasks-model';
import { ClassesTasksProvider } from '../../providers/classes-tasks/classes-tasks';

@IonicPage()
@Component({
  selector: 'page-task',
  templateUrl: 'task.html',
})
export class TaskPage {
  idCours: number;
  idClass: number;
  idStudent: string;
  classTitle: string;
  tasks: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, translate: TranslateService,
    public provider: ClassesTasksProvider) {
    this.idCours = navParams.get("idCours");
    this.classTitle = navParams.get("classTitle");
    this.idClass = navParams.get("idClass");
    this.idStudent = navParams.get("idStudent");
    translate.setDefaultLang('en');

    this.tasks = [];
    this.loadClassesTasks();
    /*this.tasks = [
      new TaskModel(this.idCours, this.idClass, 1, "Exer1", "Terça menor"),
      new TaskModel(this.idCours, this.idClass, 2, "Exer2", "Terça maior"),
      new TaskModel(this.idCours, this.idClass, 3, "Exer3", "Acorde maior"),
    ];*/

  }

  loadClassesTasks(){
    this.provider.loadClassesTasks(this.idCours, this.idClass)
    .then(data=>{
      let tasksJson = data["Tasks"];
      for(var i = 0; i < tasksJson.length; i++){
        let jsonLine = tasksJson[i];
        let task = new TaskModel( jsonLine["idCourses"],
                                  jsonLine["idClasses"],
                                  jsonLine["idTasks"],
                                  jsonLine["name"],
                                  jsonLine["description"]);
        this.tasks.push(task);
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskPage');
  }

  callKeyboard(task: TaskModel){
    console.log("idCours: " + this.idCours +
                "idClass: " + this.idClass +
                "\nidTask: " + task.idTask );
    this.navCtrl.push('KeyboardPage',
      {
        "idCours": this.idCours,
        "idClass": this.idClass,
        "idTask": task.idTask,
        "idStudent": this.idStudent
      });
  }

}
