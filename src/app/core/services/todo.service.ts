import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  collectionData
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(
    private firestore: Firestore,
    private authService: AuthService
  ) {}

  getTasks(): Observable<Task[]> {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      throw new Error('Usuario no autenticado');
    }

    const tasksCollection = collection(this.firestore, `users/${currentUser.uid}/tasks`);
    const tasksQuery = query(tasksCollection, orderBy('createdAt', 'desc'));

    return collectionData(tasksQuery, { idField: 'id' }) as Observable<Task[]>;
  }

  async addTask(taskData: Partial<Task>): Promise<void> {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      throw new Error('Usuario no autenticado');
    }

    const tasksCollection = collection(this.firestore, `users/${currentUser.uid}/tasks`);

    const newTask: Omit<Task, 'id'> = {
      description: taskData.description,
      startTime: taskData.startTime,
      endTime: taskData.endTime,
      repeatDays: taskData.repeatDays,
      completed: false,
      createdAt: new Date(),
      userId: currentUser.uid
    };

    await addDoc(tasksCollection, newTask);
  }

  async updateTask(taskId: string, updates: Partial<Task>): Promise<void> {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      throw new Error('Usuario no autenticado');
    }

    const taskDoc = doc(this.firestore, `users/${currentUser.uid}/tasks/${taskId}`);
    await updateDoc(taskDoc, updates);
  }

  async toggleTaskComplete(taskId: string, completed: boolean): Promise<void> {
    await this.updateTask(taskId, { completed });
  }

  async deleteTask(taskId: string): Promise<void> {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      throw new Error('Usuario no autenticado');
    }

    const taskDoc = doc(this.firestore, `users/${currentUser.uid}/tasks/${taskId}`);
    await deleteDoc(taskDoc);
  }
}
