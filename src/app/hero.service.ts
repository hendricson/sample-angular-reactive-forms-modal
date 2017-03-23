import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of }         from 'rxjs/observable/of';
import 'rxjs/add/operator/delay';

import { Hero, heroes, Address } from './data-model';

@Injectable()
export class HeroService {

  delayMs = 500;

  // Fake server get; assume nothing can go wrong
  getHeroes(): Observable<Hero[]> {
    return of(heroes).delay(this.delayMs); // simulate latency with delay
  }

  // Fake server update; assume nothing can go wrong
  updateHero(hero: Hero): Observable<Hero>  {
    const oldHero = heroes.find(h => h.id === hero.id);
    const newHero = Object.assign(oldHero, hero); // Demo: mutate cached hero
    return of(newHero).delay(this.delayMs); // simulate latency with delay
  }
}


@Injectable()
export class AddressService {

  delayMs = 500;
  addresses: Address[] = [];
  hero_id: number = 0;

  // Fake server get; assume nothing can go wrong
  getAddresses(): Observable<Address[]> {
    return of(this.addresses).delay(this.delayMs); // simulate latency with delay
  }

  getAddress(i: number) {
    return this.addresses[i];
  }

  empty() {
    this.addresses = [];
  }
  
  setAddresses(hero: Hero) {
    if (hero.id != this.hero_id) {
      this.empty();
      this.hero_id = hero.id;
      hero.addresses.map((address) => this.addresses.push(Object.assign({}, address)));  
      console.log('setAddresses() for ' + hero.name);
      console.log(this.addresses); 
    }
    return this.getAddresses();
  }

  update(address: Address, i: number) {

   console.log(this.addresses); 
   if (typeof this.addresses[i] !== 'undefined') {
     this.addresses[i] = Object.assign({}, address);
   } else {
     this.addresses.push(Object.assign({}, address));
   }

  }  

}
