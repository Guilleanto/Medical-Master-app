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


import {  Injectable,  } from '@angular/core';
import { Http, Request, RequestMethod, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Storage} from '@ionic/storage';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { Page1 } from '../pages/page1/page1';
import { HomePage } from '../pages/admin/admin';
import { TutorialPage } from '../pages/tutorial/tutorial';



@Injectable()
export class MyService {
      data : any;
      private mydata: any; private mydata2: any;
      public getsession: any;
      public nid: any;
      public auth : boolean;
       headers = new Headers();
       citas: any[] = [];
       datosjsoncita: any;
       diagnosticos: any[] = [];
       datosjsondiag: any;
      indications: any[] = [];
      datosjsonindi: any;
      estudios: any[] = [];
      datosjsonStud: any;
      Profile : any[] = [];
      datosProfile: any;
      tratamiento: any[] = [];
       public datosjson: any;
        public datoguardadojson: any;
         x : any;
    perfil: any;
    perfilName: any;
    perfilApe: any;
    pass: any;

     //  public datosjson: any;
      // tratamiento: any[] = [];
  
  constructor(public http: Http, public storage: Storage, 
  private navCtrl : NavController, private alert : AlertController, 
  private loading: LoadingController) {
        

}
 
  postLogin(data){
  let loader = this.loading.create({
      content:'Autentificando'
    });
    loader.present();
        
        let link = "url/api"; //url API
        this.http.post(link,data) 
          .map(res => res.json())
          .subscribe(data => {
            this.mydata = data;
            this.storage.set('nombre', this.mydata[0].name);
            this.storage.set('token', this.mydata[0].token);
            this.storage.set('apellido', this.mydata[0].last_name);
            this.storage.set('id', this.mydata[0].id);
            this.storage.remove('datapaciente');
            console.log(this.mydata);
            this.auth = true;
 setTimeout(()=>{
      loader.dismiss();
       this.navCtrl.setRoot(Page1);
    },3000)
         
        }, error =>{
           loader.dismiss();
            //this.auth= false;
            console.log(error);
            let alert = this.alert.create({
              title: 'Error al Ingresar',
              subTitle: 'Porfavor Ingrese cedula y contraseña validas ò verifique su conexion de datos.',
              buttons: ['ok']
              });
          alert.present();
        })

  }
  ValidEmail(data){
    return new Promise((resolve, reject) => {
     let link =  "url/api"; //url API
        this.http.post(link,data) 
          .map(res => res.json())
          .subscribe(data => {
            this.mydata2 = data;
            console.log(this.mydata2[0].id);
            console.log(this.mydata2[0].email);
            this.storage.set('email', this.mydata2[0]);
            console.log(this.mydata2);
           resolve();
            }, error =>{
           
            //this.auth= false;
            console.log(error);
            let alert = this.alert.create({
              title: 'Error',
              subTitle: 'El correo electronico no esta registrado.',
              buttons: ['ok']
              });
          alert.present();
          
        })
     });

  }
  getEmail(){
    return this.storage.get('email');
  }
 
  checkToken(){
        
       return this.getsession = this.storage.get('token');
  }
  cargarTrata(){
    let loader = this.loading.create({
            spinner: 'bubbles',
            content: "Actualizando..",
                });
    loader.present();
    this.getsession = this.storage.get('token')
    .then((key: any)=>{
          this.x  = key;
    this.headers.append('authorization', this.x);
});
      
      this.nid = this.storage.get('id'); // traigo del storage la id de la persona
        this.nid.then((value:any)=>{
          this.nid = value;
        
            this.http.get('url/api/'+ this.nid +'.php' , {headers: this.headers}  )
              .map(res => res.json())
                .subscribe(data => {
                    this.data = data.prescriptions;//recipe
                      //  resolve(this.data);
                      
                        this.tratamiento = this.data;
                        this.datosjson = JSON.stringify(this.tratamiento);
                        this.storage.set("Tratamiento", this.datosjson); // cargo el string json al storage

                      

                            this.http.get('url/api/'+ this.nid +'.php' , {headers: this.headers}  )
                            .map(res => res.json())
                              .subscribe(data => {
                                this.data = data.citations;
                            
                              this.citas = this.data;
                              this.datosjsoncita = JSON.stringify(this.citas);
                              this.storage.set("Citas", this.datosjsoncita); // cargo el string json al storage
                              this.http.get('url/api/'+ this.nid +'.php' , {headers: this.headers}  )
                                .map(res => res.json())
                                  .subscribe(data => {
                                    this.data = data.studies;
                                      
                                        this.estudios = this.data;
                                        this.datosjsonStud = JSON.stringify(this.estudios);
                                        this.storage.set("Estudios", this.datosjsonStud);
                                          
                                this.http.get('url/api/'+ this.nid +'.php' , {headers: this.headers}  )
                                .map(res => res.json())
                                  .subscribe(data => {
                                    this.data = data.paciente;
                                      
                                        this.Profile = this.data;
                                        this.datosProfile = JSON.stringify(this.Profile);
                                        this.storage.set("Perfil", this.datosProfile);
                                  },err =>{
                                            let alert = this.alert.create({// SI  HAY ERROR MOSTRAR MENSAJE DATOS Actualizados
                                            title: 'ERROR',
                                            subTitle: 'Se ha producido un error en la actualizaciòn',
                                              buttons: ['Volver']
                                              });
                                              alert.present();
                                              console.log(err.status);        
                                                  });

                                  },err =>{
                                            let alert = this.alert.create({// SI  HAY ERROR MOSTRAR MENSAJE DATOS Actualizados
                                            title: 'ERROR',
                                            subTitle: 'Se ha producido un error en la actualizaciòn',
                                              buttons: ['Volver']
                                              });
                                              alert.present();
                                              console.log(err.status);        
                                                  });
      
                            },err =>{
                                    let alert = this.alert.create({// SI  HAY ERROR MOSTRAR MENSAJE DATOS Actualizados
                                    title: 'ERROR',
                                    subTitle: 'Se ha producido un error en la actualizaciòn',
                                      buttons: ['Volver']
                                      });
                                    alert.present();
                                  console.log(err.status);
                            });
                          setTimeout(() => {
                                  let alert = this.alert.create({// SI NO HAY ERROR MOSTRAR MENSAJE DATOS Actualizados
                                    title: 'Información',
                                    subTitle: 'Actualización Exitosa',
                                      buttons: ['Cerrar']
                                      });
                                  alert.present();
                          }, 3000);
                            setTimeout(() => {
                              this.navCtrl.setRoot(TutorialPage);
                          loader.dismiss();
                      }, 2000);  // guardo el json string en el localstorage
        },err =>{
            let alert = this.alert.create({// SI  HAY ERROR MOSTRAR MENSAJE DATOS Actualizados
            title: 'ERROR',
            subTitle: 'Se ha producido un error en la actualizaciòn',
              buttons: ['Volver']
              });
            alert.present();
          console.log(err.status);
    });
      });
  }
    
}
