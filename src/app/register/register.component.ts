import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AsyncValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { AlertService } from '../alert.service';
import { Users } from '../users/users';
import { first, map } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  data: Users[];
  registerForm: FormGroup;

  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private router: Router
  ) {}

  get fullName() {
    return this.registerForm.get('fullName');
  }
  get userName() {
    return this.registerForm.get('userName');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get email() {
    return this.registerForm.get('email');
  }

  get addressFormControls() {
    return this.registerForm.get('address');
  }

  get line1() {
    return this.addressFormControls.get('line1');
  }

  get line2() {
    return this.addressFormControls.get('line2');
  }
  get district() {
    return this.addressFormControls.get('district');
  }
  get state() {
    return this.addressFormControls.get('state');
  }
  get pinCode() {
    return this.addressFormControls.get('pinCode');
  }

  ngOnInit(): void {
    // this.usersService.getAllUserNames('HD123').subscribe(console.log);
    // this.usersService
    //   .getAllUsersEmails('HD@datability.co')
    //   .subscribe(console.log);

    this.registerForm = this.formBuilder.group({
      fullName: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
        ],
      ],
      userName: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(25),
          Validators.pattern("^(?=[a-zA-Z0-9._]{5,25}$)(?!.*[_.]{2})[^_.].*[^_.]$"),
        ],
        this.userNameValidator.bind(this),
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[\\w\\.-]+@[\\w\\.-]+\\.\\w{2,3}'),
        ],
      ],

      address: this.formBuilder.group({
        line1: ['', Validators.required],
        line2: ['', Validators.required],
        district: ['', Validators.required],
        state: ['', Validators.required],
        pinCode: [
          '',
          [
            Validators.required,
            Validators.pattern('^[1-9][0-9]{5}$'),
          ],
        ],
      }),
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.usersService
        .register(this.registerForm.value)
        .pipe(first())
        .subscribe(
          (data) => {
            this.alertService.success('Registration successful', true);
            this.router.navigate(['/login']);
          },
          (err) => {
            this.alertService.error(err);
          }
        );
    }
  }

  userNameValidator(control: AbstractControl) {
    return new Promise((resolve, reject) => {
      this.usersService.getAllUserNames(control.value).subscribe(
        () => {
          resolve(null);
        },
        () => {
          resolve({ userName: true });
        }
      );
    });
  }

  invalidInput(field): boolean {
    return (
      !this.registerForm.get(field).valid &&
      (this.registerForm.get(field).dirty ||
        this.registerForm.get(field).touched)
    );
  }

  fullNameErrorMessage() {
    return this.fullName.hasError('required')
      ? 'Full Name required!'
      : this.fullName.hasError('minlength')
      ? 'Full Name Should be minimum of 5 Characters'
      : this.fullName.hasError('maxlength')
      ? 'Full Name Should be minimum of 30 Characters'
      : '';
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
      ? "Not A Valid User Name!" 
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

  emailErrorMessage() {
    return this.email.hasError('required')
      ? 'Email is required!'
      : this.email.hasError('minlength')
      ? 'Email Should be minimum of 5 Characters'
      : this.email.hasError('maxlength')
      ? 'Email Should be minimum of 25 Characters'
      : this.email.hasError('pattern')
      ? 'Enter Valid Email Please'
      : '';
  }

  invalidAddressInput(field): boolean {
    return (
      !this.addressFormControls.get(field).valid &&
      (this.addressFormControls.get(field).dirty ||
        this.addressFormControls.get(field).touched)
    );
  }

  line1ErrorMessage() {
    return this.line1.hasError('required') ? 'Line One required' : '';
  }

  line2ErrorMessage() {
    return this.line2.hasError('required') ? 'Line Two required' : '';
  }

  districtErrorMessage() {
    return this.district.hasError('required') ? 'District required' : '';
  }

  stateErrorMessage() {
    return this.state.hasError('required') ? 'State required' : '';
  }

  pincodeErrorMessage() {
    return this.pinCode.hasError('required')
      ? 'Pin Code required'
      : this.pinCode.hasError('pattern')
      ? 'Please enter a 6 digit Pin Code'
      : '';
  }
}
