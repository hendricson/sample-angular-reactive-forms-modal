import { NgModule }            from '@angular/core';
import { BrowserModule }       from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';  // <-- #1 import module

import { AppComponent }        from './app.component';
import { HeroDetailComponent, formGroupContainerProvider } from './hero-detail.component'; // <-- #1 import component
import { HeroListComponent }   from './hero-list.component';
import { AddressComponent } from './address/address.component';

import { HeroService, AddressService }         from './hero.service'; //  <-- #1 import service

import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule, // <-- #2 add to Angular module imports
    Ng2Bs3ModalModule
  ],
  declarations: [
    AppComponent,
    HeroDetailComponent, // <-- #3 declare app component
    HeroListComponent,
    AddressComponent
  ],
  exports: [ // export for the DemoModule
    AppComponent,
    HeroDetailComponent,
    HeroListComponent
  ],
  providers: [ HeroService, formGroupContainerProvider, HeroDetailComponent, AddressService ], // <-- #4 provide HeroService
  bootstrap: [ AppComponent ]
})
export class AppModule { }
