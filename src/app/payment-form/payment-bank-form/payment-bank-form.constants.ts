import { required, schema } from '@angular/forms/signals';
import { BankFields } from '../payment-form.models';

const SCHEMA = schema<BankFields>((s) => {
  required(s.bCountry, { message: 'Required' });
  required(s.bAddress, { message: 'Required' });
  required(s.bPostCode, { message: 'Required' });
  required(s.bCity, { message: 'Required' });
  required(s.bName, { message: 'Required' });
});

export const BANK = {
  SCHEMA,
};
