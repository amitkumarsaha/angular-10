import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/service/notification/notification.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {

  // isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  //   .pipe(
  //     map(result => result.matches),
  //     shareReplay()
  //   );

  isDarkTheme: boolean = false;

  constructor(
    // private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
    ) {}

  ngOnInit(){
    this.isDarkTheme = localStorage.getItem('theme') === 'Dark' ? true: false;
  }

  storeThemeSelection(){
    localStorage.setItem('theme', this.isDarkTheme? 'Dark': 'Light');
  }

  logout(){
    this.authService.invalidate();
    this.notificationService.showNotification("Logout successful", "OK", "success");
    this.router.navigate([('/login')]);
  }

}
