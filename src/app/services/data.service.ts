import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, take } from 'rxjs';
import { Passenger } from '../models/passenger';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  //get the data from firestore as an observable
  data = this.db.collection('passengers').valueChanges({ idField: 'id' }) as Observable<Passenger[]>;

  constructor(
    private db: AngularFirestore
  ) { }

  //subscribe to data and resolve with the subscription
  getPassengers(): Promise<Passenger[]>{
    return new Promise((resolve) => {
      this.data.pipe(take(1)).subscribe((data) => {
        resolve(data);
      })
    })
  }
}
