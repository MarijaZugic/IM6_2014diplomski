import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Member } from '../../models/member';
import { Observable } from 'rxjs/Observable';
import { Localgroup} from '../../models/localgroup';
import { Task } from '../../models/task';
import { MemberDialogComponent } from '../../dialogs/member-dialog/member-dialog.component';
import { viewClassName } from '@angular/compiler';


@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  displayedColumns = [ 'fullName', 'birthday', 'actions'];
  dataSource : MatTableDataSource<Member>;
  selectedMember : Member;
 
  


  @Input () selectedLocalgroup : Localgroup;
  @ViewChild (MatPaginator) paginator : MatPaginator;
  @ViewChild (MatSort) sort : MatSort;
  constructor(public memberService : MemberService, public dialog :MatDialog) { }

  ngOnInit() {
  
  }

  ngOnChanges() {
    if (this.selectedLocalgroup.id) {
      this.loadData();
    }
  }

  public loadData() {
    this.memberService.getMemberFromLg(this.selectedLocalgroup.id).subscribe (data => {
        this.dataSource = new MatTableDataSource<Member> (data);
        //search by name of the nested object
    //   this.dataSource.filterPredicate = (data, filter :string) => {
     //     const accumulator = (currentTerm, key) => {
     //       return key === 'task' ? currentTerm + data.task.description.toLocaleLowerCase();
     //     };
     //     const dataStr = Object.keys(data).reduce(accumulator, ' ').toLowerCase();
      //    const transformatedFilter = filter.trim().toLowerCase();
     //     return dataStr.indexOf(transformatedFilter) !==-1;
     //   }; -->

        this.dataSource.sortingDataAccessor = (data, property) => {
        switch (property) {
          case 'task' : return data.task.description.toLocaleLowerCase();
          default : return data [property].toLocaleLowerCase();
        }
      };
        this.dataSource.paginator= this.paginator;
        this.dataSource.sort=this.sort;
    });
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public openDialog (flag: number, id: number, fullName : string, birthday:Date, localgroup: Localgroup) {
    const dialogRef = this.dialog.open (MemberDialogComponent, {
      data: {
         id:id, fullName : fullName , birthday:birthday, selectedLocalgroup:localgroup
      }
    });
    dialogRef.componentInstance.flag =flag;
    //if (flag ===1) {
      dialogRef.componentInstance.data.localgroup= this.selectedLocalgroup;
   // }
    dialogRef.afterClosed().subscribe(result => {
      if (result ===1 ) {
        this.loadData();
      }
    });
  }

  public selectRow (row) {
    this.selectedMember = row;
  } 

}
