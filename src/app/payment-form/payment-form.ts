import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { applyWhen, form, submit } from '@angular/forms/signals';
import { PaymentService } from '../services/payment-service';
import { PaymentBankForm } from './payment-bank-form/payment-bank-form';
import { BANK } from './payment-bank-form/payment-bank-form.constants';
import { PaymentCardForm } from './payment-card-form/payment-card-form';
import { CART } from './payment-card-form/payment-card-form.constants';
import { PAYMENT } from './payment-form.constants';
import { PaymentFormModel, PaymentMethodEnum, PaymentPayload } from './payment-form.models';

@Component({
  selector: 'app-payment-form',
  imports: [JsonPipe, PaymentBankForm, PaymentCardForm],
  templateUrl: './payment-form.html',
  styleUrl: './payment-form.css',
  host: {
    '[class.form]': 'true',
  },
})
export class PaymentForm {
  private readonly payment = inject(PaymentService);

  protected readonly $ = {
    paymentMethod: PaymentMethodEnum,
  };

  protected readonly paymentModel = signal<PaymentFormModel>(PAYMENT.createInitialData());
  private readonly cart = CART;
  private readonly bank = BANK;

  protected readonly form = form(this.paymentModel, (schema) => {
    applyWhen(
      schema.card,
      ({ valueOf }) => valueOf(schema.method) === this.$.paymentMethod.card,
      this.cart.SCHEMA,
    );
    applyWhen(
      schema.bank,
      ({ valueOf }) => valueOf(schema.method) === this.$.paymentMethod.bank,
      this.bank.SCHEMA,
    );
  });

  protected onSubmit(event: Event): void {
    event.preventDefault();

    submit(this.form, {
      action: async (f) => {
        const value = f().value();
        const payload = this.getPaymentPayload(value);

        try {
          await this.payment.pay(payload);

          f().reset(PAYMENT.createInitialData(value.method));
        } catch {}
      },
    });
  }

  protected onPaymentMethodChange(method: PaymentMethodEnum): void {
    if (this.paymentModel().method === method) {
      return;
    }

    this.paymentModel.set(PAYMENT.createInitialData(method));
  }

  private getPaymentPayload(value: PaymentFormModel): PaymentPayload {
    return value.method === PaymentMethodEnum.card
      ? { method: PaymentMethodEnum.card, ...value.card }
      : { method: PaymentMethodEnum.bank, ...value.bank };
  }
}
