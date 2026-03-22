import type { Task, TaskStatus } from '../types/task';

interface TaskCardProps {
  task: Task;
  onDelete: (id: number) => void;
  onStatusChange: (task: Task, newStatus: TaskStatus) => void;
}

export default function TaskCard({ task, onDelete, onStatusChange }: TaskCardProps) {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>

      {task.description && <p>{task.description}</p>}

      <div className="task-meta">
        <span className={`priority ${task.priority.toLowerCase()}`}>{task.priority}</span>
        {task.dueDate && <span>Due: {task.dueDate}</span>}
      </div>

      <select
        value={task.status}
        onChange={(e) => onStatusChange(task, e.target.value as TaskStatus)}
      >
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>

      <button className="delete-btn" onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </div>
  );
}