import { Component } from '@angular/core';
import { ModalController, NavController, Platform, AlertController, ViewController, PopoverController, MenuController} from 'ionic-angular';
import { StorageService } from '../../providers/storage';
import { Storage } from '@ionic/storage';
import { ModalalertPage } from '../modalalert/modalalert';
import { ModalDetailPage } from '../modal-detail/modal-detail';
import { PopoverPage2 } from '../popover2/popover2';
 
@Component({
  selector: 'page-localnotificacion',
  templateUrl: 'localnotificacion.html'
})
export class LocalNoti {
 
    pastilla: any;
    data:any;
    public todos = [];
	public todo: any;
	selectedItemSlide:any;
 
    constructor(public navCtrl: NavController, public platform: Platform, public alertCtrl: AlertController,
    public storage: Storage, public viewCtrl: ViewController, public storageService: StorageService,
    public modal: ModalController, public popoverCtrl: PopoverController,public modalCtrl: ModalController, public menu: MenuController ) {
        
     
 
    }

    ionViewDidEnter() { 
		this.menu.enable(false);
	       this.getData(); 
		   
    }
    getData() {
		this.storageService.getData2().then((data) => {
	        if (data) {
	            this.todos = JSON.parse(data);
				console.log(this.todos.length);
				return  true;
				//console.log(this.todos[0].data)
	        } else {
	        	this.todos = [];
	        }
	    });
		
	}
	
    //Presenta el modal para cada item y editarlo
	newTodo() {
		
		this.navCtrl.push(ModalalertPage);

	}
    dismiss() {
	 	this.viewCtrl.dismiss();
	}
	editTodo(item) {
		
		let modal = this.modalCtrl.create(ModalDetailPage, {
			'todo':item,
			item: item.text,
	});
		modal.present();
	}
    presentPopover(index, ev, item) {
		ev.stopPropagation();
		ev.preventDefault();
	    
		let popover = this.popoverCtrl.create(PopoverPage2, {
	      todos: this.todos,
	      index: index,
		  item: item.text
	    });
		console.log(item.text);
		
	    popover.present({
	      ev: ev
	    });
		
  	}

 
}
