import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../_service/user.service';
import { SearchService } from '../_service/search.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { OnlineUsersComponent } from '../online-users/online-users.component';

@Component({
  selector: 'app-dashbard',
  templateUrl: './dashbard.component.html',
  styleUrls: ['./dashbard.component.css']
})
export class DashbardComponent {
  myForm: FormGroup;
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  onSubmit() {
    console.log("search");
    this.searchService.search(this.myForm.value).subscribe(data => {
      if(data) {
        console.log(data);
      }
    }, (err) => {
      this.toastr.error('Invalid username or password', 'Error');
    });
  }

  constructor(private breakpointObserver: BreakpointObserver, private formBuilder: FormBuilder, private http: HttpClient, private userService: UserService,  private toastr: ToastrService, private router: Router, private searchService: SearchService) {
    this.myForm = formBuilder.group({
      'search': ['', [Validators.required]]
    })
  }
}
