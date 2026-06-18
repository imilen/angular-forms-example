import { Injector, inputBinding, runInInjectionContext, signal } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { form, type FieldTree } from '@angular/forms/signals';
import { render } from '@testing-library/angular';
import { beforeEach, describe, expect, it } from 'vitest';
import { PAYMENT } from '../payment-form.constants';
import type { CardFields } from '../payment-form.models';
import { PaymentCardForm } from './payment-card-form';
import { CART } from './payment-card-form.constants';

describe('PaymentCardForm (Testing Library)', () => {
  let fixture: ComponentFixture<PaymentCardForm>;
  let component: PaymentCardForm;
  let cardForm: FieldTree<CardFields>;

  beforeEach(async () => {
    const cardModel = signal(PAYMENT.createInitialData().card);

    const result = await render(PaymentCardForm, {
      bindings: [inputBinding('cardForm', () => cardForm)],
      configureTestBed: (testBed) => {
        const injector = testBed.inject(Injector);
        cardForm = runInInjectionContext(injector, () => form(cardModel, CART.SCHEMA));
      },
    });

    fixture = result.fixture;
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
