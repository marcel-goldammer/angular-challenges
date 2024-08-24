import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize, of } from 'rxjs';
import { LoadingStore } from './loading.store';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingStore = inject(LoadingStore);
  loadingStore.start();
  return next(req).pipe(
    finalize(() => loadingStore.stop()),
    catchError((error) => {
      console.error(error);
      loadingStore.stop();
      return of();
    }),
  );
};
