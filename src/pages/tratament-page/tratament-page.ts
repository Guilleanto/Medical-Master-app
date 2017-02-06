import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, MenuController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { StorageService } from '../../providers/storage';
import { ActionsPage } from '../actions/actions';
import { LocalNoti } from '../localnotificacion/localnotificacion';


@Component({
  selector: 'page-tratament-page',
  templateUrl: 'tratament-page.html'
})
export class TratamentPagePage {
 
 public Recipe: any;
 public prescripcion: any;
 public Indicacion: any;
 public indi: any;
 public Cita: any;
 public date_hora: any;
 

  constructor(public navCtrl: NavController, public storage: Storage,
  public storageService: StorageService, public alert: AlertController, public loading: LoadingController,
  public menu: MenuController) {
   
  }

  ionViewWillEnter() {
    this.menu.enable(true);
    this.getData();

  }

  getData(){
   this.storageService.getData5().then((data)=>{ //Mostrar un dato especifico REVISAR POR QUE SE PUEDE MEJORAR LAS OTRAS CON ESTE CODIGO
      if(data){
        this.Recipe =data;
        if(this.Recipe == "[]"){
          this.prescripcion = "Sin registro";
          this.indi = " Sin Registro";
        }else{
           this.Recipe = JSON.parse(data);
        this.Recipe = this.Recipe.pop();
        console.log(this.Recipe);
        this.prescripcion = this.Recipe.prescription;
        this.indi = this.Recipe.indications;
        }
       
      }else{
        this.Recipe= [];
        this.prescripcion = "Sin registros";
      }
    });
       this.storageService.getData4().then((data)=>{ //Mostrar un dato especifico REVISAR POR QUE SE PUEDE MEJORAR LAS OTRAS CON ESTE CODIGO
      if(data){
          this.Cita = data;
        if(this.Cita == "[]"){
            this.date_hora = "Sin registro"
        }else{
          this.Cita = JSON.parse(data);
        this.Cita = this.Cita.pop();
        this.date_hora = this.Cita.date_hour;
        }
        
      }else{
        this.Cita= [];
        this.date_hora = "Sin registros";
      }
    });
  }
  Update(){
    let alert = this.alert.create({
          title: 'Cargando datos',
          message: 'Debe tener una conexion  de datos activa para descargar sus datos',
          buttons: [{
                text: 'Cancelar',
                role: 'cancel',
            handler: () => {
                console.log('Cancel clicked');
                this.storage.remove("nombre");
                this.storage.remove("apellido");
                this.storage.remove("token");
                this.storage.remove('id');
                  }
              },
         {
                text: 'Seguir',
                handler: () => {
              this.storageService.cargarTrata()
          }
        }
      ]
    });
  alert.present();
  }
  button(){
      this.navCtrl.push( ActionsPage );
  }
  button2(){
      this.navCtrl.push( LocalNoti );
  }
  
} 

  

