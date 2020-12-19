import { Component } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'Прокат автомобилей';

  constructor(
    public authService: AuthService,
    private router: Router,
    ) { }

  signOut() {
    this.authService.signOut();
    this.router.navigateByUrl('/');
  }
}
