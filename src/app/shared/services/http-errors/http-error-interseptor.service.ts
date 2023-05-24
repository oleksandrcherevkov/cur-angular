import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { HandleErrorService } from './http-error-handler.service';
import { Observable, skipWhile, tap, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ServerErrorsInterceptor implements HttpInterceptor {
  constructor(private error: HandleErrorService) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          this.error.handleError(err);
        }
        return throwError(err);
      }),
    );
  }
}
