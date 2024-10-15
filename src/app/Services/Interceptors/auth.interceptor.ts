import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../Storage/storage.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService);
  
  // Récupérer le token à partir de StorageService
  const token = storageService.getLocalItem('auth_token');

  // Si pas de token, passer à la requête suivante sans modification
  if (!token) {
    return next(req);
  }

  // Cloner la requête en y ajoutant l'en-tête Authorization avec le Bearer token
  const clonedReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(clonedReq);
};