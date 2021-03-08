import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from '../alert.service';
import { Pets } from '../pets/pets';
import { UsersService } from '../users.service';
import { Users } from '../users/Users';

@Component({
  selector: 'app-pet-entry',
  templateUrl: './pet-entry.component.html',
  styleUrls: ['./pet-entry.component.scss'],
})
export class PetEntryComponent implements OnInit {
  currentUser: Users;
  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private alertService: AlertService,
    private router: Router,
  ) {
    this.usersService.getUserDetails().subscribe((data) => {
      this.currentUser = data;
    });
  }

  userId: string;
  petForm!: FormGroup;

  get name() {
    return this.petForm.get('name');
  }

  get species() {
    return this.petForm.get('species');
  }

  get breed() {
    return this.petForm.get('breed');
  }

  get color() {
    return this.petForm.get('color');
  }

  ngOnInit(): void {
    this.petForm = this.formBuilder.group({
      o_id: [''] /*localStorage.getItem('ownerId')*/,
      id: [''],
      name: ['', Validators.required],
      species: ['', Validators.required],
      breed: ['', Validators.required],
      color: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.petForm.valid) {
      console.log(this.petForm.value);
      //this.usersService.getUserDetails().subscribe();
      this.usersService
        .petEntry(this.petForm.value)
        .pipe(first())
        .subscribe(
          (data) => {
            //localStorage.setItem('response',JSON.stringify(data));
            this.alertService.success('Pet Entry Successful', true);
            this.router.navigate(['/home']);
          },
          (err) => {
            this.alertService.error(err);
          }
        );
    }
  }

  invalidInput(field): boolean {
    return (
      !this.petForm.get(field).valid &&
      (this.petForm.get(field).dirty || this.petForm.get(field).touched)
    );
  }

  nameErrorMessage() {
    return this.name.hasError('required') ? 'Pet Name required!' : '';
  }

  speciesErrorMessage() {
    return this.name.hasError('required') ? 'Pet Species required!' : '';
  }

  breedErrorMessage() {
    return this.name.hasError('required') ? 'Pet Breed required!' : '';
  }

  colorErrorMessage() {
    return this.name.hasError('required') ? 'Pet Color required!' : '';
  }
}
