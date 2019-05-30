import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NetService } from './net.service';
import { TimingService } from './timing.service';

export const HTTP_INTERCEPTOR = [
  {provide: HTTP_INTERCEPTORS, useClass: TimingService, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: NetService, multi: true}
];
