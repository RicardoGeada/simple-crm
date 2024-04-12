import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { User } from '../../models/user.class';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  firestore: Firestore = inject(Firestore);
  loading = false;

  constructor() { }

  getUsersRef() {
    return collection(this.firestore, 'users');
  }

  // CREATE
  async addUser(user : User) {
    let ref = this.getUsersRef();
    this.loading = true;
    await addDoc(ref, user.toJSON()).catch(
      (err) => {
        console.error(err);
        this.loading = false;
      }
    ).then(
      (docRef) => {
        console.log('Document written with ID: ', docRef?.id);
        this.loading = false;
      }
    )
  }
}
