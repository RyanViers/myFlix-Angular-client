import { Component, OnInit } from '@angular/core';

//Import Components.
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';

//Import the API calls.
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  /**
   * @description - Function that opens the dialog when register button is clicked.
   * @memberof WelcomePageComponent
   * @returns {void}
   * @function openUserRegistrationDialog
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      //Assign the dialog a width.
      width: '280px',
    });
  }

  /**
   * @description - Function that opens the dialog when login button is clicked.
   * @memberof WelcomePageComponent
   * @returns {void}
   * @function openUserLoginDialog
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      //Assign the dialog a width.
      width: '280px',
    });
  }
}
