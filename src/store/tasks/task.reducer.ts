import { createReducer, on } from "@ngrx/store";
import * as TaskActions from "./task.actions";
import { Task } from "../../models/task.model";

// Define the shape of the task state
export interface TaskState {
  tasks: Task[];
  filter: 'all' | 'completed' | 'incomplete';
}

// Initial state
export const initialState: TaskState = {
  tasks: [],
  filter: 'all'
};

export const taskReducer = createReducer(
    initialState,

    on(TaskActions.addTask, (state, { task }) => {
        return {
        ...state,
        tasks: [...state.tasks, task]
        };
    }),

    // Toggle task completion
    on(TaskActions.toggleTask, (state, { taskId }) => ({
    ...state,
    tasks: state.tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
    )
    })),

    // Set tasks from localStorage
    on(TaskActions.setTasks, (state, { tasks }) => ({
        ...state,
        tasks
    })),

    // set the filter
    on(TaskActions.filterTasks, (state, { filter }) => ({
        ...state,
        filter
    })),

    //This replaces the tasks array with the new order.
    on(TaskActions.reorderTasks, (state, { tasks }) => ({
    ...state,
    tasks
    }))


);
