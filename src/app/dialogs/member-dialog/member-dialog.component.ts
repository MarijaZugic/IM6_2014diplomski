import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDatepicker } from '@angular/material';

import { FormControl, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material';
import { Member } from '../../models/member';
import { MemberService } from '../../services/member.service';
import { Localgroup } from '../../models/localgroup';
import { LocalgroupService } from '../../services/localgroup.service';

@Component({
 selector: 'app-member-dialog',
 templateUrl: './member-dialog.component.html',
 styleUrls: ['./member-dialog.component.css']
})
export class MemberDialogComponent implements OnInit {
localgroups : Localgroup[];
 public flag: number;
 constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<MemberDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Member,
              public memberService: MemberService,
              public localgroupService : LocalgroupService
              
 ) { }


 ngOnInit() {
  this.localgroupService.getAllLocalgroup().subscribe(localgroups =>
    this.localgroups = localgroups);
    
    
 }

 public add(): void {
   this.data.id = -1;
   this.memberService.addMember(this.data);
   this.snackBar.open('You have successfully added a new member ' + this.data.fullName, 'OK', { duration: 2500 });
 }

 public update(): void {
   this.memberService.updateMember(this.data);
   this.snackBar.open('You have successfully modified member ' + this.data.fullName, 'OK', { duration: 2500 });
 }

 public delete(): void {
   this.memberService.deleteMember(this.data.id);
   this.snackBar.open('You have successfully deleted member ' + this.data.fullName, 'OK', { duration: 2000 });
 }

 public cancel(): void {
   this.dialogRef.close();
   this.snackBar.open('Operation was canceled!', 'OK', { duration: 1000 });
 }

 public compareTo(a, b) {
   return a.id === b.id;
 }
}
