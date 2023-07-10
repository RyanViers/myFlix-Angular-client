import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declare the api url that will provide data to the application.
const apiUrl = 'http://movie-api-dev.us-east-1.elasticbeanstalk.com/';
@Injectable({
  providedIn: 'root',
})
//Create the service that will fetch the data from the api.
export class FetchApiDataService {
  //Inject the HttpClient service into the constructor.
  constructor(private http: HttpClient) {}

  /**
   * @service POST request to API endpoint to create a new user.
   * @param {Object} userDetails - The user details to be sent to the server.
   * @returns {Object} New user object.
   * @function userRegistration
   * @memberof FetchApiDataService
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * @service POST request to API endpoint to login a user.
   * @param {Object} userDetails - The user details to be sent to the server (Username & Password).
   * @returns {Object} User object.
   * @function userLogin
   * @memberof FetchApiDataService
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * @service GET request to API endpoint to get all movies.
   * @returns {Array} Movie object.
   * @function getAllMovies
   * @memberof FetchApiDataService
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @service GET request to API endpoint to get a specific movie by title(name).
   * @param {String} title - The name of the movie to be fetched.
   * @returns {Object} Movie object.
   * @function getMovie
   * @memberof FetchApiDataService
   */
  getMovie(title: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `movies/${title}`, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @service GET request to API endpoint to get data on specific director by name.
   * @param {String} name - The name of the director to be fetched.
   * @returns {Object} Director object.
   * @function getDirector
   * @memberof FetchApiDataService
   */
  getDirector(name: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `movies/directors/${name}`, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @service GET request to API endpoint to get data on specific genre by name.
   * @param {String} name - The name of the genre to be fetched.
   * @returns {Object} Genre object.
   * @function getGenre
   * @memberof FetchApiDataService
   */
  getGenre(name: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `movies/genres/${name}`, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @service GET request to API endpoint to get data on specific user by name.
   * @returns {Object} User object.
   * @function getUser
   * @memberof FetchApiDataService
   */
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http
      .get(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @service POST request to API endpoint to add a movie to the user's favorite movies.
   * @param {String} movieID - The ID of the movie to be added.
   * @returns {Object} User object.
   * @function addFavoriteMovie
   * @memberof FetchApiDataService
   */
  addFavoriteMovie(movieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http
      .post(
        apiUrl + `users/${username}/movies/${movieID}`,
        {},
        {
          headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @service DELETE request to API endpoint to remove a movie from the user's favorite movies.
   * @param {String} movieID - The ID of the movie to be removed.
   * @returns {Object} User object.
   * @function removeFavoriteMovie
   * @memberof FetchApiDataService
   */
  removeFavoriteMovie(movieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http
      .delete(apiUrl + `users/${username}/movies/${movieID}`, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @service PUT request to API endpoint to update a user's profile.
   * @param {Object} userDetails - The user details to be updated.
   * @returns {Object} User object.
   * @function updateUser
   * @memberof FetchApiDataService
   */
  updateUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http
      .put(apiUrl + `users/${username}`, userDetails, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @service DELETE request to API endpoint to delete a user's profile.
   * @returns Success message.
   * @function deleteUser
   * @memberof FetchApiDataService
   */
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http
      .delete(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //Non-typed response extraction.
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  //Error handling.
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
