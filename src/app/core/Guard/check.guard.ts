import { CanDeactivateFn } from '@angular/router';

export const checkGuard: CanDeactivateFn<unknown> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  alert('canDeactive Works!!!');
  return true;
};
