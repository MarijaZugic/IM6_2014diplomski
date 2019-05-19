import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {Task} from '../../models/task';
import {Field} from '../../models/field';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import {TaskService} from '../../services/task.service';
import {TaskDialogComponent} from '../../dialogs/task-dialog/task-dialog.component';
import {Member} from '../../models/member';
import {Event} from '../../models/event';

@Component({
  selector: 'app-task', 
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  displayedColumns = [ 'description', 'event', 'member', 'finished', 'actions'];
  dataSource : MatTableDataSource<Task>;
  selectedTask : Task;


    
  @Input() selectedField : Field;
  @ViewChild (MatPaginator) paginator : MatPaginator;
  @ViewChild (MatSort) sort : MatSort;

  constructor(public taskService : TaskService, public dialog : MatDialog) { }

  ngOnInit() {
 
  }

  ngOnChanges () {
    if (this.selectedField.id) {
      this.loadData();
    }
  }

  public loadData() {
    this.taskService.getTasksInField(this.selectedField.id).subscribe (data => {
      this.dataSource = new MatTableDataSource<Task> (data);
     
      this.dataSource.filterPredicate =(data, filter : string) => {
        const accumulator = (currentTerm, key) => {
          return key === 'event' ? currentTerm + data.event.eventName : currentTerm + data [key]
        };
        const dataStr = Object.keys(data).reduce(accumulator, ' ').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

      
       this.dataSource.sortingDataAccessor = (data,property) => {
        switch (property) {
          case 'member' : return data.member.fullName.toLocaleLowerCase();
          default : return data [property].toLocaleLowerCase();
        }
      }; 
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    });



    this.taskService.getTasksForMember (this.selectedField.id).subscribe (data => {
      this.dataSource = new MatTableDataSource<Task> (data);
     
      this.dataSource.filterPredicate =(data, filter : string) => {
        const accumulator = (currentTerm, key) => {
          return key === 'member' ? currentTerm + data.member.fullName : currentTerm + data [key]
        };
        const dataStr = Object.keys(data).reduce(accumulator, ' ').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

      
       this.dataSource.sortingDataAccessor = (data,property) => {
        switch (property) {
          case 'member' : return data.member.fullName.toLocaleLowerCase();
          default : return data [property].toLocaleLowerCase();
        }
      }; 
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public openDialog(flag: number, id: number, description: string, event: Event, field: Field,
     member : Member, finished : boolean) {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      data: {
        id: id, description: description, event: event, field: field,
        member: member, finished: finished
      }
    });
    dialogRef.componentInstance.flag = flag;
    if (flag === 1 || flag  ) {
      dialogRef.componentInstance.data.field = this.selectedField;
   }
    
    
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    });
  }


}
