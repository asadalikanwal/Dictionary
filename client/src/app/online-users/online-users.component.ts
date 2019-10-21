import { Component, OnInit } from '@angular/core';
import { UserService } from '../_service/user.service';

@Component({
  selector: 'online-users',
  templateUrl: './online-users.component.html',
  styleUrls: ['./online-users.component.css']
})
export class OnlineUsersComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAllActiveUsers().subscribe(data => {
      if(data) {
        console.log("ACtive User", data)
      }
    }, (err) => {
      console.log("No Active user", err);
      // this.toastr.error('Invalid username or password', 'Error');
    });
  }

}
