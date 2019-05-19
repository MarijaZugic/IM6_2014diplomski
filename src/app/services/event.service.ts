import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Event } from '../models/event';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EventService {
    events: Event[];
    private readonly API_URL = 'http://localhost:8083/event/';
    // private readonly API_URL = 'http://localhost:8080/backend/event/';

    dataChange: BehaviorSubject<Event[]> = new BehaviorSubject<Event[]>([]);
    // privremeno cuvanje podataka iz dijaloga

    constructor(private httpClient: HttpClient) { }

    get data(): Event[] {
        return this.dataChange.value;
    }

    public getAllEvent(): Observable<Event[]> {
        this.httpClient.get<Event[]>(this.API_URL).subscribe(data => {
            this.dataChange.next(data);
            this.events = data;
        },

            (error: HttpErrorResponse) => {
                console.log(error.name + ' ' + error.message);
            });
        return this.dataChange.asObservable();
        }

    public addEvent (event : Event) : void {
        this.httpClient.post(this.API_URL, event).subscribe (data => {

        });
    }

    public updateEvent(event: Event): void {
        this.httpClient.put(this.API_URL, event).subscribe(data => {
  
        });
      }
  
      public deleteEvent(id: number): void {
        this.httpClient.delete(this.API_URL + id).subscribe(data => {
  
        });
      }
    
}
