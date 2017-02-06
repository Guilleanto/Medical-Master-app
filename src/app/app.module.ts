import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { HomePage } from '../pages/admin/admin';
import { TratamentPagePage } from '../pages/tratament-page/tratament-page';
import { LoginPage } from '../pages/login/login';
import { Storage } from '@ionic/storage';
import { MyService } from '../providers/my-service';
import { LOCALE_ID } from '@angular/core';

import { ModalUpdatePage } from '../pages/modal-update/modal-update';
//import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { StorageService } from '../providers/storage';
import { TodoItem } from '../providers/todo-item';
import { ActionsPage } from '../pages/actions/actions';
import { Modal } from '../pages/modal/modal';
import { PopoverPage } from '../pages/popover/popover';
import { PopoverPage2 } from '../pages/popover2/popover2';
//import { DiagpagePage } from '../pages/diagpage/diagpage';
import { LocalNoti } from '../pages/localnotificacion/localnotificacion';
import { ModalalertPage } from '../pages/modalalert/modalalert';
import { ModalDetailPage } from '../pages/modal-detail/modal-detail';
import { ProfilePage } from '../pages/profile/profile';

//import {Md5} from 'ts-md5/dist/md5';
//import { GenpasspagePage } from '../pages/genpasspage/genpasspage';

/*const cloudSettings: CloudSettings = {
  'core': {
    'app_id': ''
  },
  'push': {
    'sender_id': 'SENDER_ID',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#343434'
      }
    }
  }

};*/


@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    LoginPage,
    TratamentPagePage,
    HomePage,
   
    ModalUpdatePage, ModalDetailPage,
    ActionsPage,
    Modal,
    PopoverPage, PopoverPage2,
    
    LocalNoti, ModalalertPage, ProfilePage, TutorialPage
   
  
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    LoginPage,
    TratamentPagePage,
    HomePage,
    ModalUpdatePage,ModalDetailPage,
    ActionsPage,
     Modal,
    PopoverPage,PopoverPage2,
    
    LocalNoti, ModalalertPage, ProfilePage, TutorialPage
   
    
  ],
  providers: [
    
    MyService,
    Storage,
    StorageService,
    TodoItem,
    { provide: LOCALE_ID, useValue: "es-ES" }, //replace "en-US" with your locale
    //otherProviders...
    {provide: ErrorHandler, useClass: IonicErrorHandler}
   

  ]
})
export class AppModule {}
