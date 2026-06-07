import type { FieldTree } from '@angular/forms/signals';

type StringFieldTree = FieldTree<string, string>;

function isFieldSuccess(field: StringFieldTree | undefined): boolean {
  if (typeof field !== 'function') {
    return false;
  }

  const state = field();
  return state.valid() && (state.dirty() || state.touched());
}

function isFieldError(field: StringFieldTree | undefined): boolean {
  if (typeof field !== 'function') {
    return false;
  }

  const state = field();
  return !state.valid() && (state.dirty() || state.touched());
}

function findError(field: StringFieldTree | undefined, kind: string) {
  if (typeof field !== 'function') {
    return undefined;
  }

  const state = field();
  return state.errorSummary().find((e) => e.kind === kind);
}

export const fieldValidation = {
  isFieldSuccess,
  isFieldError,
  findError,
};
