import { Component, OnInit } from '@angular/core';
import { Pets } from '../pets/pets';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-pet-view',
  templateUrl: './pet-view.component.html',
  styleUrls: ['./pet-view.component.scss']
})
export class PetViewComponent implements OnInit {
  currentUsersPet: Pets[];

  constructor(private usersServices: UsersService) { 
    this.usersServices.getPets().subscribe(pets =>{
      this.currentUsersPet = pets
      console.log(pets);
    });
  }

  ngOnInit(): void {
  }

}
