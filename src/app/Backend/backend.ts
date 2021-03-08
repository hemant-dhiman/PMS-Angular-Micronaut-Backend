import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, dematerialize, map, materialize, mergeMap } from 'rxjs/operators';
import { Users } from '../users/Users';

@Injectable()
export class BackEnd implements HttpInterceptor {
  currentUser: Users;
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
    ): Observable<HttpEvent<any>> {
    let users: Users[] = JSON.parse(localStorage.getItem('users')) || [];
    
    return of(null)
      .pipe(
        mergeMap(() => {
          //authentication for existing users
          if (
            request.url.endsWith('/users/authenticate') &&
            request.method === 'POST'
          ) {
            let filteredUsers = users.filter((user) => {
              return (
                user.user_name === request.body.userName &&
                user.password === request.body.password
              );
            });

            if (filteredUsers.length) {
              let user = filteredUsers[0];
              let body = {
                id: user.id,
                fullName: user.full_name,
                email: user.email,
                userName: user.user_name,
                address: user.address,
                token: '12345-6789-1011',
              };
              return of(new HttpResponse({ status: 200, body: body }));
            } else {
              return throwError({
                error: { message: 'Username or Password is incorrect' },
              });
            }
          }

          console.log(request.url);
          //get all users
          if (request.url.endsWith('/users') && request.method === 'GET') {
            if (
              request.headers.get('Authorization') === 'Bearer 12345-6789-1011'
            ) {
              return of(new HttpResponse({ status: 200, body: users }));
            } else {
              return throwError({
                status: 401,
                error: { message: 'Unauthorized' },
              });
            }
          }

          //get All user names
          if(request.url.endsWith('/user-names') && request.method === 'POST'){
            let newUser = request.body;
            //validation
             let duplicateUser = users.filter((user) => {
              return user.user_name === newUser;
            }).length;

            if (duplicateUser) {
              return throwError({
                error: {
                  message:
                    'Username "' + newUser + '" is Already Taken',
                },
              });
            }else{
              return of(new HttpResponse({status: 200}));
            }
        }

          //get All user emails
          if(request.url.endsWith('/user-emails') && request.method === 'POST'){
            let newUser = request.body;
            //validation
             let duplicateUser = users.filter((user) => {
              return user.email === newUser;
            }).length;

            if (duplicateUser) {
              return throwError({
                error: {
                  message:
                    'Email "' + newUser + '" is Already Taken',
                },
              });
            }else{
              return of(new HttpResponse({status: 200}));
            }
        }

          // get user by id
          if (request.url.match(/\/users\/\d+$/) && request.method === 'GET') {
            if (request.headers.get('Authorization') === 'Bearer 12345-6789-1011') {
              let urlParts = request.url.split('/');
              let id = parseInt(urlParts[urlParts.length - 1]);
              let matchedUsers = users.filter((user) => {
                return user.id === id;
              });
              let user = matchedUsers.length ? matchedUsers[0] : null;

              return of(new HttpResponse({ status: 200, body: user }));
            } else {
              return throwError({
                status: 401,
                error: { message: 'Unauthorized' },
              });
            }
          }

          //register user
          if (
            request.url.endsWith('/users/register') &&
            request.method === 'POST'
          ) {
            let newUser = request.body;
            //validation
            let duplicateUser = users.filter((user) => {
              return user.user_name === newUser.userName;
            }).length;

            if (duplicateUser) {
              return throwError({
                error: {
                  message:
                    'Username "' + newUser.userName + '" is Already Taken',
                },
              });
            }

            //else save new user

            newUser.id = users.length + 1;
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            return of(new HttpResponse({ status: 200 }));
          }

          //update a user
          if (
            request.url.match(/\/users\/\d+$/) &&
            request.method === 'PATCH'
          ) {
            let newUser = request.body;
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
            //newUser.userName = this.currentUser.userName;

            for (let index = 0; index < users.length; index++) {
              const element = users[index];
              if (element.user_name == newUser.userName) {
                users.splice(index, 1);
                break;
              }
            }

            if (this.currentUser.user_name === newUser.userName) {
              newUser.id = this.currentUser.id;
              localStorage.removeItem('currentUser');
              users.push(newUser);
              localStorage.setItem('users', JSON.stringify(users));
              return of(new HttpResponse({ status: 200 }));
            }

            return throwError({
              error: {
                message: 'Username "' + newUser.userName + ` Doesn't Exist!`,
              },
            });
          }

          //delete a user
          if (
            request.url.match(/\/users\/\d+$/) &&
            request.method === 'DELETE'
          ) {
            if (request.headers.get('Authorization') === '12345-6789-1011') {
              let urlParts = request.url.split('/');
              let id = parseInt(urlParts[urlParts.length - 1]);
              for (let i = 0; i < users.length; i++) {
                let user = users[i];
                if (user.id === id) {
                  users.splice(i, 1);
                  localStorage.setItem('users', JSON.stringify(users));
                  break;
                }
              }
              return of(new HttpResponse({ status: 200 }));
            } else {
              return throwError({
                status: 401,
                error: { message: 'Unauthorized' },
              });
            }
          }
          /* if (request.url.endsWith('http://localhost:8080/pms/user/details') && request.method === 'GET'){
            console.log(request.url);
            } */


          return next.handle(request);
        })
      )
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());
  }
}

//   constructor(private usersService: UsersService) {}
//     allUsers: users[];
//   intercept(
//     request: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//       console.log("Interceptor");
//     let users: any[] = JSON.parse(localStorage.getItem('users')) || [];
//     console.log("local storage interceptor")
//     console.log(users);

//     const idToken = localStorage.getItem('id_token');

//     if (idToken) {
//       const cloned_req = request.clone({
//         headers: request.headers.set('Authorization', 'Bearer ' + idToken),
//       });
//       return next.handle(cloned_req);
//     } else {
//       return next.handle(request);
//     }
//   }
//}
