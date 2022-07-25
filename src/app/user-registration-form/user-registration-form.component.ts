import { Component, OnInit, Input } from '@angular/core';

//You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

//Import the API calls.
import { FetchApiDataService } from '../fetch-api-data.service';

//Used to display notifications back to the user.
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit {
  //Create a new user object.
  @Input() userData = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  //Make the api call to register the user.
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (data) => {
        //Logic for a successful user registration.
        this.dialogRef.close(); //Closes modal dialog on success.
        console.log(data);
        this.snackBar.open(data, 'User registration successful!', {
          duration: 2000,
        });
      },
      (data) => {
        console.log(data);
        //Logic for a failed user registration.
        this.snackBar.open(data, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
