import { CanActivateFn } from '@angular/router';

import { Router } from '@angular/router';
import { AuthService } from '../../Services/Auth/auth.service';
import { inject } from '@angular/core';


export const fournisseurGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (user && user.roles && user.roles.includes('fournisseur')) {
    return true;
  }

  router.navigate(['/']);
  return false;
};
