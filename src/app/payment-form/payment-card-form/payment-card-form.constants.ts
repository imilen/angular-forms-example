const HOLDER_RULES = [{ kind: 'required', message: 'Required' }];
const NUMBER_RULES = HOLDER_RULES;
const EXPIRATION_DATE_RULES = [
  ...HOLDER_RULES,
  { kind: 'parse', message: 'Required' },
  { kind: 'valid', message: 'Is not valid' },
  { kind: 'after', message: 'after 1950-01-01' },
];

const EXPIRATION_DATE_RULES_MAP = new Map(
  EXPIRATION_DATE_RULES.map(({ kind, message }) => [kind, message]),
);

const CVC_RULES = [
  ...HOLDER_RULES,
  { kind: 'length', message: 'Must be exactly 3 digits' },
  { kind: 'digits', message: 'Only digits are allowed' },
  { kind: 'startsWithZero', message: 'First digit cannot be zero' },
] as const;

export const CART = {
  HOLDER_RULES,
  NUMBER_RULES,
  EXPIRATION_DATE_RULES,
  EXPIRATION_DATE_RULES_MAP,
  CVC_RULES,
};
