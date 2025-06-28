# Mini Task Manager

A simple task management app built with Angular 19, NgRx for state management, RxJS for reactivity, and Docker for deployment.

---

## Features

- Add, view, and manage tasks
- Mark tasks as complete/incomplete
- Filter tasks by status
- Drag & drop to reorder
- Global state management with NgRx
- Task persistence via `localStorage`
- Responsive design using Angular Material + Tailwind CSS
- Unit tests for component and store logic
- Dockerized for easy deployment

---

## Tech Stack

- **Angular 19**
- **NgRx** (Store, Effects, Selectors)
- **RxJS**
- **Angular Material + Tailwind**
- **Docker**
- **Jasmine + Karma** (Unit Testing)

---

## Project Setup

### Install Dependencies

```bash
npm install


## Run Locally
ng serve

## URL
Then  URL open: http://localhost:4200

##FOR TEST run on terminal 

ng test

### Build Docker Image
```bash
docker build -t mini-task-manager .

### run the app
```bash
docker run -p 4200:80 mini-task-manager

### Folder structure
src/
├── app/
│   ├── components/       # Presentational components (AddTask)
│   ├── containers/       # Smart components (TaskList)
│   ├── store/            # NgRx logic: actions, reducer, effects, selectors
│   ├── shared/           # Material module, UI styles
│   ├── models/           # Task model interface
│   └── app.config.ts     # Standalone app config with providers


