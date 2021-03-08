import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { UsersService } from '../users.service';
import { Users } from '../Users/Users';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  users_data!: Users[];
  returnUrl: String;
  submitted = false;
  loading = false;
  loginForm: FormGroup;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private alert: AlertService,
    private fb: FormBuilder
  ) {}

  get loginFormControl() {
    return this.loginForm;
  }

  get userName(){
    return this.loginForm.get('userName');
  }
  
  get password(){
    return this.loginFormControl.get('password');
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(25),
          Validators.pattern("^(?=[a-zA-Z0-9._]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.]$"),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
    });

    this.usersService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    this.submitted = true;
    //console.log(this.f);

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.usersService
      .demoLogin(
        this.loginFormControl.get('userName').value,
        this.loginFormControl.get('password').value
        //'HD1234','12345678'
      )
      .pipe(first())
      .subscribe(
        (data) => {
          this.router.navigate(['/home']);
        },
        (error) => {
          this.alert.error(error);
          this.loading = false;
        }
      );
  }

  invalidInput(field){
    return (
      !this.loginForm.get(field).valid &&
      (this.loginForm.get(field).dirty ||
        this.loginForm.get(field).touched)
    );
  }

  userNameErrorMessage() {
    return this.userName.hasError('required')
      ? 'User Name required!'
      : this.userName.hasError('minlength')
      ? 'User Name Should be minimum of 5 Characters'
      : this.userName.hasError('maxlength')
      ? 'User Name Should be minimum of 25 Characters'
      : this.userName.hasError('userName')
      ? 'An Account with this email already exists.'
      : this.userName.hasError('pattern')
      ? "Make Sure User Name is Correct!" 
      : '';
  }

  passwordErrorMessage() {
    return this.password.hasError('required')
      ? 'Password is required!'
      : this.password.hasError('minlength')
      ? 'Password Should be minimum of 8 Characters'
      : this.password.hasError('maxlength')
      ? 'Password Should be minimum of 25 Characters'
      : '';
  }
}
