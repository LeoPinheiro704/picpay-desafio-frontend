import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TransactionPayloadRequest, TransactionPayloadResponse } from '../../shared/models/transaction-payload.model';

@Injectable({providedIn: 'root'})
export class TransactionPayloadService {

  constructor(
    protected readonly httpClient: HttpClient,
  ) { }

  public payload(request: TransactionPayloadRequest): Observable<TransactionPayloadResponse> {
    return this.httpClient.post<TransactionPayloadResponse>('https://run.mocky.io/v3/533cd5d7-63d3-4488-bf8d-4bb8c751c989', request, { observe: 'response' })
      .pipe(map((response: HttpResponse<TransactionPayloadResponse>) => response.body));
  }
}