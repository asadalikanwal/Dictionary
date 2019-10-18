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
import { UserService } from '../user.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  myForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, public userService: UserService) {
    this.myForm = formBuilder.group({
      'email': ['', [
        Validators.required,
        Validators.email
        ],
        [this.asyncEmailValidator.bind(this)]
      ],
      'password': ['', [
        Validators.required
      ]]
    })

  }

  onSubmit() {
    this.userService.saveUser(this.myForm.value).subscribe(data=>console.log(data));
  }

  getUserAuth(){
    return this.http.get('http://localhost:3000/users/aakanwal@mum.edu');
  }

  asyncEmailValidator(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>(
      async (resolve, reject) => {
         this.userService.validateUserByEmail(control.value).subscribe(data => {
           console.log("Hurray it works", data);
           if(data.result) {
            resolve("Duplicate email address")
           } else {
             resolve(null)
           }
         });
      })
    return promise
  }

  ngOnInit() {
  }

}

