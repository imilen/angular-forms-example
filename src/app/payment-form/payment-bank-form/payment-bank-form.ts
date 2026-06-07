import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { FieldTree } from '@angular/forms/signals';
import { FormField } from '@angular/forms/signals';
import { BankFields } from '../payment-form.models';
import { fieldValidation } from '../payment-form.utils';

@Component({
  selector: 'app-payment-bank-form',
  imports: [FormField],
  templateUrl: './payment-bank-form.html',
  styleUrl: './payment-bank-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentBankForm {
  bankForm = input.required<FieldTree<BankFields>>();
  protected readonly validation = fieldValidation;
}
