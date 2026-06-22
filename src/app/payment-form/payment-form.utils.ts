import type { FieldTree } from '@angular/forms/signals';

type StringFieldTree = FieldTree<string, string>;

function isFieldSuccess(field: StringFieldTree): boolean {
  const state = field();
  return state.valid() && (state.dirty() || state.touched());
}

function isFieldError(field: StringFieldTree): boolean {
  const state = field();
  return state.invalid() && (state.dirty() || state.touched());
}

function findErrors(field: StringFieldTree, kind: string) {
  return field()
    .errorSummary()
    .find((e) => e.kind === kind);
}

function findError(field: StringFieldTree) {
  const state = field();

  if (!state.invalid()) {
    return null;
  }

  const error = state.errorSummary()[0];
  return error.kind === 'parse' ? { kind: 'parse', message: 'Is not valid' } : error;
}

export const fieldValidation = {
  isFieldSuccess,
  isFieldError,
  findErrors,
  findError,
};
