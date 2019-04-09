import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Quote } from '../domain/quote.model';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  constructor(
    private http: HttpClient,
    @Inject('BASE_CONFIG') private config
    ) { }

  getQuote(): Observable<Quote> {
    const url = `${this.config.uri}/quotes/${Math.floor(Math.random()*10)}`;
    return this.http.get(url)
      .pipe(map(res => res as Quote))
  }
}
