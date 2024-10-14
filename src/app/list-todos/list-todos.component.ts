import { Component, OnInit } from '@angular/core';
import { Todo } from '../interface/Todo';
import { TaskService } from '../service/task.service';

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css'],
})
export class ListTodosComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe((data) => {
      this.todos = data;
    });
  }
}
