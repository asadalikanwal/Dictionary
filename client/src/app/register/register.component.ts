import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
  AbstractControl
} from "@angular/forms";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../_service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  myForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, public userService: UserService, private toastr: ToastrService) {
    this.myForm = formBuilder.group({
      'email': ['', [
        Validators.required,
        Validators.email
      ],
        [this.asyncEmailValidator.bind(this)]
      ],
      'password': ['', [
        Validators.required,
      ]]
    })

  }

  onSubmit() {
    this.userService.saveUser(this.myForm.value).subscribe(data => {
      console.log(data)
      if (data.result) {
        console.log("Success");
        this.toastr.success('Your account is created, please login', 'Account');
      } else {
        console.log("FAiled");
        this.toastr.error('Something went wrong, please try again later', 'Account');
      }
    });
  }

  getUserAuth() {
    return this.http.get('https://localhost:3000/users/aakanwal@mum.edu');
  }

  asyncEmailValidator(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>(
      async (resolve, reject) => {
        this.userService.validateUserByEmail(control.value).subscribe(data => {

          if (data.result) {
            this.toastr.error('Email adddress already in use', 'Error');
            resolve("Email adddress already in use")
          } else {
            // this.toastr.success('Email address is valid', 'Success');
            resolve(null)
          }
        });

      })
    return promise
  }

  ngOnInit() {
  }

}

