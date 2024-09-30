import { CanActivateFn } from '@angular/router';

export const roaGuard: CanActivateFn = (route, state) => {
  return true;
};
