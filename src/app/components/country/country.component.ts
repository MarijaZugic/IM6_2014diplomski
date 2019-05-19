import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { CountryService } from '../../services/country.service';
import { Country } from '../../models/country';
import { MatDialog, MatTableDataSource, MatTab, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  displayedColumns = ['id', 'name'];
  exampleDatabase : CountryService;
  dataSource : MatTableDataSource<Country>;

  @ViewChild (MatPaginator) paginator : MatPaginator;
  @ViewChild (MatSort) sort : MatSort;

  constructor(public httpClient : HttpClient,
            public countryService : CountryService) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.countryService.getAllCountry().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);

      //ignorisi mala/velika slova pri sort ali za ID ne prebacuje u malo veliko 
      //tsling:disable-next-line:no-shadowed-variable
      this.dataSource.sortingDataAccessor =( data, property) => {
        switch (property) {
          case 'id' : return data [property];
          default : return data [property].toLocaleLowerCase();
        }
      };

      this.dataSource.paginator= this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  //za country nemam dijaloge jer necu ni da dodajem nove ni menjam postojece


}
