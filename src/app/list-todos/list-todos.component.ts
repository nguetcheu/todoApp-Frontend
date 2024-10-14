import { Component, OnInit } from '@angular/core';
import { Todo } from '../interface/Todo';
import { TaskService } from '../service/task.service';

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css'],
})
export class ListTodosComponent implements OnInit {
  todos: Todo[] = [
    {
      id: 1,
      description: 'Learn to Dance',
      done: false,
      targetDate: new Date(),
    },
    {
      id: 2,
      description: 'Become an Expert at Angular',
      done: false,
      targetDate: new Date(),
    },
    {
      id: 3,
      description: 'Visit india',
      done: false,
      targetDate: new Date(),
    },
  ];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe((data) => {
      this.todos = data;
    });
  }
}
