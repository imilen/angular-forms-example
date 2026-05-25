import type { FieldTree } from '@angular/forms/signals';

type StringFieldTree = FieldTree<string, string>;

export function isFieldSuccess(field: StringFieldTree | undefined): boolean {
  if (typeof field !== 'function') {
    return false;
  }

  const state = field();
  return state.valid() && (state.dirty() || state.touched());
}

export function isFieldError(field: StringFieldTree | undefined): boolean {
  if (typeof field !== 'function') {
    return false;
  }

  const state = field();
  return !state.valid() && (state.dirty() || state.touched());
}
