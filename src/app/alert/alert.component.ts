import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Alert, AlertType } from './alert.model';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() id = 'default-alert';
  @Input() fade = true;

  alerts: Alert[] = [];
  alertSubscription: Subscription;
  routeSubscription: Subscription;

  constructor(private router: Router, private alertServce: AlertService) { }

  ngOnInit(): void {
    this.alertSubscription = this.alertServce.onAlert(this.id).subscribe(alert => {
      if (!alert.message) {
        this.alerts = this.alerts.filter(x => x.keepAfterRoutingChange);

        this.alerts.forEach(x => delete x.keepAfterRoutingChange);
        return;
      }

      this.alerts.push(alert);

      if (alert.autoClose) {
        setTimeout(() => this.removeAlert(alert), 3000)
      }
    })

    this.routeSubscription = this.router.events.subscribe(event => {
      if(event instanceof NavigationStart) {
        this.alertServce.clear(this.id)
      }
    })

  }

  ngOnDestroy() {
    this.alertSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  removeAlert(alert: Alert) {
    if (!this.alerts.includes(alert)) return;

    if (this.fade) {
      this.alerts.find(x => x === alert).fade = true;

      setTimeout(() => {
        this.alerts = this.alerts.filter(x => x !== alert)
      }, 250)
    } else {
      this.alerts = this.alerts.filter(x => x !== alert)
    }
  }

  cssClass(alert: Alert) {
    if (!alert) return;

    const classes = [];

    const alertTypeClass = {
      [AlertType.Success]: "bg-success",
      [AlertType.Error]: "bg-danger",
      [AlertType.Info]: "bg-info",
      [AlertType.Warning]: "bg-warning"
    };

    classes.push(alertTypeClass[alert.type]);

    if (alert.fade) {
      classes.push("fade");
    }

    return classes.join(" ");
  }

}
