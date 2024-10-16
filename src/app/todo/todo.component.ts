import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../service/task.service';
import { Todo } from '../interface/Todo';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs'; // Pour la gestion d'erreurs simplifiée

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todo: Todo = {
    id: 0,
    description: '',
    done: false,
    targetDate: new Date(),
  };

  idTodo: number = 0;
  errorMessage: string = ''; // Message d'erreur

  constructor(
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idTodo = this.activatedRoute.snapshot.params['id'];
    this.initializeTodo();
  }

  // Initialiser la tâche à partir de l'ID ou en créer une nouvelle
  private initializeTodo(): void {
    if (this.idTodo !== -1) {
      this.taskService.getTaskById(this.idTodo)
        .pipe(
          catchError((error) => {
            this.errorMessage = "Erreur lors de la récupération de la tâche.";
            console.error(error);
            return of(null); // retourne un Observable null en cas d'erreur
          })
        )
        .subscribe((response: Todo | null) => {
          if (response) {
            this.todo = response;
          }
        });
    }
  }

  // Enregistrer la tâche (nouvelle ou mise à jour)
  saveTodo(): void {
    if (this.isCreatingNewTodo()) {
      this.createTodo();
    } else {
      this.updateTodo();
    }
  }

  // Vérifie si c'est une nouvelle tâche
  private isCreatingNewTodo(): boolean {
    return this.idTodo == -1;
  }

  // Crée une nouvelle tâche
  private createTodo(): void {
    this.taskService.createTask(this.todo)
      .pipe(
        catchError((error) => {
          this.errorMessage = "Erreur lors de la création de la tâche.";
          console.error(error);
          return of(null);
        })
      )
      .subscribe((newTodo: Todo | null) => {
        if (newTodo) {
          console.log('Tâche créée avec succès:', newTodo);
          this.redirectToTodoList();
        }
      });
  }

  // Met à jour une tâche existante
  private updateTodo(): void {
    this.taskService.updateTask(this.idTodo, this.todo)
      .pipe(
        catchError((error) => {
          this.errorMessage = "Erreur lors de la mise à jour de la tâche.";
          console.error(error);
          return of(null);
        })
      )
      .subscribe((updatedTodo: Todo | null) => {
        if (updatedTodo) {
          console.log('Tâche mise à jour avec succès:', updatedTodo);
          this.redirectToTodoList();
        }
      });
  }

  // Redirige vers la liste des tâches
  private redirectToTodoList(): void {
    this.router.navigate(['todos']);
  }
}
