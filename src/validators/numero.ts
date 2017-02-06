import { FormControl } from '@angular/forms';

export class AgeValidator {
 
    static isValid(control: FormControl): any {
 
        if(isNaN(control.value)){
            return {
                "not a number": true
            };
        }
 
        if(control.value % 1 !== 0){
            return {
                "not a whole number": true
            };
        }
 
 
        if (control.value > 100){
            return {
                "not realistic": true
            };
        }
 
        return null;
    }
 
}