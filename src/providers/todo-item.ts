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
import {Injectable} from '@angular/core';
import {StorageService} from '../providers/storage';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import { LocalNotifications } from 'ionic-native';

@Injectable()
export class TodoItem  {
     private icons = [
    'alarm', 'alert', 'basket', 'beer', 'bicycle', 'boat', 'body', 'book', 'bowtie', 'briefcase', 'brush',
     'bug', 'bulb', 'bus', 'cafe', 'call','card', 'cart','chatboxes', 'desktop'
     , 'document', 'eye', 'flag', 'flash', 'flame', 'flask',
     , 'heart', 'happy', 'home', 'ice-cream','list', 'man',
        , 'no-smoking', 'nuclear', 'paw', 'pin', 'search', 'walk', 'woman'];
    public icons_collection = this.createArray();
    public todo: any;
    public alarmas: any;
    public alarma: any;
    public FechaE: any;
    constructor(private storageService: StorageService, public storage: Storage ) {}
    
    //saves todo data in storage
    save(data) {
        return new Promise((resolve, reject) => {
              this.addToStorage(data, resolve);
        });
    }

    //creates new todo item
    addToStorage(data, resolve) {
        let todos;
        this.storageService.getData().then((storage_data) => {
            //each todo gets a timestamp as id
            data.id = Date.now();
            if (storage_data) {
                console.log('la data q busco: ' ,storage_data);
                todos = JSON.parse(storage_data);
                todos.push(data)
              this.FechaE = data.end_date;
              console.log(data.title);
              console.log(this.FechaE);
              this.schedule();
            } else {
                todos = [data];
            }
            this.storageService.save(todos).then(() => {
                resolve();
            });
        }); 
    }
  schedule() {
		let fecha = moment(this.FechaE).subtract(1, 'days').toDate();
 let Notification = {
                id: Date.now(),
                title: 'Recordatorio: ',
                text: 'Un evento cúlmina el día de mañana.',
                at: fecha,
                every: 'age',
                autoClear: true
            };
        LocalNotifications.schedule(Notification);
        console.log(fecha);
        console.log('id de notificacion', Notification.id);
        console.log('se ha programado alarma ', Notification);
    }
    //updates an existing todo item
    edit(data) {
        return new Promise((resolve, reject) => {
            this.storageService.getData().then((storage_data) => {
                let todos = JSON.parse(storage_data);
                 todos.forEach(function(item, index, array) {
                     if (item.id == data.id) {
                         array[index] = data;
                     }
                 })
                 this.storageService.save(todos).then(() => {
                    resolve();
                });
             }); 
        });
    }

    //deletes a todo item with based on its id
    remove(id) {
        return new Promise((resolve, reject) => {
            this.storageService.getData().then((storage_data) => {
                let todos = JSON.parse(storage_data);
                todos.forEach(function(item, index, array) {
                    if (item.id == id) {
                        array.splice(index, 1);
                        LocalNotifications.cancel(item.id);
                        console.log('id cancelada: ' ,item.id);
                    }
                 })
                 this.storageService.save(todos).then(() => {
                     
                    resolve();
                });
             }); 
        });
    }
      remove2(id) {
        return new Promise((resolve, reject) => {
           this.alarmas = this.storage.get('Alertas');
            this.alarmas.then((value:any) =>{
               this.alarma = value;
                if(this.alarma != null){
                    this.todo = JSON.parse(this.alarma);
                this.todo.forEach(function(item, index, array) {
                    if (item.id == id) {
                        array.splice(index, 1);
                        }
                     })
                }
                this.todo = JSON.stringify(this.todo);
                        console.log(this.todo);
                        this.storage.set('Alertas', this.todo); 
                        resolve();
            });
        }); 
    }

    //sets the selected icon for a todo item
    setIcon(todo) {
        var icon_index = this.icons_collection.map(function(item) {
            //reset icon selected
            item.selected = false;
            return item.icon_name; }).indexOf(todo.icon);
        var icon_found = this.icons_collection[icon_index];
        icon_found.selected = true;
        this.icons_collection.splice(0, 0, this.icons_collection.splice(icon_index, 1)[0]);
     }

    //Generates an array of icon objects
    createArray() {
        var icon_array = [];
        this.icons.forEach(function(item) {
            icon_array.push({'icon_name': item, 'selected': false});
        }.bind(this));
        return icon_array;
    }
  
}