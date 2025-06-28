import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { v4 as uuidv4 } from 'uuid';
import * as TaskActions from '../../../store/tasks/task.actions';
import { CommonModule } from '@angular/common';
import { addTask } from '../../../store/tasks/task.actions';
import { MATERIAL_MODULES } from '../../shared/material.module';

@Component({
  selector: 'app-add-task',
  imports: [CommonModule, ReactiveFormsModule, MATERIAL_MODULES],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
  taskForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  addTask(): void {
    if (this.taskForm.valid) {
      const title = this.taskForm.value.title;

      this.store.dispatch(TaskActions.addTask({
        task: {
          id: uuidv4(),
          title,
          completed: false
        }
      }));

      this.taskForm.reset();
    }
  }

  onSubmit(): void {
    if (this.taskForm.invalid) return;

    const task = {
      id: Date.now().toString(),
      title: this.taskForm.value.title,
      completed: false
    };

    this.store.dispatch(addTask({ task }));
    this.taskForm.reset();
  }

}
