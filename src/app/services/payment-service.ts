import { Service } from '@angular/core';
import type { PaymentPayload } from '../payment-form/payment-form.models';

@Service()
export class PaymentService {
  pay(payload: PaymentPayload): Promise<void> {
    console.log(payload);
    return new Promise((resolve) => setTimeout(resolve, 3000));
  }
}
