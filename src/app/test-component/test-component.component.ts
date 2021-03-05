import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.scss'],
})

export class TestComponentComponent implements OnInit {

  /**
   * variables
   * getter and setter
   * constructor
   * life cycle hooks
   * methods
   */
  registrationForm!: FormGroup;

  userNames = ['Hemant', 'Shiva', 'Shrey', 'Atul'];

  get registrationFControl() {
    return this.registrationForm.controls;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      fullName: ['', null, [Validators.required], [this.userNameValidator()]],
    });
  }

  onSubmit() {
    console.log(this.registrationFControl['fullName'].errors);
  }

  //checking the username availability in database
  // i have used delay function so that our method
  // behave like a HTTP response with delay of at least 1 sec
  checkUserNameExistence(userName: string): Observable<boolean> {
    return of(this.userNames.includes(userName)).pipe(delay(1000));
  }

  //Async Validator
  userNameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.checkUserNameExistence(control.value).pipe(
        map((response) => {
          return response ? { userName: true } : null;
        })
      );
    };
  }
}

// Note: if we are using Service to validate User Name
//in that case we have to inject it in our components constructor

/* export function matchValidator(form:FormGroup) {
  return form.get('password').value !== form.get('passwordConfirm').value
  ? {passwordMissMatch: true} : null;
}
export class TestComponentComponent implements OnInit {
  newUserForm: FormGroup;
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.newUserForm = this.fb.group({
      fullName: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[\\w\\.-]+@[\\w\\.-]+\\.\\w{2,3}'),
        ],
      ],
      confirmEmail: [
        '',
        [
          Validators.required,
          Validators.pattern('[\\w\\.-]+@[\\w\\.-]+\\.\\w{2,3}'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  onSubmit(){
  }
} */
