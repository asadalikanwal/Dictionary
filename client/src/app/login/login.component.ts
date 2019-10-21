import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../_service/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private userService: UserService,  private toastr: ToastrService, private router: Router) {
    this.userService.logout();
    this.myForm = formBuilder.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required]]
    })
  }

  onSubmit() {
    console.log("submit");
    this.userService.checkUser(this.myForm.value).subscribe(data => {
      if(data) {
        this.userService.setCurrentUser =  data.token;
        console.log(data)
        this.toastr.success('Welcome to dashboard', 'Success');
        this.router.navigate(['/dashboard'])
      }
    }, (err) => {
      this.userService.setCurrentUser =  '';
      this.toastr.error('Invalid username or password', 'Error');
    });
  }

  ngOnInit() {

  }



}
