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

  //Navigate to the movies page.
  goToMovies(): void {
    this.router.navigate(['movies']);
  }

  //Navigate to the profile page.
  goToProfile(): void {
    this.router.navigate(['profile']);
  }

  //Logout the user.
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigate(['welcome']);
  }
}
