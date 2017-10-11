import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { NewAccountPage } from './new-account';

@NgModule({
  declarations: [
    NewAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(NewAccountPage),
    TranslateModule.forChild()
  ],
})
export class NewAccountPageModule {}
