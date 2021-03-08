import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetViewComponent } from './pet-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    PetViewComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path:'',
        component: PetViewComponent,
      }
    ])
  ]
})
export class PetViewModule { }
