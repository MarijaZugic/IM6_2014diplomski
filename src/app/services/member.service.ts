import { Injectable } from '@angular/core';
import { Member } from '../models/member';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MemberService {
    members: Member[];
    private readonly API_URL = 'http://localhost:8083/member/';
    private readonly API_URL_BYID = 'http://localhost:8083/membersFromLg/'
    // private readonly API_URL = 'http://localhost:8080/backend/member/';
    dataChange: BehaviorSubject<Member[]> = new BehaviorSubject<Member[]>([]);
    // privremeno cuvanje podataka iz dijaloga

    constructor(private httpClient: HttpClient) { }

    get data(): Member[] {
        return this.dataChange.value;
    }

    public getAllMember(): Observable<Member[]> {
        this.httpClient.get<Member[]>(this.API_URL).subscribe(data => {
            this.dataChange.next(data);
            this.members = data;
        },

            (error: HttpErrorResponse) => {
                console.log(error.name + ' ' + error.message);
            });
        return this.dataChange.asObservable();
    }

    public getMemberFromLg(idLocalgroup) : Observable<Member[]> {
        this.httpClient.get<Member[]> (this.API_URL_BYID + idLocalgroup).subscribe (data => {
            this.dataChange.next(data);
        },
        (error: HttpErrorResponse) => {
            console.log (error.name + ' ' + error.message);
        });
        return this.dataChange.asObservable();
    }



    public addMember(member: Member): void {
      this.httpClient.post(this.API_URL, member).subscribe(data => {
      });
    }

    public updateMember(member: Member): void { 
        console.log(member);
      this.httpClient.put(this.API_URL, member).subscribe(data => {

      });
    }

    public deleteMember(id: number): void {
      this.httpClient.delete(this.API_URL + id).subscribe(data => {

      });
    }
}
