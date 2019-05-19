import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import {Field} from '../../models/field';
import {FieldService} from '../../services/field.service';
import {FieldDialogComponent} from '../../dialogs/field-dialog/field-dialog.component';


@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {
  
  displayedColumns =[ 'id', 'name', 'actions'];
  dataSource : MatTableDataSource <Field>;
  selectedField : Field;


  @ViewChild (MatPaginator) paginator : MatPaginator;
  @ViewChild (MatSort) sort : MatSort;

  constructor(public fieldService : FieldService, public dialog: MatDialog ) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData(){
    this.fieldService.getAllField().subscribe (data => {
      this.dataSource = new MatTableDataSource<Field>(data);

      // pretraga po nazivu ugnježdenog objekta
      // tslint:disable-next-line:no-shadowed-variable
      this.dataSource.filterPredicate = (data, filter: string) => {
        const accumulator = (currentTerm, key) => {
          return key === 'task' ? currentTerm + data.task.field : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

      // sortiranje po nazivu ugnježdenog objekta
      // tslint:disable-next-line:no-shadowed-variable
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch (property) {
          case 'field': return data.task.description.toLocaleLowerCase();
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

  public openDialog(flag: number, id: number, name: String) {
    const dialogRef = this.dialog.open(FieldDialogComponent, {
      data: {  id: id, name : name}
    });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    });
  }

  public selectRow(row) {
    this.selectedField = row;
  }
}

