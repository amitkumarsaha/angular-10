import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/model/user/user';
import { AuthService } from 'src/app/service/auth/auth.service';
import { NotificationService } from 'src/app/service/notification/notification.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private user: User;
  // private jsonResponse: JsonResponse;
  
  destroy$: Subject<boolean> = new Subject<boolean>();

  loginForm: FormGroup;
  
  emailId: string;
  secret: string;

  hide = true;

  constructor(
    private formBuilder: FormBuilder, 
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
    ) { 
    
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }


  authenticate(){
    if(this.loginForm.invalid){
      return;
    }
    
    this.user = this.loginForm.value;

    this.userService.authenticate(this.user)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
            if(data.success===true){
              this.notificationService.showNotification("Login successful", "OK", "success");
              this.authService.storeAuthData(data.token, data.user);
              this.router.navigate(['/dashboard']);
            }
            else{
              this.notificationService.showNotification(data.message, "OK", "error");
              this.reset();
            }
        },
        error  => {
          this.notificationService.showNotification("Error during login, try again", "OK", "error");
          console.log("Error - ", error);
        }
      );
  }

  reset() {
    this.loginForm.reset();
  }

  

  initForm(): void {
    this.loginForm = this.formBuilder.group({
      emailId: ['', [Validators.required, Validators.email]],
      secret: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  
  isValidInput(fieldName): boolean {
    return this.loginForm.controls[fieldName].invalid &&
      (this.loginForm.controls[fieldName].dirty || this.loginForm.controls[fieldName].touched);
  }

  getErrorMessage(fieldName, name) {
    const formControl = this.loginForm.controls[fieldName];
    
    if(formControl.hasError('minlength'))
      return name+' must have minimum length of '+formControl.errors.minlength.requiredLength;
    else if(formControl.hasError('required'))
      return name+' cannot be empty';
    else
      return name+' is invalid';
  }

}
