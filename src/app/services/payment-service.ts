import { Injectable } from '@angular/core';
import type { PaymentFormModel } from '../payment-form/payment-form.models';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  pay(payload: PaymentFormModel): Promise<void> {
    console.log(payload);
    return new Promise((resolve) => setTimeout(resolve, 3000));
  }
}
