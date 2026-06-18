import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentService } from '../services/payment-service';
import { PaymentForm } from './payment-form';

class MockPaymentService {
  pay(): Promise<void> {
    return Promise.resolve();
  }
}

describe('PaymentForm', () => {
  let fixture: ComponentFixture<PaymentForm>;
  let component: PaymentForm;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentForm],
      providers: [{ provide: PaymentService, useClass: MockPaymentService }],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentForm);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
