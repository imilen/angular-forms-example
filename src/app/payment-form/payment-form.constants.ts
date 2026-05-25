import { BankModel, CardModel, PaymentMethodEnum } from './payment-form.models';

const initialCardData: CardModel = {
  method: PaymentMethodEnum.card,
  cHolder: '',
  cNumber: '',
  cExpirationDate: '',
  cCvc: '',
};

const initialBankData: BankModel = {
  method: PaymentMethodEnum.bank,
  bCountry: '',
  bAddress: '',
  bPostCode: '',
  bCity: '',
  bName: '',
};

export const paymentForm = { initialCardData, initialBankData };
