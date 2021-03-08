import { Injectable } from '@angular/core';
import { Users } from './users/Users';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of, } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pets } from './pets/pets';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  headers: HttpHeaders;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Users[]>(`/users`);
  }

  getById(id: number) {
    return this.http.get(`/users/` + id);
  }

  getUserDetails(){
    return this.http.get<Users>(`http://localhost:8080/pms/user/details`);

  }

  demoRegister(user: Users) {
    return this.http.post(`http://localhost:8080/pms/user/register`, user);
  }

  demoGetAllUserNames(user_name: string){
    return this.http.post(`http://localhost:8080/pms/user-names`,{user_name: user_name});
  }

  petEntry(pet: Pets){
    return this.http.post(`http://localhost:8080/pms/pet`, pet);
  }

  getPets(){
    return this.http.get<Pets[]>(`http://localhost:8080/pms/pet`);
  }

   getAllUserNames(userName: string){
    return this.http.post(`/user-names`, userName);
  }

  getAllUsersEmails(userEmail: string){
    return this.http.post(`/user-emails`, userEmail);

  }

  update(user: Users) {
    return this.http.patch(`/users/` + user.id, user);
  }

  delete(id: number) {
    return this.http.delete(`/users/` + id);
  }

  demoLogin(username: string, password: string) {
    return this.http
      .post<any>(`http://localhost:8080/login`, {
        username: username,
        password: password,
      })
      .pipe(
        map((user) => {
          if (user && user.access_token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
          return user;
        })
      );
  }

  logout(): Observable<any> {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('ownerId');
    return of(new HttpResponse({ status: 200 }));
  }

  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //   }),
  // };

  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //     console.error(error);
  //     return of(result as T);
  //   };
  // }

  // getUsers(): Observable<users[]> {
  //   return this.http
  //     .get<users[]>(this.usersUrl)
  //     .pipe(catchError(this.handleError<users[]>('getUsers', [])));
  // }

  // addUser(user: users): Observable<users> {
  //   return this.http
  //     .post<users>(this.usersUrl, user, this.httpOptions)
  //     .pipe(catchError(this.handleError<users>('addUser')));
  // }

  // login(userName: string, password: string) {
  //   return this.http
  //     .post<any>(this.loginUrl, { username: userName, password: password })
  //     .pipe(
  //       map((user) => {
  //         if (user && user.idToken)
  //           localStorage.setItem('currentUser', JSON.stringify(user));
  //       })
  //     );
  // }

  // logOut(){
  //   localStorage.removeItem('currentUser');
  // }
}
