import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-oauth-success',
  templateUrl: './oauth-success.component.html',
  styleUrls: ['./oauth-success.component.less']
})
export class OauthSuccessComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit() {
    this.route.fragment.subscribe((fragment: string) => {
      var email = new URLSearchParams(fragment).get('email');
      this.authService.oAuth(email)
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
      
      // window.opener.storage.publicResultProcessing(response, data);
      // setTimeout(window.close, 50);
    })
  }

}
