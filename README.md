# MERN Stack To-Do List

A full-stack To-Do List built with React (Vite), Node.js, Express, and MongoDB/Mongoose. All task actions use the REST API; the browser does not use `localStorage`.

## Requirements
- Node.js 18+ and npm
- MongoDB local instance or a MongoDB Atlas connection string
- Git (for the GitHub portion)

## Project structure
```text
MERN_ToDoList_Assignment/
├── backend/
│   ├── models/Task.js
│   ├── routes/tasks.js
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/TaskForm.jsx
│   │   ├── components/TaskItem.jsx
│   │   ├── components/TaskList.jsx
│   │   ├── App.jsx
│   │   ├── api.js
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── screenshots/
└── README.md
```

## 1. Configure MongoDB and backend
Open a terminal in `backend/`:

```bash
npm install
```

Copy `.env.example` to `.env` and set `MONGO_URI` to your own local or Atlas connection string. Never commit `.env`.

```env
MONGO_URI=mongodb://127.0.0.1:27017/mern_todo
PORT=5000
FRONTEND_ORIGIN=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

The API runs at `http://localhost:5000`. The server waits for a successful MongoDB connection before listening.

## 2. Start the React frontend
In a second terminal, open `frontend/`:

```bash
npm install
npm run dev
```

Open the URL Vite prints (normally `http://localhost:5173`).

## REST API
| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/tasks` | List tasks, newest first |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/:id` | Update title and/or completion status |
| DELETE | `/api/tasks/:id` | Delete a task |

POST body example: `{"title":"Finish assignment"}`  
PUT body example: `{"completed":true}` or `{"title":"Edited title"}`

Invalid/blank titles return `400`; malformed IDs return `400`; missing tasks return `404`; successful creation returns `201`. Errors are returned as JSON.

## GitHub workflow required by the assignment
The repository and PRs must be created from your own GitHub account. These are suggested steps; do not claim these are completed until you have actually done them.

1. Create a **public** GitHub repository and add this project.
2. Start from an initial branch and create `feature/backend`. Commit the backend in multiple meaningful commits.
3. Push `feature/backend` and open a pull request into `main`; merge it.
4. Create `feature/frontend` from the updated `main`, add/commit the frontend, push it, and open a second pull request into `main`; merge it.
5. Ensure `main` contains both folders. Keep `.env` and `node_modules` out of Git.
6. Capture a screenshot of GitHub's **Pull requests → Closed** tab after both PRs are merged.
7. Replace the included UI preview images with real screenshots from your running app showing task addition, completion, and deletion. The included images are previews, not evidence of a live app run.

Suggested commit sequence (make each commit as you complete the work):
- `Initial project structure and documentation`
- `Add MongoDB connection and Task model`
- `Add task GET and POST endpoints`
- `Add task PUT and DELETE endpoints`
- `Build React task form and list`
- `Connect task actions to REST API`
- `Polish UI and document setup`

## Testing checklist
- [ ] MongoDB is running / Atlas URI is valid
- [ ] Backend starts without connection errors
- [ ] Frontend starts and loads tasks from the API
- [ ] Add, complete/uncomplete, edit title, and delete each work
- [ ] Blank task title is rejected
- [ ] No CORS or browser-console errors
- [ ] Real app screenshots and merged-PR screenshot added
- [ ] GitHub URL added to your submission notes
- [ ] Zip excludes `node_modules` and `.env`

## Submission
Rename the zip to the required format:
`RollNo_Name_Assignment2_MERN_ToDoList.zip`

Add your actual roll number to the filename before uploading. Upload the zip to the Assignment 2 post on Google Classroom and verify the status says **Turned in**. The due date in the assignment brief is **11 October 2026**.
