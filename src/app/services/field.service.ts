import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Field } from '../models/field';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FieldService {
    fields: Field[];
    private readonly API_URL = 'http://localhost:8083/field/';
    // private readonly API_URL = 'http://localhost:8080/backend/field/';

    dataChange: BehaviorSubject<Field[]> = new BehaviorSubject<Field[]>([]);
    // privremeno cuvanje podataka iz dijaloga

    constructor(private httpClient: HttpClient) { }

    get data(): Field[] {
        return this.dataChange.value;
    }

    public getAllField(): Observable<Field[]> {
        this.httpClient.get<Field[]>(this.API_URL).subscribe(data => {
            this.dataChange.next(data);
            this.fields = data;
        },

            (error: HttpErrorResponse) => {
                console.log(error.name + ' ' + error.message);
            });
        return this.dataChange.asObservable();
    }
    public addField (field : Field) : void {
        this.httpClient.post(this.API_URL,field).subscribe(data => {

        });
    }

    public updateField (field:Field) : void {
        this.httpClient.put(this.API_URL,field).subscribe(date => {

        });
    }

    //da li da dodam i delete field
    public deleteField(id : number): void {
        this.httpClient.delete(this.API_URL + id).subscribe(data => {
  
        });
      }
}