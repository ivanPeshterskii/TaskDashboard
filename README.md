# 🧩 Task Management Dashboard

This is a full-stack web application for managing tasks using a Kanban-style board (similar to Trello/Jira).

The application allows users to create, edit, delete, and organize tasks across different statuses.

---

## 🚀 Live Demo

👉 https://task-management-dashboard-rosy-zeta.vercel.app

---

## 📌 Features

- Kanban board with three columns:
  - To Do
  - In Progress
  - Done
- Create, edit, and delete tasks
- Task properties:
  - Title (required)
  - Description
  - Priority (Low / Medium / High)
  - Due Date
- Move tasks between columns
- Filter by priority
- Search by title
- Activity log (history of actions)
- Basic statistics (tasks by status and priority)
- Responsive design

---

## 🛠️ Technologies Used

### Frontend
- React
- TypeScript
- Vite
- Axios
- Tailwind CSS

### Backend
- Go (Golang)
- Gin
- GORM
- SQLite

### DevOps
- Docker
- Docker Compose

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|--------|-------------|
| GET | /tasks | Get all tasks (with filtering & search) |
| POST | /tasks | Create a new task |
| PUT | /tasks/:id | Update a task |
| DELETE | /tasks/:id | Delete a task |
| GET | /tasks/activity-log | Get activity log with pagination |

---

## ⚙️ Getting Started

### Option 1: Run with Docker

```bash
docker-compose up --build

Frontend: http://localhost:3000
Backend: http://localhost:8080
```

### Option 2: Run manually
```bash
Backend
cd server
go mod tidy
go run main.go

Frontend
cd client
npm install
npm run dev
```
### Project Structure
TaskManagementDashboard/
│
├── client/        # React + TypeScript frontend
├── server/        # Go REST API
├── docker-compose.yml
└── README.md

---

### 🧠 What I Learned

This project helped me learn a lot of new things, especially outside my main stack.
I improved my understanding of TypeScript, including working with interfaces, typing API responses, and managing state more safely.
I got practical experience building a React application with real data coming from a backend.
I learned how a REST API works end-to-end and how frontend and backend communicate.
I worked with Go (Golang) for the first time. Even though I am not fully experienced with Go yet, I learned how to structure a backend using Gin, handle requests, and work with a database using GORM.
I also learned how to use Docker and Docker Compose to run a full-stack application.
🤖 Note About AI Assistance
Some parts of this project were developed with the help of AI tools (for guidance, debugging, and code improvements).
I used AI as a learning tool, but I made sure to understand the code, adapt it, and integrate it myself.
💡 Additional Notes
My main experience is currently with C#, and I initially approached the backend logic from that perspective.
Since I have not yet formally studied Go, I used code conversion tools and documentation to adapt the logic into Go. This project was also a motivation for me to start learning Go more seriously.

---

### 🚧 What I Would Improve (If I Had More Time)

Add drag & drop between columns
Implement authentication (user accounts)
Improve UI/UX and animations
Add more unit and integration tests
Improve validation and error handling
Implement bulk updates for tasks
Deploy backend to a cloud service

---

### 🎯 Future Goals
Continue improving my React & TypeScript skills
Start learning Go more deeply
Build more full-stack projects
Gain real-world experience as a Junior Developer

---

### 👨‍💻 Author
Ivan Peshterski
Junior Full-Stack Developer (in progress 🚀)
GitHub: https://github.com/ivanPeshterskii
