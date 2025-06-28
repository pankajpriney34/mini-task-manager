import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { Task } from '../../../models/task.model';
import { selectFilter, selectAllTasks, selectCompletedTasks, selectIncompleteTasks } from '../../../store/tasks/task.selectors';
import * as TaskActions from '../../../store/tasks/task.actions';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MATERIAL_MODULES } from '../../shared/material.module';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, DragDropModule, MATERIAL_MODULES],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  tasks$!: Observable<Task[]>;
  constructor(private store: Store) {}

  ngOnInit(): void {
    // Load tasks from localStorage
    this.store.dispatch(TaskActions.loadTasks());

    // Subscribe to filtered tasks based on filter
    // this.tasks$ = this.store.select(TaskSelectors.selectAllTasks);
    // Switch based on filter from store , This will automatically update the task list when filter changes.
    this.store.select(selectFilter).subscribe(filter => {
      if (filter === 'all') {
        this.tasks$ = this.store.select(selectAllTasks);
      } else if (filter === 'completed') {
        this.tasks$ = this.store.select(selectCompletedTasks);
      } else {
        this.tasks$ = this.store.select(selectIncompleteTasks);
      }
    });
  }

  toggleComplete(id: string) {
    this.store.dispatch(TaskActions.toggleTask({ taskId: id }));
  }

  setFilter(filter: 'all' | 'completed' | 'incomplete') {
    this.store.dispatch(TaskActions.filterTasks({ filter }));
  }

  drop(event: CdkDragDrop<Task[]>) {
    let updatedTasks: Task[] = [];

    this.tasks$.pipe(take(1)).subscribe(tasks => {
      updatedTasks = [...tasks];
      moveItemInArray(updatedTasks, event.previousIndex, event.currentIndex);

      this.store.dispatch(TaskActions.reorderTasks({ tasks: updatedTasks }));
    });
  }

}
