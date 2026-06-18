import { Injector, inputBinding, runInInjectionContext, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FieldTree, form, FormField } from '@angular/forms/signals';
import { PAYMENT } from '../payment-form.constants';
import type { CardFields } from '../payment-form.models';
import { PaymentCardForm } from './payment-card-form';
import { CART } from './payment-card-form.constants';
const cardModel = signal(PAYMENT.createInitialData().card);

describe('PaymentCardForm', () => {
  let fixture: ComponentFixture<PaymentCardForm>;
  let component: PaymentCardForm;
  let cardForm: FieldTree<CardFields>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentCardForm, FormField],
    }).compileComponents();

    const injector = TestBed.inject(Injector);
    cardForm = runInInjectionContext(injector, () => form(cardModel, CART.SCHEMA));

    fixture = TestBed.createComponent(PaymentCardForm, {
      bindings: [inputBinding('cardForm', signal(cardForm))],
    });

    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
