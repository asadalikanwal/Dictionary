import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import{AuthenticationService,UserService,NotificationService} from '@/services';
@Component({
  selector: 'app-register-component',
  template: `
  <h2>Register</h2>
  <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
      
      <div class="form-group">
          <label for="username">Username</label>
          <input type="text" formControlName="username" class="form-control" [ngClass]="{ 'is-invalid': submitted && f.username.errors }" />
          <div *ngIf="submitted && f.username.errors" class="invalid-feedback">
              <div *ngIf="f.username.errors.required">Username is required</div>
          </div>
      </div>
      <div class="form-group">
          <label for="password">Password</label>
          <input type="password" formControlName="password" class="form-control" [ngClass]="{ 'is-invalid': submitted && f.password.errors }" />
          <div *ngIf="submitted && f.password.errors" class="invalid-feedback">
              <div *ngIf="f.password.errors.required">Password is required</div>
              <div *ngIf="f.password.errors.minlength">Password must be at least 6 characters</div>
          </div>
      </div>
      <div class="form-group">
          <button [disabled]="loading" class="btn btn-primary">
              <span *ngIf="loading" class="spinner-border spinner-border-sm mr-1"></span>
              Register
          </button>
          <a routerLink="/login" class="btn btn-link">Cancel</a>
      </div>
  </form>
  `,
  styles: []
})
export class RegisterComponentComponent implements OnInit {
registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private notificationService: NotificationService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.notificationService.clear();

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.notificationService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.notificationService.error(error);
                    this.loading = false;
                });
    }
}


