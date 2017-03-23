import { Component, Output, EventEmitter, ViewChild, Input, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { FormArray, FormBuilder, FormControl, FormGroup, Validators }            from '@angular/forms';

import { FormControlContainer } from '../hero-detail.component';

import { Observable }        from 'rxjs/Observable';

import { Address, Hero, states } from '../data-model';
import { AddressService }           from '../hero.service';

@Component({
    selector: 'address-modal',
    templateUrl: './address.component.html'
})
export class AddressComponent implements OnInit, OnDestroy {
    @Input() address: Address;
    @Input() number: number = 0;
    @ViewChild('modal') modal: ModalComponent;
    states = states;

    //heroes: Observable<Hero[]>;
    //heroes: Hero[];
    
   // private address: Address;
    private addressForm: FormGroup;

    constructor(private fb: FormBuilder,
                private addressService: AddressService) {




    }

    ngOnInit() {
        console.log('AddressComponent ngOnInit() number=');
        console.log(this.number);



        this.address = this.addressService.getAddress(this.number);

        console.log('AddressComponent ngOnInit() address=');
        console.log(this.address);        


        //this.address = this.heroes[this.number].addresses;

                         this.addressForm = this.fb.group({
                         street: [this.address.street, Validators.required],
                         city: [this.address.city, Validators.required],
                         state: [this.address.state, Validators.required],
                         zip: [this.address.zip, Validators.required]
                        });               
        
        //this.heroes.map( list => list ).do();
        //console.log(this.heroes[this.number]);
        //this.address = this.heroes[this.number].addresses;
        /*this.heroes = this.heroService.getHeroes()
                      // Todo: error handling
                      .finally(() => this.isLoading = false);
*/




        /*console.log('AddressComponent ngOnInit() heroForm=');
        console.log(this.heroForm);

        console.log('AddressComponent ngOnInit() this.number=');
        console.log(this.number);

        console.log('AddressComponent ngOnInit() this.heroForm=');
        console.log(this.heroForm);*/
    }

    open() {
        this.address = this.addressService.getAddress(this.number);
        console.log('address.component.ts open() address = ');
        console.log(this.address);
        for (let control in this.addressForm.controls) {
          this.addressForm.controls[control].setValue(this.address[control]);
        }


        this.modal.instance.open();
    }

    @Output() confirm: any = new EventEmitter();
    private confirmStream: any = this.emitEvent(this.confirm, 'confirm');

    @Output() cancel: any = new EventEmitter();
    private cancelStream: any = this.emitEvent(this.cancel, 'cancel');

    private emitEvent(emitter:any, action:string) {
        return (e: any) => {

            if (action != 'cancel') this.addressService.update(this.addressForm.value, this.number);

            this.modal.instance.dismiss();
            emitter.emit(e);
        }
    }

    ngOnDestroy() {
        //this._parent.removeControl('street');
       // this._parent.removeControl('city');
    }
}