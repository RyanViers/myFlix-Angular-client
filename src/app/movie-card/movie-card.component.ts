import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';

//Import Components for movie synopsis, director, and genre.
import { SynopsisComponent } from '../synopsis/synopsis.component';
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getUser();
  }

  /**
   * @description - Get data on specific user.
   * @memberof MovieCardComponent
   * @returns {Object} - User data.
   * @function getUser
   */
  getUser(): void {
    this.fetchApiData.getUser().subscribe((data: any) => {
      this.favMovies = data.FavoriteMovies;
      console.log(this.favMovies);
    });
  }

  /**
   * @description - Get data on all movies.
   * @memberof MovieCardComponent
   * @returns {Array} - Movie data.
   * @function getMovies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((data: any) => {
      this.movies = data;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * @description - Add movie to user's favorite movies.
   * @param {string} id - Movie id.
   * @memberof MovieCardComponent
   * @returns {Object} - User data.
   * @function addFavorite
   */
  addFavorite(id: string): void {
    this.fetchApiData.addFavoriteMovie(id).subscribe((data: any) => {
      console.log(data);
      this.ngOnInit();
    });
  }

  /**
   * @description - Check if movie is in user's favorite movies.
   * @param {string} id - Movie id.
   * @memberof MovieCardComponent
   * @returns {boolean} - True if movie is in user's favorite movies.
   * @function isFavorite
   */
  isFavorite(id: string): boolean {
    //Check if movie is in user's favorite movies by movie id.
    if (this.favMovies.find((movie) => movie._id === id)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * @description - Remove movie from user's favorite movies.
   * @param {string} id - Movie id.
   * @memberof MovieCardComponent
   * @returns {Object} - User data.
   * @function removeFavorite
   */
  removeFavorite(id: string): void {
    this.fetchApiData.removeFavoriteMovie(id).subscribe((data: any) => {
      console.log(data);
      this.ngOnInit();
    });
  }

  /**
   * @description - Open the synopsis dialog.
   * @param {string} title - Movie title.
   * @param {string} description - Movie synopsis.
   * @param {string} image - Movie image.
   * @memberof MovieCardComponent
   * @function openSynopsisDialog
   */
  openSynopsisDialog(title: string, description: string, image: string): void {
    this.dialog.open(SynopsisComponent, {
      panelClass: 'custom-dialog-container',
      data: {
        Title: title,
        Description: description,
        Image: image,
      },
    });
  }

  /**
   * @description - Open the director dialog.
   * @param {string} name - Director name.
   * @param {string} bio - Director description.
   * @param {Date} birthday - Director birthday.
   * @param {Date} death - Director death.
   * @memberof MovieCardComponent
   * @function openDirectorDialog
   */
  openDirectorDialog(
    name: string,
    bio: string,
    birthday: Date,
    death: Date
  ): void {
    this.dialog.open(DirectorComponent, {
      panelClass: 'custom-dialog-container',
      data: {
        Name: name,
        Bio: bio,
        Birthday: birthday,
        Death: death,
      },
    });
  }

  /**
   * @description - Open the genre dialog.
   * @param {string} name - Genre name.
   * @param {string} description - Genre description.
   * @memberof MovieCardComponent
   * @function openGenreDialog
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      panelClass: 'custom-dialog-container',
      data: {
        Name: name,
        Description: description,
      },
    });
  }
}
