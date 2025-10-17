import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Task } from '../../../core/models/task.model';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
  standalone: false
})
export class TaskModalComponent implements OnInit {
  @Input() task?: Task;
  taskForm: FormGroup;

  weekDays = [
    { value: 0, label: 'Dom', selected: false },
    { value: 1, label: 'Lun', selected: false },
    { value: 2, label: 'Mar', selected: false },
    { value: 3, label: 'Mié', selected: false },
    { value: 4, label: 'Jue', selected: false },
    { value: 5, label: 'Vie', selected: false },
    { value: 6, label: 'Sáb', selected: false }
  ];

  constructor(
    private fb: FormBuilder,
    private modalController: ModalController
  ) {
    this.taskForm = this.fb.group({
      description: ['', Validators.required],
      startTime: [''],
      endTime: [''],
      repeatDays: [[]]
    });
  }

  ngOnInit() {
    if (this.task) {
      this.taskForm.patchValue({
        description: this.task.description || '',
        startTime: this.task.startTime || '',
        endTime: this.task.endTime || '',
        repeatDays: this.task.repeatDays || []
      });

      if (this.task.repeatDays) {
        this.weekDays.forEach(day => {
          day.selected = this.task!.repeatDays!.includes(day.value);
        });
      }
    }
  }

  toggleDay(day: any) {
    day.selected = !day.selected;
    const selectedDays = this.weekDays
      .filter(d => d.selected)
      .map(d => d.value);
    this.taskForm.patchValue({ repeatDays: selectedDays });
  }

  cancel() {
    this.modalController.dismiss(null, 'cancel');
  }

  save() {
    if (this.taskForm.valid) {
      const taskData = {
        ...this.task,
        ...this.taskForm.value
      };
      this.modalController.dismiss(taskData, 'save');
    }
  }

  get isEditMode(): boolean {
    return !!this.task;
  }
}
