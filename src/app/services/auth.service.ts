import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL = 'https://zulassungsdienst-express.de/api';
  // API_URL = 'http://localhost:10270/api';
  TOKEN_KEY = 'auth_token';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private router: Router) {
  }

  get token() {
    if (this.jwtHelper.isTokenExpired(localStorage.getItem(this.TOKEN_KEY))) {
      this.logout();
      return;
    }
    return localStorage.getItem(this.TOKEN_KEY);
  }

  get isAuthenticated() {
    if (this.jwtHelper.isTokenExpired(localStorage.getItem(this.TOKEN_KEY))) {
      this.logout();
      return;
    }
    return localStorage.getItem(this.TOKEN_KEY);
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    // this.router.navigateByUrl('/');
  }

  login(username: string, pass: string) {
    const headers = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Cache-Control': 'no-cache'})
    };
    const data = {
      username: username,
      password: pass
    };
    this.http.post(this.API_URL + '/login', data, headers).subscribe(
      (res: any) => {
        localStorage.setItem(this.TOKEN_KEY, res.token);
        // console.log(res);

        //this.router.navigateByUrl('/invoice');
      }
    );
  }

  getAccount() {
    return this.http.get(this.API_URL + '/account');
  }


  getValue(): Observable<object> {
    return this.http.get(this.API_URL + '/value');
  }

}
