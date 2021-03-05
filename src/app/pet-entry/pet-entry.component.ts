import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pet-entry',
  templateUrl: './pet-entry.component.html',
  styleUrls: ['./pet-entry.component.scss'],
})
export class PetEntryComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  submitted = false;
  petForm!: FormGroup;

  get getPet() {
    return this.petForm['controls'];
  }

  ngOnInit(): void {
    this.petForm = this.formBuilder.group({
      petName: ['', Validators.required],
      petSpecies: ['', Validators.required],
      petBreed: ['', Validators.required],
      petColor: ['', Validators.required],
    });
  }

  onSubmit(data: any) {
    this.submitted = true;
    console.log(this.getPet);
    console.log(data);
  }
}
