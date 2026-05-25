import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { FieldTree } from '@angular/forms/signals';
import { FormField } from '@angular/forms/signals';
import { findError, isFieldError, isFieldSuccess } from '../payment-form-field.utils';
import { BankModel } from '../payment-form.models';

@Component({
  selector: 'app-payment-bank-form',
  imports: [FormField],
  templateUrl: './payment-bank-form.html',
  styleUrl: './payment-bank-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentBankForm {
  bankForm = input.required<FieldTree<BankModel>>();

  protected readonly validation = {
    success: isFieldSuccess,
    error: isFieldError,
    findError: findError,
  };
}
