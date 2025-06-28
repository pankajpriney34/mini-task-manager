import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TaskListComponent } from './task-list.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';
import { Task } from '../../../models/task.model';
import * as TaskActions from '../../../store/tasks/task.actions';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {
  selectFilter,
  selectAllTasks,
  selectCompletedTasks,
  selectIncompleteTasks
} from '../../../store/tasks/task.selectors';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let store: MockStore;

  const mockTasks: Task[] = [
    { id: '1', title: 'Task 1', completed: false },
    { id: '2', title: 'Task 2', completed: true }
  ];

  const initialState = {
    taskState: {
      tasks: mockTasks,
      filter: 'all'
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListComponent],
      providers: [provideMockStore()]
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
    store.overrideSelector(selectFilter, 'all');
    store.overrideSelector(selectAllTasks, mockTasks);
    store.overrideSelector(selectCompletedTasks, []);
    store.overrideSelector(selectIncompleteTasks, []);

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all tasks', () => {
    const taskItems = fixture.debugElement.queryAll(By.css('.task-item'));
    expect(taskItems.length).toBe(2);
  });

  it('should dispatch toggleTask action on click', () => {
    spyOn(store, 'dispatch');
    component.toggleComplete('1');
    expect(store.dispatch).toHaveBeenCalledWith(TaskActions.toggleTask({ taskId: '1' }));
  });

  it('should dispatch filterTasks action on setFilter()', () => {
    spyOn(store, 'dispatch');
    component.setFilter('completed');
    expect(store.dispatch).toHaveBeenCalledWith(TaskActions.filterTasks({ filter: 'completed' }));
  });

  it('should dispatch reorderTasks on drop()', () => {
    spyOn(store, 'dispatch');
    const mockReorderTasks: Task[] = [
      { id: '1', title: 'Task 1', completed: false },
      { id: '2', title: 'Task 2', completed: true }
    ];

    // Ensure tasks$ emits mock data
    component.tasks$ = of(mockReorderTasks);

    const mockDropEvent: CdkDragDrop<Task[]> = {
      previousIndex: 0,
      currentIndex: 1,
      item: {} as any,
      container: {} as any,
      previousContainer: {} as any,
      isPointerOverContainer: false,
      distance: { x: 0, y: 0 },
      dropPoint: { x: 0, y: 0 },
      event: {} as MouseEvent 
    };

    component.drop(mockDropEvent);
    expect(store.dispatch).toHaveBeenCalledWith(
      jasmine.objectContaining({
        tasks: jasmine.any(Array)
      })
    );
  });

});
