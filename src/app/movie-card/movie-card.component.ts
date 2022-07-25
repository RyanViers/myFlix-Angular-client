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

  //Make the api call to get user's favorite movies.
  getUser(): void {
    this.fetchApiData.getUser().subscribe((data: any) => {
      this.favMovies = data.FavoriteMovies;
      console.log(this.favMovies);
    });
  }

  //Make the api call to get the movies.
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((data: any) => {
      this.movies = data;
      console.log(this.movies);
      return this.movies;
    });
  }

  //Make the api call to add movie to user's favorite movies.
  addFavorite(id: string): void {
    this.fetchApiData.addFavoriteMovie(id).subscribe((data: any) => {
      console.log(data);
      this.ngOnInit();
    });
  }

  //Function to check if movie is in user's favorite movies.
  isFavorite(id: string): boolean {
    //Check if movie is in user's favorite movies by movie id.
    if (this.favMovies.find((movie) => movie._id === id)) {
      return true;
    } else {
      return false;
    }
  }

  removeFavorite(id: string): void {
    this.fetchApiData.removeFavoriteMovie(id).subscribe((data: any) => {
      console.log(data);
      this.ngOnInit();
    });
  }

  //Open the movie synopsis dialog.
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

  //Open the director dialog.
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

  //Open the genre dialog.
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
