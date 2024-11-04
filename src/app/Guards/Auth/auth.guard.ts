import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../Services/Auth/auth.service';
import { UsersService } from '../../Services/Users/users.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const usersService = inject(UsersService);
  const router = inject(Router);

  return new Observable<boolean>((observer) => {
    usersService.getUserInfo().pipe(
      map(userInfo => {
        if (userInfo && userInfo.name) {
          // Si l'utilisateur est connecté, permettre l'accès
          observer.next(true);
        } else {
          // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
          router.navigate(['/auth']);
          observer.next(false);
        }
      }),
      catchError((error) => {
        // En cas d'erreur, rediriger vers la page de connexion
        router.navigate(['/auth']);
        observer.next(false);
        return [];
      })
    ).subscribe();
  });
};
