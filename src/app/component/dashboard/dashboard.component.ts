import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { JobsService } from 'src/app/service/job/jobs.service';
import { NotificationService } from 'src/app/service/notification/notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  /** Based on the screen size, switch from standard to one column per row */

  cards =[];
  cardsForMobile = [];
  cardsForWeb = [];
  isMobile: boolean = false;

  isMobileObserver: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return true;
      }

      return false;
    })
  );

  constructor(private breakpointObserver: BreakpointObserver,
    public jobsService: JobsService,
    public notificationService: NotificationService) {

  }
  
  ngOnInit(): void {
    
    this.isMobileObserver.subscribe(currentObservableValue => {
      this.isMobile = currentObservableValue;
      this.loadCards();
    });

    this.jobsService.getJobs().subscribe(response => {
      this.cardsForMobile = response.mobileCards;
      this.cardsForWeb = response.webCards;
      this.loadCards();
    },
    error => {
      this.notificationService.showNotification("Error Message", "OK", "error");
    });
  }

  loadCards(){
    this.cards = this.isMobile ? this.cardsForMobile: this.cardsForWeb;
  }
}
