import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/firebase/users.service';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [FormsModule ,MatDialogModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatDatepickerModule, MatProgressBarModule],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {

  user : User = new User();
  birthDate! : Date;

  constructor(public usersService : UsersService, public dialogRef: MatDialogRef<DialogAddUserComponent>) {

  }

  saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    console.log( 'user' , this.user);
    this.usersService.addUser(this.user);
    this.dialogRef.close();
  }
}
