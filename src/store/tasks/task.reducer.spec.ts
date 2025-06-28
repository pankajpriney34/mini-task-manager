import { taskReducer, initialState } from './task.reducer';
import * as TaskActions from './task.actions';
import { Task } from '../../models/task.model';

describe('Task Reducer', () => {
  it('should return the initial state', () => {
    const action = { type: 'Unknown' } as any;
    const state = taskReducer(undefined, action);
    expect(state).toBe(initialState);
  });

  it('should add a task', () => {
    const newTask: Task = { id: '1', title: 'Test Task', completed: false };
    const action = TaskActions.addTask({ task: newTask });

    const state = taskReducer(initialState, action);
    expect(state.tasks.length).toBe(1);
    expect(state.tasks[0]).toEqual(newTask);
  });

  it('should toggle a task', () => {
    const task: Task = { id: '1', title: 'Test', completed: false };
    const stateWithTask = {
      ...initialState,
      tasks: [task]
    };
    const action = TaskActions.toggleTask({ taskId: '1' });
    const state = taskReducer(stateWithTask, action);

    expect(state.tasks[0].completed).toBe(true);
  });

  it('should reorder tasks', () => {
    const t1 = { id: '1', title: 'A', completed: false };
    const t2 = { id: '2', title: 'B', completed: false };
    const action = TaskActions.reorderTasks({ tasks: [t2, t1] });

    const result = taskReducer({ ...initialState, tasks: [t1, t2] }, action);
    expect(result.tasks[0].id).toBe('2');
  });
});
