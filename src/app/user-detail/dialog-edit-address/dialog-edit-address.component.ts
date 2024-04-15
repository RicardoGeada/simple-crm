import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserInterface, UsersService } from '../../services/firebase/users.service';
import { User } from '../../models/user.class';

@Component({
  selector: 'app-dialog-edit-address',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, CommonModule, MatButtonModule],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss'
})
export class DialogEditAddressComponent {
  user : User = new User();
  userId : string = '';

 constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>, public usersService : UsersService) {

 }

 saveUser() {
  console.log( 'user' , this.user);
  this.usersService.updateUser(new User(this.user.toJSON()), this.userId);
  this.dialogRef.close();
 }
}
