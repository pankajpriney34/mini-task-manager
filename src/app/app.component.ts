import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskListComponent } from './containers/task-list/task-list.component';
import { AddTaskComponent } from './containers/add-task/add-task.component';
// import { MatToolbarModule } from '@angular/material/toolbar';
import { MATERIAL_MODULES } from '../app/shared/material.module';

@Component({
  selector: 'app-root',
  imports: [ TaskListComponent, AddTaskComponent, MATERIAL_MODULES ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mini-task-manager';
}
