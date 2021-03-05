import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UsersService } from '../users.service';
import { AlertService } from '../alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss'],
})
export class UserUpdateComponent implements OnInit {
  
  submitted = false;
  loading = false;
  updateForm: FormGroup;

  get getUser() {
    return this.updateForm['controls'];
  }

  get getAddress() {
    return this.updateForm.controls.address['controls'];
  }

  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //if(currentUser === null){
    //  this.router.navigate(['/login'])
    //}

    this.updateForm = this.formBuilder.group({
      id: [currentUser.id],
      fullName: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
        ],
      ],
      userName: [currentUser.userName],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],

      address: this.formBuilder.group({
        line1: ['', Validators.required],
        line2: ['', Validators.required],
        district: ['', Validators.required],
        state: ['', Validators.required],
        pinCode: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(6),
          ],
        ],
      }),
    });
  }


  onSubmit() {
    console.log(this.getUser['userName']);
    this.submitted = true;
    this.loading = true;
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
            this.loading = false;
          }
        );
    }
  }
}
