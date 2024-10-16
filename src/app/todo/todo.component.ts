import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../service/task.service';
import { Todo } from '../interface/Todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  constructor(
    private router: ActivatedRoute,
    private taskService: TaskService,
    private route: Router
  ) {}

  todo!: Todo;

  idTodo!: number;

  ngOnInit() {
    this.idTodo = this.router.snapshot.params['id'];
    if (this.idTodo != undefined) {
      this.taskService.getTaskById(this.idTodo).subscribe((response) => {
        this.todo = response;
      });
    }
    this.todo = { id: 1, description: '', done: false, targetDate: new Date() };
  }

  saveTodo() {
    this.taskService
      .updateTask(this.idTodo, this.todo)
      .subscribe((response) => {
        console.log(response);
        this.route.navigate(['todos']);
      });
  }
}
