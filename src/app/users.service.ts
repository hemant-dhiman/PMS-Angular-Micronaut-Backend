import { Injectable } from '@angular/core';
import { Users } from './users/Users';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of, } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Users[]>(`/users`);
  }

  getById(id: number) {
    return this.http.get(`/users/` + id);
  }

  register(user: Users) {
    //console.log(user);
    return this.http.post(`/users/register`, user);
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

  login(userName: string, password: string) {
    return this.http
      .post<any>(`/users/authenticate`, {
        userName: userName,
        password: password,
      })
      .pipe(
        map((user) => {
          if (user && user.token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
          return user;
        })
      );
  }

  logout(): Observable<any> {
    localStorage.removeItem('currentUser');
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
