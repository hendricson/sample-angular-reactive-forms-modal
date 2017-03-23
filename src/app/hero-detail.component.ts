import { Component, Input, forwardRef, OnChanges, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren }       from '@angular/core';
import { FormArray, FormBuilder, FormGroup,
  FormControl,
  ControlContainer,
  Validators,
  FormGroupDirective
 }            from '@angular/forms';

import { Observable }        from 'rxjs/Observable';

import { Address, Hero, states } from './data-model';
import { HeroService, AddressService }           from './hero.service';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { AddressComponent } from './address';


export abstract class FormControlContainer {
  abstract addControl(name: string, control: FormControl): void;
  abstract removeControl(name: string): void;
}

export const formGroupContainerProvider: any = {
  provide: FormControlContainer,
  useExisting: forwardRef(() => HeroDetailComponent)
};


@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html'
})
export class HeroDetailComponent implements OnChanges, FormControlContainer, OnInit, OnDestroy {
  @Input() hero: Hero;
  heroForm: FormGroup;
  nameChangeLog: string[] = [];
  states = states;
  
  addresses: Observable<Address[]>;

  //@ViewChild('modal') modal: ModalComponent;
  @ViewChildren('modal') modals: QueryList<ModalComponent>;//ModalComponent[];//
  private _formSnapshot: {}; 
  private _addingNewItem: boolean = false;
  

  constructor(
    private fb: FormBuilder,
    private heroService: HeroService,
    private addressService: AddressService) {

    this.createForm();
    //this.ngOnChanges();
    

    this.logNameChange();
  }

  ngOnInit() {
    //this.hero.addresses.map((address, i) => /*{console.log('address=');console.log(address);console.log('i=');console.log(i);}*/this.addressService.update(address, i));
    this.addresses = this.addressService.setAddresses(this.hero);

  }

  ngOnDestroy() {
    this.addressService.empty();
  }

  addControl(name: string, control: FormControl): void {
    this.heroForm.addControl(name, control);
  }

  removeControl(name: string): void {
    this.heroForm.removeControl(name);
  }

  createForm() {
    this.heroForm = this.fb.group({
      name: '',
      power: '',
      sidekick: ''
    });
  }

  ngOnChanges() {
    this.heroForm.reset({
      name: this.hero.name
    });

    this.addresses = this.addressService.setAddresses(this.hero);
   
  }

  get secretLairs(): FormArray {
    return this.heroForm.get('secretLairs') as FormArray;
  };

  addLair() {
    //this.secretLairs.push(this.fb.group(new Address()));
    this.addressService.getAddresses().subscribe(result => {
      this.addressService.update(new Address(), result.length);
      this.addressService.getAddresses().subscribe(hello => this.modals.last.open());
    });

  }

  onSubmit() {
    console.log('onSubmit() clicked!');

    //or try f.map(res => res.map(v => myFunction(v)))
    this.addressService.getAddresses().subscribe(result => {
      
      const formModel = this.heroForm.value;

      // return new `Hero` object containing a combination of original hero value(s)
      // and deep copies of changed form model values
      this.hero = {
        id: this.hero.id,
        name: formModel.name as string,
        // addresses: formModel.secretLairs // <-- bad!
        addresses: result
      };
      this.heroService.updateHero(this.hero).subscribe(/* error handling */);
      this.ngOnChanges();
    });

  }

  revert() { this.ngOnChanges(); }

  logNameChange() {
    const nameControl = this.heroForm.get('name');
    nameControl.valueChanges.forEach(
      (value: string) => this.nameChangeLog.push(value)
    );
  }
}
