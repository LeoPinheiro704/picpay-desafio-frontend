import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatSnackBarModule } from '@angular/material';

import { CurrencyMaskModule } from 'ng2-currency-mask';

import { TransactionPayloadService } from '../../../core/services/transaction-payload.service';
import { User } from '../../../shared/models/user.model';
import { PaymentDialogComponent } from './payment-dialog.component';
import { of } from 'rxjs';
import { TransactionPayloadResponse } from '../../../shared/models/transaction-payload.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const userMock: User = {
  id: 0,
  img: 'https://teste.com.br/img1',
  name: 'teste',
  username: '@teste'
};

const payloadMock: TransactionPayloadResponse = {
  success: true,
  status: 'success'
};

const payloadErrorMock: TransactionPayloadResponse = {
  success: false,
  status: 'error'
};

const cards = [
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

describe('PaymentDialogComponent', () => {
  let component: PaymentDialogComponent;
  let fixture: ComponentFixture<PaymentDialogComponent>;
  let transactionPayloadService: jasmine.SpyObj<TransactionPayloadService>;
  let matDialogRef: jasmine.SpyObj<MatDialogRef<PaymentDialogComponent>>;
  let matSnackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        CurrencyMaskModule,
        MatSnackBarModule,
        BrowserAnimationsModule
      ],
      declarations: [ PaymentDialogComponent ],
      providers: [
        {
          provide: TransactionPayloadService,
          useValue: jasmine.createSpyObj<TransactionPayloadService>([
            'payload',
          ]),
        },
        {
          provide: MatDialogRef,
          useValue: jasmine.createSpyObj<MatDialogRef<PaymentDialogComponent>>([
            'close',
          ]),
        },
        {
          provide: MatSnackBar,
          useValue: jasmine.createSpyObj<MatSnackBar>([
            'open',
          ]),
        },
        {
          provide : MAT_DIALOG_DATA,
          useValue : userMock
        },
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentDialogComponent);
    component = fixture.componentInstance;

    transactionPayloadService = TestBed.get(TransactionPayloadService);
    matDialogRef = TestBed.get(MatDialogRef);
    matSnackBar = TestBed.get(MatSnackBar);

    component.cards = cards;
    transactionPayloadService.payload.and.returnValue(of(payloadMock));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test payment function', () => {
    component.userForm.controls.value.setValue(15.68);
    component.userForm.controls.card.setValue(cards[0]);
    component.payment();
    expect(matSnackBar.open)
      .toHaveBeenCalledWith('O pagamento foi concluído com sucesso.', 'Fechar', {duration: 5000});

    transactionPayloadService.payload.and.returnValue(of(payloadErrorMock));
    component.payment();
    expect(matSnackBar.open)
      .toHaveBeenCalledWith('O pagamento não foi concluído com sucesso.', 'Fechar', {duration: 5000});
  });
});
