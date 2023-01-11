import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, take } from 'rxjs';
import { Passenger } from '../models/passenger';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  data = this.db.collection('passengers').valueChanges({ idField: 'id' }) as Observable<Passenger[]>;

  constructor(
    private db: AngularFirestore
  ) { }

  getPassengers(): Promise<Passenger[]>{
    return new Promise((resolve) => {
      this.data.pipe(take(1)).subscribe((data) => {
        resolve(data);
      })
    })
  }
}
