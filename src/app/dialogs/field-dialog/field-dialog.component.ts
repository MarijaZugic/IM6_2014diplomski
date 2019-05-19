import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDatepicker } from '@angular/material';

import { FormControl, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material';
import { Field } from '../../models/field';
import { FieldService } from '../../services/field.service';

@Component({
 selector: 'app-field-dialog',
 templateUrl: './field-dialog.component.html',
 styleUrls: ['./field-dialog.component.css']
})
export class FieldDialogComponent implements OnInit {

 public flag: number;
 constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<FieldDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Field,
              public fieldService: FieldService,
              
 ) { }


 ngOnInit() {
   
 }

 public add(): void {
   this.data.id = -1;
   this.fieldService.addField(this.data);
   this.snackBar.open('You have successfully added a new field', 'OK', { duration: 2500 });
 }

 public update(): void {
   this.fieldService.updateField(this.data);
   this.snackBar.open('You have successfully modified ' + this.data.name + ' field', 'OK', { duration: 2500 });
 }

 public delete(): void {
   this.fieldService.deleteField(this.data.id);
   this.snackBar.open('You have successfully deleted ' + this.data.name + ' field', 'OK', { duration: 2000 });
 }

 public cancel(): void {
   this.dialogRef.close();
   this.snackBar.open('Operation was canceled', 'OK', { duration: 1000 });
 }

public compareTo(a, b) {
   return a.id === b.id;
 }
}
