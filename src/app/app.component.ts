import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { NavigationError, Router } from '@angular/router';
import { AlertsService } from './services/alerts/alerts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private _subs = [] as Subscription[];

  constructor(
    private readonly router: Router,
    private readonly _alertService: AlertsService
  ) {}

  ngOnInit(): void {
    const routerSub = this.router.events.subscribe((e) => {
      e instanceof NavigationError && this._alertService.setErrorAlert(e.error);
    });

    this._subs.push(routerSub);
  }
}
