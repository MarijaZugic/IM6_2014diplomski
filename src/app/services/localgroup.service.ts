import { Injectable } from '@angular/core';
import { Localgroup } from '../models/localgroup';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LocalgroupComponent } from '../components/localgroup/localgroup.component';
import { Local } from 'protractor/built/driverProviders';

@Injectable()
export class LocalgroupService {
    localgroups: Localgroup[];
    
    private readonly API_URL = 'http://localhost:8083/localgroup/';
    // private readonly API_URL = 'http://localhost:8080/backend/localgroup/';
    dataChange: BehaviorSubject<Localgroup[]> = new BehaviorSubject<Localgroup[]>([]);
    // privremeno cuvanje podataka iz dijaloga

    constructor(private httpClient: HttpClient) { }
   

    get data(): Localgroup[] {
        return this.dataChange.value;
    }

    public getAllLocalgroup (): Observable<Localgroup[]> {
        this.httpClient.get<Localgroup[]>(this.API_URL).subscribe(data => {
            this.dataChange.next(data);
            this.localgroups = data;
        },

            (error: HttpErrorResponse) => {
                console.log(error.name + ' ' + error.message);
            });
        return this.dataChange.asObservable();
    }


}
