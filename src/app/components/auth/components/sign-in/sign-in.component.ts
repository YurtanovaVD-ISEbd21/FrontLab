import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})

export class SignInComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      password: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

  signIn() {
    const val = this.form.value;

    if (val.password && val.name) {
      this.authService.signIn(val.name, val.password)
        .subscribe(
          data => {
            if (data.is_staff) {
              this.router.navigateByUrl('/admin');
            }
            else {
              this.router.navigateByUrl('/home');
            }
          }
        );
    }
  }
}