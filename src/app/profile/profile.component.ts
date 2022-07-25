import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

//Import Material Statements.
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

//Import Router.
import { Router } from '@angular/router';

//Import Edit Profile Component.
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any = {};
  favoriteMovies: any[] = [];
  displayListMessage: boolean = false;

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  //Make the api call to get the user's profile.
  getUser(): void {
    this.fetchApiData.getUser().subscribe((data: any) => {
      this.user = data;
      this.favoriteMovies = data.FavoriteMovies;
      if (this.favoriteMovies.length === 0) {
        this.displayListMessage = true;
      }
      return this.user;
    });
  }

  //Make the api call to remove movie from user's favorite movies.
  removeFavorite(id: string): void {
    this.fetchApiData.removeFavoriteMovie(id).subscribe((data: any) => {
      console.log(data);
      this.ngOnInit();
    });
  }

  //Make the api call to delete the user's profile.
  deleteUser(): void {
    if (confirm('Are you sure you want to delete your profile?')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('Profile deleted!', 'OK', {
          duration: 2000,
        });
      });
      this.fetchApiData.deleteUser().subscribe((data: any) => {
        console.log(data);
        localStorage.clear();
      });
    }
  }

  //Open the edit profile dialog.
  openEditProfileDialog(): void {
    this.dialog.open(EditProfileComponent, {
      width: '500px',
    });
  }
}
