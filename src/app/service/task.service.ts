import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../interface/Todo';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:8080/api/task';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.apiUrl}/all`);
  }

  getTaskById(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${this.apiUrl}/${id}`);
  }

  createTask(task: Todo): Observable<Todo> {
    return this.http.post<Todo>(`${this.apiUrl}/save`, task);
  }

  updateTask(id: number, task: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}/update/${id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
