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

  /**
   * @description - Get data on specific user.
   * @memberof ProfileComponent
   * @returns {object} User data.
   * @function getUser
   */
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

  /**
   * @description - Remove favorite movie from user's favorite movies.
   * @param {string} id - Movie id.
   * @memberof ProfileComponent
   * @returns {object} User data.
   * @function removeFavoriteMovie
   */
  removeFavorite(id: string): void {
    this.fetchApiData.removeFavoriteMovie(id).subscribe((data: any) => {
      console.log(data);
      this.ngOnInit();
    });
  }

  /**
   * @description - Delete user account and navigate to welcome page.
   * @memberof ProfileComponent
   * @returns Success message.
   * @function deleteUser
   */
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

  /**
   * @description - Open Edit Profile Form.
   * @memberof ProfileComponent
   * @returns {object} User data.
   * @function openEditProfileDialog
   */
  openEditProfileDialog(): void {
    this.dialog.open(EditProfileComponent, {
      width: '500px',
    });
  }
}
