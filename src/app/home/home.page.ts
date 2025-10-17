import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { TodoService } from '../core/services/todo.service';
import { Task } from '../core/models/task.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit, OnDestroy {
  userName: string | null = null;
  tasks: Task[] = [];
  displayTasks: Task[] = [];
  private tasksSubscription?: Subscription;

  constructor(
    private authService: AuthService,
    private todoService: TodoService
  ) {}

  ngOnInit() {
    const currentUser = this.authService.getCurrentUser();
    this.userName = currentUser?.displayName || currentUser?.email || null;
    this.loadTasks();
  }

  ngOnDestroy() {
    if (this.tasksSubscription) {
      this.tasksSubscription.unsubscribe();
    }
  }

  private loadTasks(): void {
    try {
      this.tasksSubscription = this.todoService.getTasks().subscribe({
        next: (tasks) => {
          this.tasks = tasks.filter(task => !task.completed);
          this.displayTasks = this.tasks.slice(0, 5);
        },
        error: (error) => {
          console.error('Error al cargar tareas:', error);
        }
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async toggleTaskComplete(task: Task): Promise<void> {
    if (task.id) {
      try {
        const newCompletedState = !task.completed;
        await this.todoService.toggleTaskComplete(task.id, newCompletedState);
      } catch (error) {
        console.error('Error al actualizar tarea:', error);
      }
    }
  }

  truncateDescription(description: string | undefined): string {
    if (!description) return '';
    return description.length > 25 ? description.substring(0, 25) + '...' : description;
  }
}
