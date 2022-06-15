import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserLogin } from '../Models/userLogin';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt'; // api pour travailler avec JWT
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { getLocaleFirstDayOfWeek } from '@angular/common';

const jwt = new JwtHelperService();

class DecodedToken {
  exp?: number;
  Username?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _apiUrlOwner: string = 'http://localhost:5000/api/login';
  private decodedToken? = new DecodedToken();
  public userName?: string;
  constructor(private _http: HttpClient) {}

  login(userLogin: UserLogin): Observable<UserLogin> {
    let response = this._http.post<UserLogin>(this._apiUrlOwner, {
      userEmail: userLogin.email,
      password: userLogin.passwd,
    });

    response.forEach((e) => {
      this.userName = e.firstName;

      if (e.token) {
        this.saveToken(e.token);
      }
    });

    return response;
  }

  //sauvegarde le token en session
  private saveToken(token: any): any {
    this.decodedToken = jwt.decodeToken(token);
    localStorage.setItem('auth_tkn', token); // le token JWT
    localStorage.setItem('auth_meta', JSON.stringify(this.decodedToken)); // info contenant le username, l'email, la date d'expiration, l'id, etc
    return token;
  }

  public logout(): void {
    Swal.fire({
      title: 'Déconnection',
      text: 'À la prochaine...',
      imageUrl:
        'https://cache.desktopnexus.com/thumbseg/2406/2406463-bigthumbnail.jpg',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
    });
    localStorage.removeItem('auth_tkn');
    localStorage.removeItem('auth_meta');

    this.decodedToken = new DecodedToken();
  }

  public isAuthenticated(): boolean {
    if (localStorage.getItem('auth_tkn') !== null) {
      return true;
    }
    return false;
  }

  public getUserName(): string | void {
    if (this.decodedToken?.Username !== null) {
      return this.decodedToken?.Username;
    }
  }
}
