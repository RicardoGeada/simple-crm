import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/firebase/users.service';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [FormsModule ,MatDialogModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatDatepickerModule],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {

  user : User = new User();
  birthDate! : Date;

  constructor(public usersService : UsersService) {

  }

  saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    console.log( 'user' , this.user);
    this.usersService.addUser(this.user);
  }
}
