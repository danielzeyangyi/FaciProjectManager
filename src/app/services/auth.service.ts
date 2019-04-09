import { Inject, Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from '../domain';
import { map, switchMap } from 'rxjs/operators';
import { Auth } from '../domain/auth.model';


@Injectable()
export class AuthService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  private token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
    '.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9' +
    '.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';


  constructor(
    private http: HttpClient,
    @Inject('BASE_CONFIG') private config: { uri: string }
  ) {}

  // register
  register(user: User): Observable<Auth> {
    const params = new HttpParams().set('email', user.email);
    const uri = `${this.config.uri}/users`;
    return this.http.get(uri, { params }).pipe(
      switchMap(res => {
        if ((<User[]>res).length > 0) {
          return throwError('user existed');
        }
        return this.http
          .post(uri, JSON.stringify(user), { headers: this.headers })
          .pipe(map(r => ({ token: this.token, user: <User>r })));
      })
    );
  }

// logIn
  login(email: string, password: string): Observable<Auth> {
    const uri = `${this.config.uri}/users`;
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);
    return this.http.get(uri, { params }).pipe(
      map(res => {
        const users = <User[]>res;
        if (users.length === 0) {
          throw new Error('Username or password incorrect');
        }
        return {
          token: this.token,
          user: users[0]
        };
      })
    );
  }
}
