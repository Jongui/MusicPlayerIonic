import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { KeyboardPage } from './keyboard';

@NgModule({
  declarations: [
    KeyboardPage,
  ],
  imports: [
    IonicPageModule.forChild(KeyboardPage),
    TranslateModule.forChild()
  ],
})
export class KeyboardPageModule {}
