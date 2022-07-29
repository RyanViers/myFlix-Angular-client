import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss'],
})
export class DirectorComponent implements OnInit {
  /**
   * @service Inject the MAT_DIALOG_DATA from Movie-Card component into the Director constructor.
   * @param data - The data that was passed from the parent component.
   * @memberof DirectorComponent
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Bio: string;
      Birthday: Date;
      Death: Date;
    }
  ) {}

  ngOnInit(): void {}
}
