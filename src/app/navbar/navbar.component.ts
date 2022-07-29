import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit(): void {}

  /**
   * @description - Navigate to the movies(main) page.
   * @memberof NavbarComponent
   * @returns {void}
   * @function goToMovies
   *
   */
  goToMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * @description - Navigate to the user profile page.
   * @memberof NavbarComponent
   * @returns {void}
   * @function goToProfile
   */
  goToProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * @description - Logout the user and navigate to the welcome page.
   * @memberof NavbarComponent
   * @returns {void}
   * @function logout
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigate(['welcome']);
  }
}
