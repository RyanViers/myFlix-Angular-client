import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  @Input() userData: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {}

  //Make the api call to update the user's profile.
  updateUser(): void {
    this.fetchApiData.updateUser(this.userData).subscribe((data: any) => {
      this.dialogRef.close();
      console.log(data);
      this.snackBar.open('Profile updated!', 'OK', {
        duration: 2000,
      });
      //If user updates username or password, log them out and redirect them to the login page.
      if (this.userData.Username || this.userData.Password) {
        localStorage.clear();
        this.router.navigate(['welcome']).then(() => {
          this.snackBar.open(
            'You have been logged out. Please log in again with new credentials.',
            'OK',
            {
              duration: 3000,
            }
          );
        });
      }
    });
  }
}
