import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { User } from '../../models/user.class';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  firestore: Firestore = inject(Firestore);

  constructor() { }

  getUsersRef() {
    return collection(this.firestore, 'users');
  }

  // CREATE
  async addUser(user : User) {
    let ref = this.getUsersRef();
    await addDoc(ref, user.toJSON()).catch(
      (err) => {
        console.error(err);
      }
    ).then(
      (docRef) => {
        console.log('Document written with ID: ', docRef?.id);
      }
    )
  }
}
