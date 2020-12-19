import { Component } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.less']
})
export class LandingComponent {

  constructor(
    public authService: AuthService,
    private router: Router,
    ) { }

  signOut() {
    this.authService.signOut();
    this.router.navigateByUrl('/');
  }

}
