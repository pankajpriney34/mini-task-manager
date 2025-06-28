import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

//adding importing store effect reducer devtools
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { taskReducer } from '../store/tasks/task.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { TaskEffects } from '../store/tasks/task.effects';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideStore({ taskState: taskReducer }),
    provideEffects([TaskEffects]), // we'll add effects here later
    provideStoreDevtools() // enable Redux DevTools
  ]
};
