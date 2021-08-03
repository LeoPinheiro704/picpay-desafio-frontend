import { TransactionPayloadService } from './../../core/services/transaction-payload.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from '../../shared/models/user.model';
import { MatDialog } from '@angular/material';
import { PaymentDialogComponent } from './payment/payment-dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  public users: User;

  private readonly destroy$ = new Subject<boolean>();

  constructor(
    private readonly userService: UserService,
    private readonly dialog: MatDialog,
  ) { }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public ngOnInit() {
    this.userService.list()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.users = response;
      }, (error) => {
        console.log(error);
      }
    );
  }

  public userPayment(user: User): void {
    this.dialog.open(PaymentDialogComponent, {
      data: user
    });
  }

}
