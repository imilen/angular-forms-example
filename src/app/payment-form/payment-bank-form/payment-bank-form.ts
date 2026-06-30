import { Component, input } from '@angular/core';
import type { FieldTree } from '@angular/forms/signals';
import { InputWrapper } from '../input-wrapper/input-wrapper';
import { BankFields } from '../payment-form.models';
import { BANK } from './payment-bank-form.constants';

@Component({
  selector: 'app-payment-bank-form',
  imports: [InputWrapper],
  templateUrl: './payment-bank-form.html',
  styleUrl: './payment-bank-form.css',
})
export class PaymentBankForm {
  bankForm = input.required<FieldTree<BankFields>>();
  protected readonly bank = BANK;
}
