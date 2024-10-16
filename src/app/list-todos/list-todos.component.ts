import { Component, OnInit } from '@angular/core';
import { Todo } from '../interface/Todo';
import { TaskService } from '../service/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css'],
})
export class ListTodosComponent implements OnInit {
  message!: string;
  todos: Todo[] = [];

  constructor(private router: Router, private taskService: TaskService) {}

  ngOnInit() {
    this.refreshTodos();
  }

  refreshTodos() {
    this.taskService.getTasks().subscribe((data) => {
      this.todos = data;
    });
  }

  updateTodo(id: number) {
    this.router.navigate(['todo', id]);
  }

  deleteTodo(todoId: number) {
    this.taskService.deleteTask(todoId).subscribe((response) => {
      console.log(response);
      this.message = `Delete of todo ${todoId} succesfull`;
      this.refreshTodos();
    });
  }

  addTodo() {
    this.router.navigate(['todo', -1]);
  }
}
