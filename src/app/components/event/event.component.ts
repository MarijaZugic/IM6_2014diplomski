import { Component, OnInit, ViewChild} from '@angular/core';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { EventDialogComponent } from '../../dialogs/event-dialog/event-dialog.component';
import { Localgroup } from '../../models/localgroup';
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  displayedColumns =[ 'eventName', 'edateStart', 'numberOfDays', 'participants', 'localgroup', 'actions'];
  dataSource : MatTableDataSource <Event>;
  selectedEvent : Event;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(public eventService : EventService, public dialog : MatDialog) { }

  ngOnInit() {
    this.loadData();

  }

  public loadData() {
    this.eventService.getAllEvent().subscribe (data => {
      this.dataSource= new MatTableDataSource<Event> (data);


      this.dataSource.filterPredicate = (data, filter : string) => {
        const accumulator =(currentTerm, key) => {
          return key === 'localgroup' ? currentTerm + data.localgroup.name : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

      // sortiranje po nazivu ugnježdenog objekta
      // tslint:disable-next-line:no-shadowed-variable
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch (property) {
          case 'localgroup': return data.localgroup.name.toLocaleLowerCase();
          default: return data[property];
        }
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public openDialog(flag: number, id: number, eventName : string, localgroup: Localgroup, edateStart:Date, 
    numberOfDays:number, participants:number) {
    const dialogRef = this.dialog.open(EventDialogComponent, {
      data: { id: id, eventName: eventName, localgroup : localgroup, edateStart : edateStart,
         numberOfDays :numberOfDays, participants :participants}
    });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
     if (result === 1) {
        this.loadData();
      }
    });
  }

  public selectRow(row) {
    this.selectedEvent = row;
  }
}