import {Injectable} from '@angular/core';
import {APIService} from '../apiservice/api.service';
import {Base64} from 'js-base64';
import {CookieService} from '../cookieservice/cookie.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private readonly APIService: APIService, private readonly cookieService: CookieService) {
  }

  isIngelogd(): boolean {
    return false;
  }

  async login(gebruikersnaam: string, wachtwoord: string, token?: string): Promise<void> {
    //todo fix
    /*
        const headers = new Headers();
        const base64encoded = Base64.encode(`${gebruikersnaam}:${wachtwoord}`);
        headers.append('Authorization', `Basic ${base64encoded}`);

        const response = await this.APIService.get('Login/Login', headers);
        console.log(response);
        console.log('token', token);
        //todo zet token van api
        // postman geeft voorbeeld in code gen :)
        this.cookieService.setToken('mocktoken', '.gezc.org');

     */

    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Basic cmljaGFyZGo6am9ua2Vy');
    // myHeaders.append('Cookie', 'PHPSESSID=774d87e107e4bfe269d33ef5e6861167');


    await fetch('https://development.gezc.org/Login/Login', {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    });
  }
}
