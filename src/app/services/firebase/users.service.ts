import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { User } from '../../models/user.class';

export interface UserInterface {
  id?: string;
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
  user: User = new User();

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

  getUserRef(userId: string) {
    return doc(collection(this.firestore, 'users'), userId);
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
  setUser(obj: any, id?: string): UserInterface {
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
        let userCopy = new User(user.data());
        userCopy.id = user.id;
        this.users.push(userCopy);
        // this.users.push(this.setUser(user.data(), user.id));
      });
      console.log(this.users);
    });
  }

  subUser(userId: string) {
    return onSnapshot(this.getUserRef(userId), (user) => {
      let userCopy = new User(user.data());
      userCopy.id = user.id;
      this.user = userCopy;
      console.log('User: ', this.user);
    });
  }

  //UPDATE
  async updateUser(user: User, userId : string) {
    if (userId) {
      let docRef = this.getUserRef(userId);
      await updateDoc(docRef, user.toJSON()).catch((err) => {
        console.error(err);
      });
    }
  }
}
