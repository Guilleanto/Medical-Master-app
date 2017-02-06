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
import {Storage} from '@ionic/storage';
import {Injectable} from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {AlertController, LoadingController } from 'ionic-angular';

//import { NativeStorage } from 'ionic-native';


@Injectable()
export class StorageService {
       data : any;
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
  constructor(public http: Http, public storage: Storage, private loading: LoadingController, private alert: AlertController) {
    
  }
   getData() {
        return this.storage.get('Acciones');  
    }
      save(data) {
        let newData = JSON.stringify(data);
        
        return this.storage.set('Acciones', newData);
      }


   getData2() {
        return this.storage.get('Alertas');  
    }
    getData3(){
      return this.storage.get('Perfil');
    }
    getData4(){
       return this.storage.get('Citas');
    }
      save2(data) {
        let newData = JSON.stringify(data);
        console.log('se agrego: ',newData);
        return this.storage.set('Alertas', newData);
      }
      getData5(){
        return this.storage.get('Tratamiento')
      }
       getData6(){
        return this.storage.get('Indicacion')
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
    this.headers.append('Authorization', this.x);
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
                                   this.headers.delete('Authorization');
                          }, 3000);
                          setTimeout(() => {
                             // this.navCtrol.setRoot(HomePage);
                          loader.dismiss();
                      }, 2000);
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
