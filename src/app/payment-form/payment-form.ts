import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  applyWhen,
  form,
  maxLength,
  minLength,
  required,
  schema,
  submit,
  validate,
} from '@angular/forms/signals';
import dayjs from 'dayjs';
import { PaymentService } from '../services/payment-service';
import { PaymentBankForm } from './payment-bank-form/payment-bank-form';
import { PaymentCardForm } from './payment-card-form/payment-card-form';
import { CART } from './payment-card-form/payment-card-form.constants';
import { PAYMENT } from './payment-form.constants';
import {
  BankFields,
  CardFields,
  PaymentFormModel,
  PaymentMethodEnum,
  PaymentPayload,
} from './payment-form.models';

@Component({
  selector: 'app-payment-form',
  imports: [JsonPipe, PaymentBankForm, PaymentCardForm],
  templateUrl: './payment-form.html',
  styleUrl: './payment-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  private readonly CARD_SCHEMA = schema<CardFields>((s) => {
    required(s.cHolder, { ...CART.HOLDER_RULES[0] });
    required(s.cNumber, { ...CART.NUMBER_RULES[0] });
    validate(s.cExpirationDate, ({ value }) => {
      const v = value().trim();
      const day = dayjs(v, 'YYYY-MM-DD');
      if (!v) return CART.EXPIRATION_DATE_RULES[0];
      if (v === '') return CART.EXPIRATION_DATE_RULES[1];
      if (!day.isValid()) return CART.EXPIRATION_DATE_RULES[2];
      if (!day.isAfter(dayjs('1950-01-01', 'YYYY-MM-DD'))) return CART.EXPIRATION_DATE_RULES[3];
      return null;
    });
    required(s.cCvc, { ...CART.CVC_RULES[0] });
    minLength(s.cCvc, 3, { message: CART.CVC_RULES[1].message });
    maxLength(s.cCvc, 3, { message: CART.CVC_RULES[1].message });
    validate(s.cCvc, ({ value }) => {
      const v = value().trim();
      if (!/^.{3}$/.test(v)) return CART.CVC_RULES[1];
      return null;
    });
    validate(s.cCvc, ({ value }) => {
      const v = value().trim();
      if (!/^\d+$/.test(v)) return CART.CVC_RULES[2];
      return null;
    });
    validate(s.cCvc, ({ value }) => {
      const v = value().trim();
      if (!/^[1-9]/.test(v)) return CART.CVC_RULES[3];
      return null;
    });
  });

  private readonly BANK_SCHEMA = schema<BankFields>((s) => {
    required(s.bCountry, { message: 'Required' });
    required(s.bAddress, { message: 'Required' });
    required(s.bPostCode, { message: 'Required' });
    required(s.bCity, { message: 'Required' });
    required(s.bName, { message: 'Required' });
  });

  protected readonly form = form(this.paymentModel, (schema) => {
    applyWhen(
      schema.card,
      ({ valueOf }) => valueOf(schema.method) === this.$.paymentMethod.card,
      this.CARD_SCHEMA,
    );
    applyWhen(
      schema.bank,
      ({ valueOf }) => valueOf(schema.method) === this.$.paymentMethod.bank,
      this.BANK_SCHEMA,
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
