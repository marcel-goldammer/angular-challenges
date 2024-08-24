import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, of } from 'rxjs';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error) => {
      console.error(error);
      return of();
    }),
  );
};
