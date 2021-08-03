import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatButtonModule, MatDialog, MatFormFieldModule, MatInputModule, MatSelectModule, MatSnackBarModule } from '@angular/material';

import { of } from 'rxjs';

import { UserService } from '../../core/services/user.service';
import { User } from '../../shared/models/user.model';
import { UserComponent } from './user.component';
import { PaymentDialogComponent } from './payment/payment-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencyMaskModule } from 'ng2-currency-mask';

const userMock: User = {
  id: 0,
  img: 'https://teste.com.br/img1',
  name: 'teste',
  username: '@teste'
};

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let matDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatButtonModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        CurrencyMaskModule,
        MatSnackBarModule,
      ],
      declarations: [ UserComponent ],
      providers: [
        {
          provide: UserService,
          useValue: jasmine.createSpyObj<UserService>([
            'list',
          ]),
        },
        {
          provide: MatDialog,
          useValue: jasmine.createSpyObj<MatDialog>([
            'open',
          ]),
        },
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    userService = TestBed.get(UserService);
    matDialog = TestBed.get(MatDialog);

    userService.list.and.returnValue(of(userMock));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
