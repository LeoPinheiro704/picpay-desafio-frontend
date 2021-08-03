import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { TransactionPayloadService } from '../../../core/services/transaction-payload.service';
import { TransactionPayloadRequest, TransactionPayloadResponse } from '../../../shared/models/transaction-payload.model';
import { User } from 'src/app/shared/models/user.model';

export const CLOSE_MESSAGE = 'Fechar';
export const MESSAGE_DURATION = 5 * 1000;

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.scss']
})
export class PaymentDialogComponent implements OnInit {
  public user: User;
  public userForm: FormGroup = this.initialForm;

  public cards = [
    // valid card
    {
      card_number: '1111111111111111',
      cvv: 789,
      expiry_date: '01/18',
    },
    // invalid card
    {
      card_number: '4111111111111234',
      cvv: 123,
      expiry_date: '01/20',
    },
  ];

  private readonly destroy$ = new Subject<boolean>();

  constructor(
    private readonly dialogRef: MatDialogRef<PaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data: User,
    private readonly formBuilder: FormBuilder,
    private readonly transactionPayloadService: TransactionPayloadService,
    private readonly snackBar: MatSnackBar
  ) {}

  public ngOnInit(): void {
    this.user = this.data;
  }

  public payment(): void {
    const card = this.userForm.get('card').value;
    const request: TransactionPayloadRequest = {
      card_number: card.card_number,
      cvv: card.cvv,
      expiry_date: card.expiry_date,
      destination_user_id: this.user.id,
      value: this.userForm.get('value').value
    };

    this.transactionPayloadService.payload(request)
      .pipe(takeUntil(this.destroy$),)
      .subscribe((response: TransactionPayloadResponse) => {
        let message = '';
        response.success ? message = 'O pagamento foi concluído com sucesso.' : message = 'O pagamento não foi concluído com sucesso.';
        this.dialogRef.close();
        this.snackBar.open(message, CLOSE_MESSAGE, {duration: MESSAGE_DURATION});
      }, (error) => {
        console.log(error);
      }
    );
  }

  private get initialForm(): FormGroup {
    return this.userForm = this.formBuilder.group({
      value: ['', [Validators.required]],
      card: ['', [Validators.required]],
    });
  }

}
