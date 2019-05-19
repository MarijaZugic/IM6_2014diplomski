import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDatepicker } from '@angular/material';

import { MatSnackBar } from '@angular/material';

import { TaskService } from '../../services/task.service';
import { FieldService } from '../../services/field.service';
import { Task } from '../../models/task';
import { Field } from '../../models/field';
import { Event } from '../../models/event';
import { Member } from '../../models/member';
import { EventService } from '../../services/event.service';
import { MemberService } from '../../services/member.service';

@Component({
 selector: 'app-task-dialog',
 templateUrl: './task-dialog.component.html',
 styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent implements OnInit {
fields : Field [];
members : Member [];
events : Event [];

 public flag: number;
 constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<TaskDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Task,
              public taskService: TaskService,
              public fieldService : FieldService,
              public eventService : EventService,
              public memberService : MemberService
 ) { }


 ngOnInit() {
   this.fieldService.getAllField().subscribe(fields =>
     this.fields = fields);
     this.eventService.getAllEvent().subscribe(events =>
     this.events = events); 
    this.memberService.getAllMember().subscribe(members =>
      this.members = members); 
 }

  public add(): void {
   this.data.id = -1;
   console.log(this.data);
   this.taskService.addTask(this.data);
   this.snackBar.open('You have successfully added a new task', 'OK', { duration: 2500 });
  }

  public update(): void {
   this.taskService.updateTask(this.data);
   this.snackBar.open('You have successfully modified' + this.data.description +' task', 'OK', { duration: 2500 });
  }

  public delete(): void {
   this.taskService.deleteTask(this.data.id);
   this.snackBar.open('You have successfully deleted' + this.data.description +' task', 'OK', { duration: 2000 });
  }

  public cancel(): void {
   this.dialogRef.close();
   this.snackBar.open('Operation was canceled!', 'OK', { duration: 1000 });
  }

  public compareTo(a, b) {
   return a.id === b.id;
  }

  public onChange(member) {
  this.data.member = member;
  }
}
