import { required, schema, ValidationError } from '@angular/forms/signals';
import { BankFields } from '../payment-form.models';

const COUNTRY_RULES: ValidationError[] = [{ kind: 'required', message: 'Required' }];
const ADDRESS_RULES: ValidationError[] = [{ kind: 'required', message: 'Required' }];
const POST_CODE_RULES: ValidationError[] = [{ kind: 'required', message: 'Required' }];
const CITY_RULES: ValidationError[] = [{ kind: 'required', message: 'Required' }];
const NAME_RULES: ValidationError[] = [{ kind: 'required', message: 'Required' }];

const SCHEMA = schema<BankFields>((s) => {
  required(s.bCountry, { ...COUNTRY_RULES[0] });
  required(s.bAddress, { ...ADDRESS_RULES[0] });
  required(s.bPostCode, { ...POST_CODE_RULES[0] });
  required(s.bCity, { ...CITY_RULES[0] });
  required(s.bName, { ...NAME_RULES[0] });
});

export const BANK = {
  COUNTRY_RULES,
  ADDRESS_RULES,
  POST_CODE_RULES,
  CITY_RULES,
  NAME_RULES,
  SCHEMA,
};
