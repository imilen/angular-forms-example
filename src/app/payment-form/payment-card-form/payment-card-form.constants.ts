const HOLDER_RULES = [{ kind: 'required', message: 'Required' }] as const;
const NUMBER_RULES = HOLDER_RULES;
const EXPIRATION_DATE_RULES = HOLDER_RULES;

const CVC_RULES = [
  { kind: 'required', message: 'Required' },
  { kind: 'length', message: 'Must be exactly 3 digits' },
  { kind: 'digits', message: 'Only digits are allowed' },
  { kind: 'startsWithZero', message: 'First digit cannot be zero' },
] as const;

export const CART = { HOLDER_RULES, NUMBER_RULES, EXPIRATION_DATE_RULES, CVC_RULES };
