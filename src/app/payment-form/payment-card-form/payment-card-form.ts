import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { FieldTree } from '@angular/forms/signals';
import { FormField } from '@angular/forms/signals';
import { isFieldError, isFieldSuccess } from '../payment-form-field.utils';
import { CardModel } from '../payment-form.models';

@Component({
  selector: 'app-payment-card-form',
  imports: [FormField],
  templateUrl: './payment-card-form.html',
  styleUrl: './payment-card-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentCardForm {
  cardForm = input.required<FieldTree<CardModel>>();

  protected readonly validation = {
    success: isFieldSuccess,
    error: isFieldError,
  };
}
