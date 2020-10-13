import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../model/user/user';
import { JsonResponse } from '../../model/response/jsonresponse';
import { UserService } from '../../service/user/user.service';

import {  takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NotificationService } from 'src/app/service/notification/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],

})
export class RegisterComponent implements OnInit, OnDestroy {

  private user: User;
  private jsonResponse: JsonResponse;
  
  destroy$: Subject<boolean> = new Subject<boolean>();

  registrationForm: FormGroup;
  
  firstName: String;
  middleName: String;
  lastName: String;
  emailId: String;
  secret: String;

  hide = true;
  error: String;


  // emailId = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private formBuilder: FormBuilder, 
    private userService: UserService,
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


  register(){

    if(this.registrationForm.invalid){
      return;
    }
    
    this.user = this.registrationForm.value;

    this.userService.register(this.user)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: JsonResponse) => {
          this.jsonResponse = data;
          if(this.jsonResponse.success){
            console.log(this.jsonResponse.message);
            this.notificationService.showNotification("User registration successful", "OK", "success");
            this.router.navigate(['/login']);
          }
          else{
            this.notificationService.showNotification("User registration failed", "OK", "error");
            console.log(this.jsonResponse.message);
          }
        },
        error  => {
          this.notificationService.showNotification("Error during registration, try again", "OK", "error");
          console.log("Error - ", error);
        }
      );

    // console.log(resp);

    // this.reset();
  }

  reset() {
    // this.submitted = false;
    this.registrationForm.reset();
}

  

  initForm(): void {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      middleName: '',
      lastName: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      // userId: ['', [Validators.required, Validators.minLength(8)]],
      secret: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  
  isValidInput(fieldName): boolean {
    return this.registrationForm.controls[fieldName].invalid &&
      (this.registrationForm.controls[fieldName].dirty || this.registrationForm.controls[fieldName].touched);
  }

  getErrorMessage(fieldName, name) {
    const formControl = this.registrationForm.controls[fieldName];
    
    if(formControl.hasError('minlength'))
      return name+' must have minimum length of '+formControl.errors.minlength.requiredLength;
    else if(formControl.hasError('required'))
      return name+' cannot be empty';
    else
      return name+' is invalid';
  }

}
