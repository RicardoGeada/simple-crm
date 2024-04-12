import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  onSnapshot,
} from '@angular/fire/firestore';
import { User } from '../../models/user.class';

export interface UserInterface {
  id? : string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: number;
  street: string;
  zipCode: number;
  city: string;
  state: string;
  country: string;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  firestore: Firestore = inject(Firestore);
  loading = false;
  users: UserInterface[] = [];

  unsubUsers;

  constructor() {
    // subscribe
    this.unsubUsers = this.subUsers();
  }

  ngOnDestroy() {
    // unsubscribe
    this.unsubUsers();
  }

  getUsersRef() {
    return collection(this.firestore, 'users');
  }

  // CREATE
  async addUser(user: User) {
    let ref = this.getUsersRef();
    this.loading = true;
    await addDoc(ref, user.toJSON())
      .catch((err) => {
        console.error(err);
        this.loading = false;
      })
      .then((docRef) => {
        // console.log('Document written with ID: ', docRef?.id);
        this.loading = false;
      });
  }

  // READ
  setUser(obj: any, id? : string): UserInterface {
    return {
      id: id || '',
      firstName: obj.firstName || '',
      lastName: obj.lastName || '',
      email: obj.email || '',
      birthDate: obj.birthDate || '',
      street: obj.street || '',
      zipCode: obj.zipCode || '',
      city: obj.city || '',
      state: obj.state || '',
      country: obj.country || '',
    };
  }

  subUsers() {
    return onSnapshot(this.getUsersRef(), (usersList) => {
      this.users = [];
      usersList.forEach((user) => {
        // console.log('User Object: ',user.data());
        this.users.push(this.setUser(user.data(), user.id));
      });
      console.log(this.users);
    });
  }
}
