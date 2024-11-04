import { CanActivateFn } from '@angular/router';

import { Router } from '@angular/router';
import { AuthService } from '../../Services/Auth/auth.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Récupération de l'utilisateur depuis le localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Vérification du rôle
  if (user && user.roles && user.roles.includes('admin')) {
    return true;
  }

  // Redirection si l'utilisateur n'est pas admin
  router.navigate(['/']);
  return false;
};
