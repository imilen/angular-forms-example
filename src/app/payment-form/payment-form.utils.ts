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
  return state.invalid() && (state.dirty() || state.touched());
}

function findErrors(field: StringFieldTree | undefined, kind: string) {
  if (typeof field !== 'function') {
    return undefined;
  }

  const state = field();
  return state.errorSummary().find((e) => e.kind === kind);
}

function findError(field: StringFieldTree | undefined) {
  if (typeof field !== 'function') {
    return undefined;
  }

  const state = field();

  if (state.invalid()) {
    const e = state.errorSummary()[0];

    if (e.kind == 'parse') {
      return { kind: 'parse', message: 'Is not valid' };
    }

    return e;
  }

  return null;
}

export const fieldValidation = {
  isFieldSuccess,
  isFieldError,
  findErrors,
  findError,
};
