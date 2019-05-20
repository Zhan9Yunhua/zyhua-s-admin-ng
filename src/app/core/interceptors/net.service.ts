import { Injectable, Inject } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpResponse,
  HttpUserEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mergeMap, catchError, switchMap, map } from 'rxjs/operators';
import { APP_CONFIG, AppConfig } from '@app/config/app.config';


@Injectable({
  providedIn: 'root',
})
export class NetService implements HttpInterceptor {
  private _api: string;

  constructor(@Inject(APP_CONFIG) private _config: AppConfig) {
    this._api = _config.api;
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<| HttpSentEvent
    | HttpHeaderResponse
    | HttpProgressEvent
    | HttpResponse<any>
    | HttpUserEvent<any>> {
    let url = req.url;
    if (!url.startsWith('https://') && !url.startsWith('http://')) {
      url = this._api + url;
    }

    const newReq = req.clone({
      url,
    });
    return next.handle(newReq).pipe(
      mergeMap((event: any) => {
        if (event instanceof HttpResponse && event.status === 200) {
          return of(event);
        }

        return of(event);
      }),
      catchError((err: HttpErrorResponse) => of(err)),
    );
  }
}
