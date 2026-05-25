import { BankModel, CardModel, PaymentMethodEnum } from './payment-form.models';

const INITIAL_CARD_DATA: CardModel = {
  method: PaymentMethodEnum.card,
  cHolder: '',
  cNumber: '',
  cExpirationDate: '',
  cCvc: '',
};

const INITIAL_BANK_DATA: BankModel = {
  method: PaymentMethodEnum.bank,
  bCountry: '',
  bAddress: '',
  bPostCode: '',
  bCity: '',
  bName: '',
};

export const PAYMENT = { INITIAL_CARD_DATA, INITIAL_BANK_DATA };
