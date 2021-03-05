import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'PMS';
  ngOnInit(): void {
    const users = [
      {
        id: 0,
        fullName: 'Hemant Dhiman',
        userName: 'HD1234',
        email: 'hemant@datability.co',
        password: '12345678',
        address: {
          line1: 'partap bhawan',
          line2: 'near Rani Taal',
          district: 'sirmaur',
          state: 'himachal pradesh',
          pinCode: '173001',
        },
      },

      {
        id: 1,
        fullName: 'Shiva Tomar',
        userName: 'shiva',
        email: 'shiva@datability.co',
        password: '123456789',
        address: {
          line1: 'partap bhawan',
          line2: 'near Rani Taal',
          district: 'gaziabad',
          state: 'uttar pradesh',
          pinCode: '144411',
        },
      },
    ];

    localStorage.setItem('users', JSON.stringify(users));
  }
}
