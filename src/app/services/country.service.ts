import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Country } from '../models/country';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable()
export class CountryService {
    countries: Country[];
    private readonly API_URL = 'http://localhost:8083/country/';
    // private readonly API_URL = 'http://localhost:8080/backend/country/';

    dataChange: BehaviorSubject<Country[]> = new BehaviorSubject<Country[]>([]);
    // privremeno cuvanje podataka iz dijaloga

    constructor(private httpClient: HttpClient) { }

    get data(): Country[] {
        return this.dataChange.value;
    }

    public getAllCountry() : Observable<Country[]> {
        this.httpClient.get<Country[]>(this.API_URL).subscribe(data => {
            this.dataChange.next(data);
            this.countries=data;
        },
        (error : HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        
        });
        return this.dataChange.asObservable();


    }

    //nije potrebno obezbediti da se dodaju brisu i modif zemlje




}