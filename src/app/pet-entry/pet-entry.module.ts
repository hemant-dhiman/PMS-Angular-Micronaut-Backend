import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetEntryComponent } from './pet-entry.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    PetEntryComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path:'',
        component: PetEntryComponent,
      }
    ])
  ]
})
export class PetEntryModule { }
