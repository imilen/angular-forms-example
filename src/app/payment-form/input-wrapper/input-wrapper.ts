import { Component, computed, input } from '@angular/core';
import type { FieldTree, ValidationError } from '@angular/forms/signals';
import { FormField } from '@angular/forms/signals';
import { fieldValidation } from '../payment-form.utils';

type WrapperField = FieldTree<string | Date, string>;

@Component({
  selector: 'app-input-wrapper',
  imports: [FormField],
  templateUrl: './input-wrapper.html',
  styleUrl: './input-wrapper.css',
})
export class InputWrapper {
  field = input.required<WrapperField>();
  type = input<string>('text');
  placeholder = input<string>('');
  autocomplete = input<string>('off');
  inputmode = input<string | null>(null);
  touchedOnly = input<boolean>(false);
  rules = input<readonly ValidationError[] | null>(null);

  protected readonly validation = fieldValidation;

  protected readonly interacted = computed(() => {
    const state = this.field()();
    return this.touchedOnly() ? state.touched() : state.dirty() || state.touched();
  });

  protected readonly showSingleError = computed(
    () => this.interacted() && this.field()().invalid(),
  );

  protected readonly showRules = computed(() => !this.interacted());
}
