import * as Selectors from './task.selectors';
import { Task } from '../../models/task.model';

describe('Task Selectors', () => {
  const mockTasks: Task[] = [
    { id: '1', title: 'Learn Angular', completed: true },
    { id: '2', title: 'Write Tests', completed: false }
  ];

    const state: { taskState: { tasks: Task[], filter: 'all' | 'completed' | 'incomplete' } } = {
        taskState: {
            tasks: mockTasks,
            filter: 'completed'
        }
    };


  it('should select all tasks', () => {
    const result = Selectors.selectAllTasks.projector(state.taskState);
    expect(result.length).toBe(2);
  });

  it('should select completed tasks', () => {
    const result = Selectors.selectCompletedTasks.projector(mockTasks);
    expect(result.length).toBe(1);
    expect(result[0].completed).toBeTrue();
  });

  it('should select incomplete tasks', () => {
    const result = Selectors.selectIncompleteTasks.projector(mockTasks);
    expect(result.length).toBe(1);
    expect(result[0].completed).toBeFalse();
  });

  it('should select filter value', () => {
    const result = Selectors.selectFilter.projector(state.taskState);
    expect(result).toBe('completed');
  });
});
