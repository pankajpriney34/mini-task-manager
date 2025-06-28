import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TaskActions from './task.actions';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { TaskState } from './task.reducer';
import { selectAllTasks } from './task.selectors';

// inject(Store) avoids timing issues with constructor injection
// Ensures NgRx store is fully ready before accessing select()
// Compatible with Angular’s standalone DI context

@Injectable()
export class TaskEffects {
  private actions$ = inject(Actions); //  inject instead of constructor
  private store = inject<Store<{ taskState: TaskState }>>(Store); //  safer store access
//   constructor(
//     private actions$: Actions,
//     private store: Store<{ taskState: TaskState }>
//   ) {}

  // Load tasks from localStorage and dispatch setTasks
  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      map(() => {
        const data = localStorage.getItem('tasks');
        const tasks = data ? JSON.parse(data) : [];
        return TaskActions.setTasks({ tasks });
      })
    )
  );

  // Save tasks to localStorage when added or toggled
  saveTasks$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TaskActions.addTask, TaskActions.toggleTask, TaskActions.reorderTasks),
        withLatestFrom(this.store.select(selectAllTasks)),
        tap(([action, tasks]) => {
          localStorage.setItem('tasks', JSON.stringify(tasks));
        })
      ),
    { dispatch: false }
  );
}
