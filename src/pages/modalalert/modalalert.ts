/* MEDICAL_MASTER
Software Medico Asistencial
Sistema de Informacion: Desarrollado en CAKEPHP 2.6
Aplicativo Movil: Desarrollado en Ionic 2 Framework.
Licencia Privativa.
Desarrolladores:
Ing. Guillermo Ochoa Torres
Ing. Emanuel Torres Clemente
Lugar: Maracay - Estado Aragua - Venezuela
Version: 0.1.1
Año: 2017 - 2018 */
import { Component } from '@angular/core';
import { NavController, Platform, AlertController, ViewController, NavParams } from 'ionic-angular';
import { LocalNotifications } from 'ionic-native';
import { StorageService } from '../../providers/storage';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgeValidator } from  '../../validators/numero';

 
@Component({
  selector: 'page-modalalert',
  templateUrl: 'modalalert.html'
})
export class ModalalertPage {
 
     day: any; test: any;
     hours: any;
    notifyTime: any;
    notifyDay: any;
    notifications: any[] = [];
     notificaciones: any[]=[];
     Horarios: any[] = [];
     HorarioStorage: any[] = [];
     DatosA: any[] = [];
     DatosAStorage: any[] = [];
    days: any[];
    chosenHours: number;
    chosenMinutes: number;
    pastilla: any;
    data:any;
    public todo: any;
     num: number;
     numH: number;
     VecesT: number; // numero de veces totales a suministrar la pastilla
     VecesD: number; // numero de veces por dia a suministrar la pastilla
    horaSelec3: any;// hora seleccionada
    constHr: string;
     public   i: number;
     public ii: number;
     acu: number = 0;
     day2: any;
     public Recipe: any;
     public prescripcion: any;
     public indi: any;
     public Fechatrata:any;

myform: FormGroup;

    constructor(public navCtrl: NavController, public platform: Platform, public alertCtrl: AlertController,
    public storage: Storage, private Builder: FormBuilder, public viewCtrl: ViewController, public storageService: StorageService, public params: NavParams ) {
        
        this.myform = Builder.group({
        'numero': ['', AgeValidator.isValid],
        'numero2': ['', AgeValidator.isValid]
        })

        this.notifyTime = moment(new Date()).format();
        this.chosenHours = new Date().getHours();
        this.chosenMinutes = new Date().getMinutes();
         
           this.data = {};
           this.data.pastilla="";
           this.data.horaP = "" ;
            //this.Dosis_total = null;
        this.notifyDay = moment().locale('es').format('dddd');
    }
    ngOnInit() {
		this.todo = this.params.data.todo ;
        this.getData();

		
	}
    timeChange(time){
            this.chosenHours = time.hour.value;
            this.chosenMinutes = time.minute.value;
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
        this.Fechatrata = this.Recipe.creado;
        }
       
      }else{
        this.Recipe= [];
        this.prescripcion = "Sin registros";
      }
    });
    }
    addNotifications(){
////---------------------------------------------------------------------------------------------
//-------Traer los datos de la hora y los dias del trata desde el DOM---------------- 
        this.num = this.data.diasP ; 
        this.numH = this.data.horasP;
//--------------------------------------------------------------------------
//   Calcular las dosis Totales y dosis diarias
        let dias = this.num * 24; // cada dia tiene 24 horas
        this.VecesT = Math.round(dias / this.numH); // la cantidad de dosis totales 
        this.VecesD = Math.round(24 / this.numH); // la cantidad de dosis por dia
       // console.log ('el numero de Veces que se debe suministrar por dia es: ', this.VecesD);
      //  console.log ('el numero de Veces Totales que se debe suministrar es: ', this.VecesT);  
//------------------------------------------------------------------------------------------------
        let HourInfo = new Date();
        HourInfo.setHours(this.chosenHours); // + la hora de cada dosis
        HourInfo.setMinutes(this.chosenMinutes);
         this.horaSelec3 = moment(HourInfo).format();
         this.Tratafunc();
        this.viewCtrl.dismiss(); 
    }
