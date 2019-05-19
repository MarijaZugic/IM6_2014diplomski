import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EventService } from '../../services/event.service';
import { Localgroup } from '../../models/localgroup';
import { LocalgroupService } from '../../services/localgroup.service';
import {Event} from '../../models/event';


@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.css']
})
export class EventDialogComponent implements OnInit {
  public flag: number;
  events : Event[];
  minDate= new Date();

localgroups : Localgroup [];
  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<EventDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Event,
              public eventService : EventService,
              public  localgroupService : LocalgroupService) { }

  ngOnInit() {
    this.localgroupService.getAllLocalgroup().subscribe(localgroups =>
      this.localgroups = localgroups);
      
  }

  public add(): void {
    this.data.id = -1;
    this.eventService.addEvent(this.data);
    this.snackBar.open('You have successfully added a new event ', 'OK', {duration: 2500});
  }

  public update(): void {
    this.eventService.updateEvent(this.data);
    this.snackBar.open('You have successfully modified event' + this.data.eventName, 'OK', {duration: 2500});
  }

  public delete(): void {
    this.eventService.deleteEvent(this.data.id);
    this.snackBar.open('You have successfully deleted event ' + this.data.eventName, 'OK', {duration: 2500});
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Operation was canceled!', 'OK', {duration: 1000});
  }

  public compareTo(a, b) {
    return a.id === b.id;
  }

  public onChange(localgroup) {
    this.data.localgroup = localgroup;
  }

}
