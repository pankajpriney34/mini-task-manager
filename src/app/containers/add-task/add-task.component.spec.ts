import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskComponent } from './add-task.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import * as TaskActions from '../../../store/tasks/task.actions';

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTaskComponent],
      providers: [provideMockStore()]
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    component.taskForm.setValue({ title: '' });
    expect(component.taskForm.invalid).toBeTrue();
  });

  it('form should be valid when title is filled', () => {
    component.taskForm.setValue({ title: 'Test Task' });
    expect(component.taskForm.valid).toBeTrue();
  });

  it('should dispatch addTask action on valid submit', () => {
    spyOn(store, 'dispatch');

    component.taskForm.setValue({ title: 'New Task' });
    component.onSubmit();

    expect(store.dispatch).toHaveBeenCalledWith(
      jasmine.objectContaining({
        type: '[Task] Add Task',
        task: jasmine.objectContaining({ title: 'New Task' })
      })
    );
  });
});
