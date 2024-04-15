import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from './../services/firebase/users.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditAddressComponent } from './dialog-edit-address/dialog-edit-address.component';
import { User } from '../models/user.class';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatMenuModule, DialogEditAddressComponent],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
  userId : string;
  unsubUser;

  constructor(private route: ActivatedRoute, public usersService : UsersService, public dialog: MatDialog) {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    // console.log('userID: ', this.userId);
    this.unsubUser = usersService.subUser(this.userId);
  }

  ngOnDestroy() {
    // unsubscribe
    this.unsubUser();
  }

  openAddressDialog() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.usersService.user);
    dialog.componentInstance.userId = this.userId;
  }
}
