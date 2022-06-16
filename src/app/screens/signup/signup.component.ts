import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { SignupModel } from 'src/app/models/auth.model';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public error = '' as string;

  public signupForm = this._fb.group({
    name: ['', [Validators.required, Validators.minLength(6)]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _authService: AuthService,
    private readonly _alertService: AlertsService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {}

  public get name() {
    return this.signupForm.get('name');
  }

  public get phone() {
    return this.signupForm.get('phone');
  }

  public get email() {
    return this.signupForm.get('email');
  }

  public get password() {
    return this.signupForm.get('password');
  }

  onSubmit() {
    this._authService.signup(
      this.signupForm.value as SignupModel,
      (data) => {
        this.router.navigate(['/home']);
        this._alertService.setSuccessAlert(`Hi, ${data.name}`);
      },
      (err) => (this.error = err)
    );
  }
}
