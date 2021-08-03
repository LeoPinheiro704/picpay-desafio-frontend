import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { User } from '../../shared/models/user.model';

@Injectable({providedIn: 'root'})
export class UserService {

  constructor(
    protected readonly httpClient: HttpClient,
  ) { }

  public list(): Observable<User> {
    return this.httpClient.get<User>('https://www.mocky.io/v2/5d531c4f2e0000620081ddce')
      .pipe(
        catchError((response: HttpErrorResponse) => throwError(response.error)),
      );
  }
}
