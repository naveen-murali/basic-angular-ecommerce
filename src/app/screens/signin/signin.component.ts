import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  public error = '' as string;

  public signinForm = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private readonly _fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly _alertService: AlertsService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {}

  public get email() {
    return this.signinForm.get('email');
  }

  public get password() {
    return this.signinForm.get('password');
  }

  onSubmit() {
    this.authService.signin(
      this.signinForm.value,
      (data) => {
        this.router.navigate(['/home']);
        this._alertService.setSuccessAlert(`Hi, ${data.name}`);
      },
      (err) => (this.error = err)
    );
  }
}