//--------------------------------------------------------------------------------------------------------------
    Tratafunc(){
         this.i = 0 ;
         this.ii = 0;
         //let id = 0;
        
        let hr = moment(this.horaSelec3).format();
            let hora = moment(hr).toDate();
         let hr2 = moment(this.horaSelec3).format();
        // let hr1 = moment(this.horaSelec3).format('h:mm:ss a');
         ///console.log(' datos de hr con toDate: ', hora);
         //console.log('datos de hr: ', hr); 
         let notification = {
                id: Date.now(),
                title: 'Hora de Empezar a Suministrar: ',
                text: '' + this.data.pastilla + '',
                at: hora,
                every: 'day',
                autoClear: true,
                data: { 
                      mensaje: this.data.pastilla
                }
            };
    let Datosadi = {
        dosis: this.data.dosis,
        concentracion : this.data.concent
    }
            //console.log ('hr: ',hr); 
            console.log('notificacion: ', notification);
        this.notifications.push(notification);

        let Alerta = {
                id: Date.now(),
                title: 'Hora de Empezar a Suministrar: ',
                text: '' + this.data.pastilla + '',
                at: hr,
                every: 'day',
                autoClear: true,
                data: { 
                      mensaje: this.data.pastilla
                      
                }
            };
       
     //let  hrt = moment(notification.at).format().toString;
   //  notification.at = hrt;
        
        let todos1;
        this.storageService.getData2().then((storage_data)=>{
              if(storage_data){
                todos1 = JSON.parse(storage_data);
                todos1.push(Alerta)
                //console.log('notificacion mas datos adicionales: ', todos1);
              }else{
                  todos1= [Alerta];
              }
                let newData = JSON.stringify(todos1);
               this.storage.set('Alertas', newData);
              // console.log("se guardo el primer horariosdasd.")
            });
         // do
        do{
            
             hr = moment(hr).add(this.numH, 'h').format();
             let hora2 = moment(hr).toDate();
             ///console.log('hr en notification2',hr);
            // console.log ('hr toDate: ', hora2 );
            // id++;
             let notification2 = {
                id: Date.now(),
                title: 'Hora de Suministrar: ',
                text: '' + this.data.pastilla + '',
                at: hora2,
                every: 'day',
                autoClear: true,
                data: { 
                      mensaje : this.data.pastilla
                }
            };
            //console.log(this.i + 1);
           // console.log('la: ',this.i, ': ', moment(hr).format('h:mm:ss a'));
            this.notifications.push(notification2);
           // console.log(notification2);
        this.i ++;
        this.acu= +1;
        }while( this.i <= (this.VecesT - 2));
        // while----
        console.log("Nuevas notificaciones han sido programadas: ", this.notifications);
        do{
             hr2 = moment(hr2).add(this.numH, 'h').format();
             let Horarios ={
                 hora: hr2
             };
             this.Horarios.push(Horarios);
             // console.log('la: ',this.ii, ': ', moment(hr2).format('h:mm:ss a'));
        this.ii ++;
        }while(this.ii <= (this.VecesD - 2));
       //console.log(this.Horarios);
        this.DatosA.push(Datosadi);
        //console.log('Datos adicionales', Datosadi);

//------- TEST funciona-----------------------------------------------------------------
         this.notificaciones.push(this.notifications);
         //console.log('this.notificaciones en la posicion 0: ',this.notificaciones[0]);
         
         let newData = JSON.stringify(this.notificaciones[0]);
         this.storage.set('Alerta'+this.data.pastilla +'', newData);

         this.HorarioStorage.push(this.Horarios);
         let DataHorario = JSON.stringify(this.HorarioStorage[0]);
         this.storage.set('Horarios'+this.data.pastilla+'', DataHorario);
         
         this.DatosAStorage.push(this.DatosA);
         let DatosAdicionales = JSON.stringify(this.DatosAStorage[0]);
         this.storage.set('DatosAdi'+this.data.pastilla+'', DatosAdicionales);

//--------------------------------------------------------------------------------------
      
      
        //console.log(this.notificaciones); 
        if(this.platform.is('cordova')){
            // Cancel any existing notifications
           
           
            // Schedule the new notifications
            LocalNotifications.schedule(this.notifications);
            let alert = this.alertCtrl.create({
                title: 'Alarmas programadas',
                buttons: ['Ok']
            });
            alert.present();
        }
      
    }

 //----------------------------------------------------------------------------------------------------------------
    cancelAll(){// Cancel any existing notifications // OJO ESTO ESTABA ARRIBA
            LocalNotifications.cancelAll();
            this.notifications = [];
    let alert = this.alertCtrl.create({
        title: 'Notificaciònes canceladas',
        buttons: ['Ok']
    });
    alert.present();
    this.storage.set('Alertas', "[]");
    }
    dismiss() {
	 	this.viewCtrl.dismiss();
	}

}
