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

## 🛠 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/pankajpriney34/mini-task-manager
cd mini-task-manager
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Locally

```bash
ng serve
```

Navigate to `http://localhost:4200`

---

## 🐳 Run with Docker

### 1. Build the Image

```bash
docker build -t mini-task-manager .
```

### 2. Run the Container

```bash
docker run --name mini-task-container -p 4200:80 mini-task-manager
```

Now open `http://localhost:4200` to view it.

---

## 🧪 Run Unit Tests

```bash
ng test
```

Tests include:
- TaskListComponent
- AddTaskComponent
- Reducer
- Effect
- Selector

---

## Architectural Overview

- **NgRx** manages global state (actions, reducer, selector, effects)
- **Tasks stored in localStorage** via side effects
- **Reactive Forms** used for task input
- **Standalone Components** used with Angular 19's new config system

---

## Known Issues / Limitations

- No backend — tasks persist only in `localStorage`
- Categories are minimal (basic filter only)
- Minor UI polish may be needed for production-level deployment

---

## Author

- Name: Pankaj Priney
- GitHub: [github.com/pankajpriney34](https://github.com/pankajpriney34)

### Folder structure
src/
├── app/
│   ├── components/       # Presentational components (AddTask)
│   ├── containers/       # Smart components (TaskList)
│   ├── store/            # NgRx logic: actions, reducer, effects, selectors
│   ├── shared/           # Material module common only
│   ├── models/           # Task model interface
│   └── app.config.ts     # Standalone app config with providers


