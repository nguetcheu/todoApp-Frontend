import { Component, OnInit } from '@angular/core';
import { Todo } from '../interface/Todo';
import { TaskService } from '../service/task.service';

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css'],
})
export class ListTodosComponent implements OnInit {
  message!: string;
  todos: Todo[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.refreshTodos();
  }

  refreshTodos() {
    this.taskService.getTasks().subscribe((data) => {
      this.todos = data;
    });
  }

  deleteTodo(todoId: number) {
    this.taskService.deleteTask(todoId).subscribe((response) => {
      console.log(response);
      this.message = `Delete of todo ${todoId} succesfull`;
      this.refreshTodos();
    });
  }
}
