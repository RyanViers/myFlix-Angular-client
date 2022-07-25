import { Component, OnInit, Input } from '@angular/core';

//You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

//Import the API calls.
import { FetchApiDataService } from '../fetch-api-data.service';

//Used to display notifications back to the user.
import { MatSnackBar } from '@angular/material/snack-bar';

//Import router to redirect the user to movies page on succeful login.
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = {
    Username: '',
    Password: '',
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {}

  //Make the api call to login the user.
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (data) => {
        console.log(data);
        //Logic for a successful user login.

        //Add token and username to local storage.
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.user.Username);

        //Closes modal dialog on success.
        this.dialogRef.close();
        //Display a notification to the user.
        this.snackBar.open(data, 'User login successful!', {
          duration: 2000,
        });
        //Redirect the user to the movies page.
        this.router.navigate(['movies']);
      },
      (data) => {
        console.log(data);
        //Logic for a failed user login. Display a notification to the user.
        this.snackBar.open(data, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
