import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController,LoadingController, AlertController } from 'ionic-angular';
import { StatusBar, Splashscreen, LocalNotifications } from 'ionic-native';
import { Storage } from '@ionic/storage';
import { BackgroundMode } from 'ionic-native';
import { TratamentPagePage } from '../pages/tratament-page/tratament-page';
//import { DiagpagePage } from '../pages/diagpage/diagpage';
import { HomePage } from '../pages/admin/admin';
import { ProfilePage } from '../pages/profile/profile';
import { LoginPage } from '../pages/login/login'; 
import { StorageService } from '../providers/storage';
import { InAppBrowser } from 'ionic-native';
import { TutorialPage } from '../pages/tutorial/tutorial';



@Component({
  templateUrl: 'app.html',
  
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  token: any;
  pages: Array<{title: string, component: any, icon: string}>;
  store: any;
  public perfile = [];
  public n:any= 0;

  constructor(public platform: Platform, public storage: Storage, public menu: MenuController,
   public loadingCtrl: LoadingController, public alertCtrl: AlertController, public storageService: StorageService,
   ) {
    
    this.initializeApp();
     
     document.addEventListener('pause', ()=>{
      console.log("app pausada");
      this.store = this.storage.get('Alertas');
      this.store.then((value:any)=>{
          this.store = value;
          if (this.store != null){
            BackgroundMode.setDefaults({
              title: 'Alertas activadas',
              silent: true,
            })
             BackgroundMode.configure({
          silent: true
            })  
            BackgroundMode.enable();
           
          }else{
            BackgroundMode.disable();
          }
      });

  })
   document.addEventListener('resume', ()=>{
      console.log("app resumida");
            
        	    LocalNotifications.on("click", (notification, state) => {
            let Alert = this.alertCtrl.create({
                title: "Hey",
                subTitle: "Es hora se suministrar: ",
                message: notification.text,
                buttons: ["OK"]
            });
            Alert.present();
        });
  })
    this.storage.get('token').then((value)=>{
    this.token = value;
    })
    // used for an example of ngFor and navigation
    this.pages = [
      
      { title: 'Inicio', component: HomePage, icon: "md-home" },
      { title: 'Tu Tratamiento', component: TratamentPagePage, icon: "md-medkit" }
     
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  Perfil(){
    this.storageService.getData3().then((data)=>{ 
      if(data){
        this.perfile = JSON.parse(data);
        this.perfile = this.perfile.pop();
      }else{
        this.perfile= [];
      }
      let data1 = this.perfile;
    this.nav.setRoot( ProfilePage, data1 );
    })
  }
  Tutorial(){
      this.nav.setRoot(TutorialPage);
  }
}
