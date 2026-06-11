import {
  maxLength,
  minLength,
  required,
  schema,
  validate,
  ValidationError,
} from '@angular/forms/signals';
import dayjs from 'dayjs';
import { CardFields } from '../payment-form.models';

const HOLDER_RULES: ValidationError[] = [{ kind: 'required', message: 'Required' }];
const NUMBER_RULES: ValidationError[] = [{ kind: 'required', message: 'Required' }];
const EXPIRATION_DATE_RULES: ValidationError[] = [
  { kind: 'required', message: 'Required' },
  { kind: 'after', message: 'Must be аfter 1950-01-01' },
];
const CVC_RULES: ValidationError[] = [
  ...HOLDER_RULES,
  { kind: 'length', message: 'Must be exactly 3 digits' },
  { kind: 'digits', message: 'Only digits are allowed' },
  { kind: 'startsWithZero', message: 'First digit cannot be zero' },
];

const SCHEMA = schema<CardFields>((s) => {
  // holder
  required(s.cHolder, { ...HOLDER_RULES[0] });
  // number
  required(s.cNumber, { ...NUMBER_RULES[0] });
  // expirationDate
  required(s.cExpirationDate, { ...EXPIRATION_DATE_RULES[0] });
  validate(s.cExpirationDate, ({ value }) => {
    const v = value().trim();
    const day = dayjs(v, 'YYYY-MM-DD', true);
    if (!day.isAfter(dayjs('1950-01-01', 'YYYY-MM-DD'))) return EXPIRATION_DATE_RULES[1];
    return null;
  });
  // cvc
  required(s.cCvc, { ...CVC_RULES[0] });
  minLength(s.cCvc, 3, { message: CVC_RULES[1].message });
  maxLength(s.cCvc, 3, { message: CVC_RULES[1].message });
  validate(s.cCvc, ({ value }) => {
    const v = value().trim();
    if (!/^.{3}$/.test(v)) return CVC_RULES[1];
    return null;
  });
  validate(s.cCvc, ({ value }) => {
    const v = value().trim();
    if (!/^\d+$/.test(v)) return CVC_RULES[2];
    return null;
  });
  validate(s.cCvc, ({ value }) => {
    const v = value().trim();
    if (!/^[1-9]/.test(v)) return CVC_RULES[3];
    return null;
  });
});

export const CART = {
  HOLDER_RULES,
  NUMBER_RULES,
  EXPIRATION_DATE_RULES,
  CVC_RULES,
  SCHEMA,
};
