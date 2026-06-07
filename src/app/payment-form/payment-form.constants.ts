import { BankFields, CardFields, PaymentFormModel, PaymentMethodEnum } from './payment-form.models';

function createInitialCardFields(): CardFields {
  return {
    cHolder: '',
    cNumber: '',
    cExpirationDate: '',
    cCvc: '',
  };
}

function createInitialBankFields(): BankFields {
  return {
    bCountry: '',
    bAddress: '',
    bPostCode: '',
    bCity: '',
    bName: '',
  };
}

function createInitialData(method = PaymentMethodEnum.card): PaymentFormModel {
  return {
    method,
    card: createInitialCardFields(),
    bank: createInitialBankFields(),
  };
}

export const PAYMENT = { createInitialData };
