import { CanActivateFn } from '@angular/router';

import { Router } from '@angular/router';
import { AuthService } from '../../Services/Auth/auth.service';
import { inject } from '@angular/core';


export const agriculteurGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (user && user.roles && user.roles.includes('agriculteur')) {
    return true;
  }

  router.navigate(['/']);
  return false;
};
