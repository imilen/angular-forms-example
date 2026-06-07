import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { FieldTree } from '@angular/forms/signals';
import { FormField } from '@angular/forms/signals';
import { CardFields } from '../payment-form.models';
import { fieldValidation } from '../payment-form.utils';
import { CART } from './payment-card-form.constants';

@Component({
  selector: 'app-payment-card-form',
  imports: [FormField],
  templateUrl: './payment-card-form.html',
  styleUrl: './payment-card-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentCardForm {
  cardForm = input.required<FieldTree<CardFields>>();
  protected readonly cart = CART;
  protected readonly validation = fieldValidation;
}
