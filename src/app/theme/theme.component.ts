import { Component, OnInit, Output,EventEmitter, Inject } from '@angular/core';
import {AppComponent} from '../app.component'
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {

  constructor( public dialog : MatDialog ,public dialogRef: MatDialogRef<ThemeComponent>,
   // @Inject(MAT_DIALOG_DATA) public data:any
  ) { }

  ngOnInit(): void {
   
  }

  

  selectedColor : String ='primary';

  setColor( color: String='primary'){
    this.selectedColor=color;
    this.dialogRef.close(this.selectedColor);
  }

 }
