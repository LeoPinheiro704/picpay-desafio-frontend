import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../../shared/models/user.model';

@Injectable({providedIn: 'root'})
export class UserService {

  constructor(
    protected readonly httpClient: HttpClient,
  ) { }

  public list(): Observable<User> {
    return this.httpClient.get<User>('https://www.mocky.io/v2/5d531c4f2e0000620081ddce', { observe: 'response' })
      .pipe(map((response: HttpResponse<User>) => response.body));
  }
}
