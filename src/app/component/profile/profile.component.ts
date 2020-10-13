import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user/user';
import { AuthService } from 'src/app/service/auth/auth.service';
import { NotificationService } from 'src/app/service/notification/notification.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;

  topping:{
    wanted:''
  }

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private router: Router) {}

  ngOnInit() {
    this.userService.getProfile().subscribe(
      // profile => {
      //   this.user = profile;
      // },
      // err =>{
      //   console.log(err);
      //   return false; 
      // });

      (data: any) => {
        console.log({data});
        if(data){
          this.user = data.user;
          console.log(this.user);
        }
        else{
          this.notificationService.showNotification("Profile not found", "OK", "error");
        }
    },
    error  => {
      console.log("Error - ", error);
      this.notificationService.showNotification(error, "OK", "error");
      return false;
    }
    );
  }

}
