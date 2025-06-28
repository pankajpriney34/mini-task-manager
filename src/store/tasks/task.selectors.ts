import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TaskState } from './task.reducer';
import { Task } from '../../models/task.model';

// Select the entire task state
export const selectTaskState = createFeatureSelector<TaskState>('taskState');

// Select all tasks
export const selectAllTasks  = createSelector(
    selectTaskState,
    (state: TaskState) => state.tasks
);

// Select filter
export const selectFilter = createSelector(
    selectTaskState,
    (state: TaskState) => state.filter
);

// Select completed tasks
export const selectCompletedTasks = createSelector(
    selectAllTasks,
    (tasks: Task[]) => tasks.filter(task => task.completed)
);
    
// Select incomplete tasks
export const selectIncompleteTasks = createSelector(
  selectAllTasks,
  (tasks: Task[]) => tasks.filter(task => !task.completed)
);

