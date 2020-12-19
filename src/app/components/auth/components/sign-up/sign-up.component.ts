import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less']
})
export class SignUpComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

  signUp() {
    const val = this.form.value;

    if (val.email && val.password && val.name) {
      this.authService.signUp(val.name, val.email, val.password)
        .subscribe(
          () => {
            this.router.navigateByUrl('/auth/signin');
          }
        );
    }
  }
}