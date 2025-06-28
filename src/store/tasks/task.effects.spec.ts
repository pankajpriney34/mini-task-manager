import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { TaskEffects } from './task.effects';
import * as TaskActions from './task.actions';
import { provideMockStore } from '@ngrx/store/testing';
import { Task } from '../../models/task.model';

describe('TaskEffects', () => {
  let actions$: Observable<any>;
  let effects: TaskEffects;

  const mockTasks: Task[] = [
    { id: '1', title: 'Task 1', completed: false },
    { id: '2', title: 'Task 2', completed: true },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TaskEffects,
        provideMockActions(() => actions$),
        provideMockStore({
          initialState: {
            taskState: {
              tasks: mockTasks,
              filter: 'all'
            }
          }
        }),
      ],
    });

    effects = TestBed.inject(TaskEffects);
  });

  describe('loadTasks$', () => {
    it('should dispatch loadTasksSuccess when localStorage has tasks', (done) => {
      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockTasks));

      actions$ = of(TaskActions.loadTasks());

      effects.loadTasks$.subscribe((action) => {
        expect(action).toEqual(TaskActions.setTasks({ tasks: mockTasks }));
        done();
      });
    });

    it('should dispatch loadTasksSuccess with empty array if localStorage empty', (done) => {
      spyOn(localStorage, 'getItem').and.returnValue(null);

      actions$ = of(TaskActions.loadTasks());

      effects.loadTasks$.subscribe((action) => {
        expect(action).toEqual(TaskActions.setTasks({ tasks: [] }));
        done();
      });
    });
  });

  describe('saveTasks$', () => {
    it('should save tasks to localStorage on addTask', (done) => {
      spyOn(localStorage, 'setItem');

      const state = {
        tasks: mockTasks,
        filter: 'all',
      };

    //   TestBed.overrideProvider(provideMockStore, {
    //     useValue: {
    //       select: () => of(mockTasks),
    //     },
    //   });

      actions$ = of(TaskActions.addTask({ task: mockTasks[0] }));

      effects.saveTasks$.subscribe(() => {
        expect(localStorage.setItem).toHaveBeenCalledWith('tasks', JSON.stringify(mockTasks));
        done();
      });
    });
  });
});
