import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis',
  templateUrl: './synopsis.component.html',
  styleUrls: ['./synopsis.component.scss'],
})
export class SynopsisComponent implements OnInit {
  /**
   * @description - Constructor for the synopsis component. Injects the data passed in from the parent component.
   * @param data - data to be displayed in the dialog
   * @memberof SynopsisComponent
   * @function constructor
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Title: string;
      Description: string;
      Image: string;
    }
  ) {}

  ngOnInit(): void {}
}
