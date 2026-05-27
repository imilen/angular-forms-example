import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import type { FieldTree } from '@angular/forms/signals';
import {
  applyWhenValue,
  form,
  maxLength,
  minLength,
  required,
  schema,
  submit,
  validate,
} from '@angular/forms/signals';
import { PaymentService } from '../services/payment-service';
import { PaymentBankForm } from './payment-bank-form/payment-bank-form';
import { PaymentCardForm } from './payment-card-form/payment-card-form';
import { CART } from './payment-card-form/payment-card-form.constants';
import { PAYMENT } from './payment-form.constants';
import { BankModel, CardModel, PaymentFormModel, PaymentMethodEnum } from './payment-form.models';

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

  protected readonly paymentModel = signal<PaymentFormModel>(PAYMENT.INITIAL_CARD_DATA);

  private readonly CARD_SCHEMA = schema<CardModel>((s) => {
    required(s.cHolder, { message: 'Required' });
    required(s.cNumber, { message: 'Required' });
    required(s.cExpirationDate, { message: 'Required' });
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

  private readonly BANK_SCHEMA = schema<BankModel>((s) => {
    required(s.bCountry, { message: 'Required' });
    required(s.bAddress, { message: 'Required' });
    required(s.bPostCode, { message: 'Required' });
    required(s.bCity, { message: 'Required' });
    required(s.bName, { message: 'Required' });
  });

  protected readonly form = form(this.paymentModel, (schema) => {
    applyWhenValue(
      schema,
      (x): x is CardModel => x.method === this.$.paymentMethod.card,
      this.CARD_SCHEMA,
    );
    applyWhenValue(
      schema,
      (x): x is BankModel => x.method === this.$.paymentMethod.bank,
      this.BANK_SCHEMA,
    );
  });

  protected get cardForm(): FieldTree<CardModel> {
    return this.form as FieldTree<CardModel>;
  }

  protected get bankForm(): FieldTree<BankModel> {
    return this.form as FieldTree<BankModel>;
  }

  protected onSubmit(event: Event): void {
    event.preventDefault();

    submit(this.form, {
      action: async (f) => {
        const value = f().value();
        try {
          await this.payment.pay(value);

          f().reset(
            value.method === PaymentMethodEnum.card
              ? PAYMENT.INITIAL_CARD_DATA
              : PAYMENT.INITIAL_BANK_DATA,
          );
        } catch {}
      },
    });
  }

  protected onPaymentMethodChange(method: PaymentMethodEnum): void {
    if (this.paymentModel().method === method) {
      return;
    }

    this.paymentModel.set(
      method === PaymentMethodEnum.card ? PAYMENT.INITIAL_CARD_DATA : PAYMENT.INITIAL_BANK_DATA,
    );
  }
}
