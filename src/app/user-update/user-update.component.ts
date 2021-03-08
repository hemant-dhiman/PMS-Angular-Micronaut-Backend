import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UsersService } from '../users.service';
import { AlertService } from '../alert.service';
import { Router } from '@angular/router';
import { Users } from '../users/Users';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss'],
})
export class UserUpdateComponent implements OnInit {
  currentUser: Users;
  updateForm: FormGroup;

  get full_name() {
    return this.updateForm.get('full_name');
  }
  get user_name() {
    return this.updateForm.get('user_name');
  }
  get password() {
    return this.updateForm.get('password');
  }
  get email() {
    return this.updateForm.get('email');
  }

  get addressFormControls() {
    return this.updateForm.get('address');
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
    return this.addressFormControls.get('pin_code');
  }

  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.updateForm = this.formBuilder.group({
      id: [this.currentUser.id],
      full_name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
        ],
      ],
      user_name: [this.currentUser.user_name],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
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
        pin_code: [
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
    if (this.updateForm.valid) {
      this.usersService
        .update(this.updateForm.value)
        .pipe(first())
        .subscribe(
          (data) => {
            this.alertService.success('Update successful', true);
            this.router.navigate(['/login']);
          },
          (err) => {
            this.alertService.error(err);
          }
        );
    }
  }

  invalidInput(field): boolean {
    return (
      !this.updateForm.get(field).valid &&
      (this.updateForm.get(field).dirty ||
        this.updateForm.get(field).touched)
    );
  }

  fullNameErrorMessage() {
    return this.full_name.hasError('required')
      ? 'Full Name required!'
      : this.full_name.hasError('minlength')
      ? 'Full Name Should be minimum of 5 Characters'
      : this.full_name.hasError('maxlength')
      ? 'Full Name Should be minimum of 30 Characters'
      : '';
  }

  userNameErrorMessage() {
    return this.user_name.hasError('required')
      ? 'User Name required!'
      : this.user_name.hasError('minlength')
      ? 'User Name Should be minimum of 5 Characters'
      : this.user_name.hasError('maxlength')
      ? 'User Name Should be minimum of 25 Characters'
      : this.user_name.hasError('user_name')
      ? 'An Account with this email already exists.'
      : this.user_name.hasError('pattern')
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
