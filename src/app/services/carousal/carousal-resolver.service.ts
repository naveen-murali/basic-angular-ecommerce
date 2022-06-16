import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { CarousalDataModal } from 'src/app/models/carousal.modal';
import { CarousalService } from './carousal.service';

@Injectable({
  providedIn: 'root',
})
export class CarousalResolverService
  implements Resolve<CarousalDataModal[] | never | boolean>
{
  constructor(private readonly _carousalService: CarousalService) {}

  resolve(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
    let length = this._carousalService.carousalData.value.length;

    const carousalResolve = this._carousalService
      .getCarousal()
      .pipe(
        catchError((err: HttpErrorResponse) =>
          throwError(() => err.error.message)
        )
      );

    if (length) return true;
    return carousalResolve;
  }
}
