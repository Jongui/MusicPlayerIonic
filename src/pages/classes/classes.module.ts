import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ClassesPage } from './classes';

@NgModule({
  declarations: [
    ClassesPage,
  ],
  imports: [
    IonicPageModule.forChild(ClassesPage),
    TranslateModule.forChild()
  ],
})
export class ClassesPageModule {}
