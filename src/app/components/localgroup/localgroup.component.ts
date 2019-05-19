import { Component, OnInit, ViewChild} from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import {Localgroup} from '../../models/localgroup';
import { LocalgroupService } from '../../services/localgroup.service';
import {Member} from '../../models/member';

@Component({
  selector: 'app-localgroup',
  templateUrl: './localgroup.component.html',
  styleUrls: ['./localgroup.component.css']
})
export class LocalgroupComponent implements OnInit {

  displayedColumns = ['id', 'name','country', 'city', 'university','email' ]
  dataSource: MatTableDataSource <Localgroup>;
  selectedLocalgroup : Localgroup;

  @ViewChild (MatPaginator) paginator: MatPaginator;
  @ViewChild (MatSort) sort: MatSort;


  constructor(public localgroupService : LocalgroupService, public dialog: MatDialog) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.localgroupService.getAllLocalgroup().subscribe(data => {
      this.dataSource = new MatTableDataSource<Localgroup>(data);

      // pretraga po nazivu ugnježdenog objekta
      // tslint:disable-next-line:no-shadowed-variable
      this.dataSource.filterPredicate = (data, filter: string) => {
        const accumulator = (currentTerm, key) => {
          return key === 'member' ? currentTerm + data.member.fullName : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

      // sortiranje po nazivu ugnježdenog objekta
      // tslint:disable-next-line:no-shadowed-variable
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch (property) {
          case 'member': return data.member.fullName.toLocaleLowerCase();
          case 'country': return data.country.country.toLocaleLowerCase();
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


  public selectRow(row) {
    this.selectedLocalgroup = row;
  }
 

}
