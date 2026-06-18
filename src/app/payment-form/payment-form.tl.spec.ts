import { ComponentFixture } from '@angular/core/testing';
import { render } from '@testing-library/angular';
import { PaymentForm } from './payment-form';

describe('PaymentForm (Testing Library)', () => {
  let fixture: ComponentFixture<PaymentForm>;
  let component: PaymentForm;

  beforeEach(async () => {
    const result = await render(PaymentForm);

    fixture = result.fixture;
    component = fixture.componentInstance;

    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
