import { createAction, props } from '@ngrx/store';
import { Task } from '../../models/task.model';

//adding a task here
export const addTask = createAction(
  '[Task] Add Task',
  props<{ task: Task }>()
);

// Tooggle task completed or incompleted
export const toggleTask = createAction(
  '[Task] Toggle Task',
  props<{ taskId: string }>()
);

//load task from local storage
export const loadTasks = createAction('[Task] Load Tasks');

//set loaded tasks into state
export const setTasks = createAction(
  '[Task] Set Tasks',
  props<{ tasks: Task[] }>()
);


//Filtering tasks by status (all, complete, incomplete)
export const filterTasks = createAction(
  '[Task] Filter Tasks',
  props<{ filter: 'all' | 'completed' | 'incomplete' }>()
);

// action for reorder
export const reorderTasks = createAction(
  '[Task] Reorder Tasks',
  props<{ tasks: Task[] }>()
);

