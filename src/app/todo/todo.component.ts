import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private taskService: TaskService
  ) {}

  todo!: Todo;

  idTodo!: number;

  ngOnInit() {
    this.idTodo = this.router.snapshot.params['id'];
    this.taskService.getTaskById(this.idTodo).subscribe((response) => {
      this.todo = response;
    });
  }
}
