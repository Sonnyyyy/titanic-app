import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Passenger } from '../models/passenger';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  data = this.store.collection('train').valueChanges({ idField: 'id' }) as Observable<Passenger[]>;

  constructor(private store: AngularFirestore) { }

  getPassengers(): Promise<Passenger[]>{
    return new Promise((resolve) => {
      this.data.subscribe((data) => {
        resolve(data);
      })
    })
  }
}
