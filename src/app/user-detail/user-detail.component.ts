import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from './../services/firebase/users.service';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
  userId : string;
  unsubUser;

  constructor(private route: ActivatedRoute, public usersService : UsersService) {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    // console.log('userID: ', this.userId);
    this.unsubUser = usersService.subUser(this.userId);
  }

  ngOnDestroy() {
    // unsubscribe
    this.unsubUser();
  }
}
