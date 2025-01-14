import {Component} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {LoginService} from '../../services/apiservice/login.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})

export class AppComponent {
  isIngelogd:boolean = this.loginService.isIngelogd();

  constructor(private readonly router: Router, private readonly loginService: LoginService) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {

        this.navigeerNaarLogin();
      }
    });
  }



  private navigeerNaarLogin() {
    this.isIngelogd = this.loginService.isIngelogd();

    if (!this.isIngelogd) {
      this.router.navigate(['login']).then();
    }
  }
}
