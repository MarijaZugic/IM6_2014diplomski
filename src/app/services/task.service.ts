import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TaskService {
    tasks: Task[];
    private readonly API_URL = 'http://localhost:8083/task/';
    private readonly API_URL_BYID = 'http://localhost:8083/tasksInField/';
    // private readonly API_URL = 'http://localhost:8080/backend/task/';
    dataChange: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
    // privremeno cuvanje podataka iz dijaloga

    constructor(private httpClient: HttpClient) { }

    get data(): Task[] {
        return this.dataChange.value;
    }

    public getAllTask(): Observable<Task[]> {
        this.httpClient.get<Task[]>(this.API_URL).subscribe(data => {
            this.dataChange.next(data);
            this.tasks = data;
        },

            (error: HttpErrorResponse) => {
                console.log(error.name + ' ' + error.message);
            });
        return this.dataChange.asObservable();
    }

    public getTasksInField(idField) : Observable<Task[]> {
        this.httpClient.get<Task[]> (this.API_URL_BYID + idField).subscribe (data => {
            this.dataChange.next(data);
        },
        (error: HttpErrorResponse) => {
            console.log (error.name + ' ' + error.message);
        });
        return this.dataChange.asObservable();
    }

    public getTasksForMember (idMember) : Observable<Task[]> {
        this.httpClient.get<Task[]> (this.API_URL_BYID + idMember).subscribe (data => {
            this.dataChange.next(data);
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
        return this.dataChange.asObservable();
    }

    public addTask(task: Task): void {
      this.httpClient.post(this.API_URL, task).subscribe(data => {
      });
    }

    public updateTask(task: Task): void {
      this.httpClient.put(this.API_URL, task).subscribe(data => {

      });
    }

    public deleteTask(id: number): void {
      this.httpClient.delete(this.API_URL + id).subscribe(data => {

      });
    }
}
