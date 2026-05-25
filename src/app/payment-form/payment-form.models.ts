export interface CardFields {
  cHolder: string;
  cNumber: string;
  cExpirationDate: string;
  cCvc: string;
}

export interface BankFields {
  bCountry: string;
  bAddress: string;
  bPostCode: string;
  bCity: string;
  bName: string;
}

export enum PaymentMethodEnum {
  card = 'card',
  bank = 'bank',
}

export type PaymentMethodType = `${PaymentMethodEnum}`;

type PaymentVariant<M extends PaymentMethodEnum, T extends object> = {
  method: M;
} & T;

export type CardModel = PaymentVariant<PaymentMethodEnum.card, CardFields>;

export type BankModel = PaymentVariant<PaymentMethodEnum.bank, BankFields>;

export type PaymentFormModel = CardModel | BankModel;
