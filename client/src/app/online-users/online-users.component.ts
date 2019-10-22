import { Component, OnInit } from '@angular/core';
import { UserService } from '../_service/user.service';
import{map} from 'rxjs/operators'

@Component({
  selector: 'online-users',
  templateUrl: './online-users.component.html',
  styleUrls: ['./online-users.component.css']
})
export class OnlineUsersComponent implements OnInit {
users;
  constructor(private userService: UserService) {
    console.log("constructor");
    this.userService.getAllActiveUsers().subscribe(data => {
      if(data) {
        console.log("ACtive User", data);
        this.users = data;
      }
    }, (err) => {
      console.log("No Active user", err);
      // this.toastr.error('Invalid username or password', 'Error');
    });

  }

  ngOnInit() {
    console.log("onInt");

  }

}
