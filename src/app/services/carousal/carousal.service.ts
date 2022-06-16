import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API } from 'src/app/enums';
import { CarousalDataModal } from 'src/app/models/carousal.modal';

@Injectable({
  providedIn: 'root',
})
export class CarousalService {
  public CAROUSAL_API = `${API.BASE}/products/top`;
  public carousalData = new BehaviorSubject([] as CarousalDataModal[]);

  constructor(private readonly _http: HttpClient) {}

  getCarousal() {
    const data = this._http.get<CarousalDataModal[]>(this.CAROUSAL_API);
    data.forEach((d) => this.carousalData.next(d));
    return data;
  }
}
