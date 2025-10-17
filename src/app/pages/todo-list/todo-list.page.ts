import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from '../../core/models/task.model';
import { TodoService } from '../../core/services/todo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalController } from '@ionic/angular';
import { TaskModalComponent } from '../../shared/components/task-modal/task-modal.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.page.html',
  styleUrls: ['./todo-list.page.scss'],
  standalone: false
})
export class TodoListPage implements OnInit, OnDestroy {
  tasks: Task[] = [];
  private tasksSubscription?: Subscription;

  constructor(
    private todoService: TodoService,
    private snackBar: MatSnackBar,
    private modalController: ModalController
  ) {}

  ngOnInit() {
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
          this.tasks = tasks;
        },
        error: (error) => {
          console.error('Error al cargar tareas:', error);
          this.showError('Error al cargar las tareas');
        }
      });
    } catch (error) {
      console.error('Error:', error);
      this.showError('Error al inicializar las tareas');
    }
  }

  async openTaskModal(task?: Task): Promise<void> {
    const modal = await this.modalController.create({
      component: TaskModalComponent,
      componentProps: { task },
      breakpoints: [0, 0.5, 0.8, 1],
      initialBreakpoint: 0.8
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'save' && data) {
      try {
        if (task && task.id) {
          // Editar tarea existente
          await this.todoService.updateTask(task.id, data);
          this.showSuccess('Tarea actualizada');
        } else {
          // Crear nueva tarea
          await this.todoService.addTask(data);
          this.showSuccess('Tarea creada');
        }
      } catch (error) {
        console.error('Error al guardar tarea:', error);
        this.showError('Error al guardar la tarea');
      }
    }
  }

  async toggleTodo(task: Task): Promise<void> {
    if (task.id) {
      try {
        const newCompletedState = !task.completed;
        await this.todoService.toggleTaskComplete(task.id, newCompletedState);
      } catch (error) {
        console.error('Error al actualizar tarea:', error);
        this.showError('Error al actualizar la tarea');
      }
    }
  }

  getWeekDayLabels(repeatDays: number[]): string[] {
    const dayLabels = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    return repeatDays
      .sort((a, b) => a - b)
      .map(day => dayLabels[day]);
  }

  async deleteTodo(task: Task): Promise<void> {
    if (task.id) {
      try {
        await this.todoService.deleteTask(task.id);
        this.showSuccess('Tarea eliminada');
      } catch (error) {
        console.error('Error al eliminar tarea:', error);
        this.showError('Error al eliminar la tarea');
      }
    }
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
