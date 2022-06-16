import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadService {
  public showLoading = false;

  constructor() {}

  public setShowLoading(status: boolean) {
    this.showLoading = status;
  }
}
