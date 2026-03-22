import type { Task, TaskStatus } from '../types/task';

interface TaskCardProps {
  task: Task;
  onDelete: (id: number) => void;
  onStatusChange: (task: Task, newStatus: TaskStatus) => void;
}

function formatDueDate(dueDate?: string | null): string {
  if (!dueDate) return '';
  return dueDate.includes('T') ? dueDate.split('T')[0] : dueDate;
}

export default function TaskCard({ task, onDelete, onStatusChange }: TaskCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-3xl font-bold mb-4">{task.title}</h3>

      {task.description && (
        <p className="text-2xl mb-6">{task.description}</p>
      )}

      <div className="flex items-center gap-4 mb-6">
        <span className="px-4 py-2 rounded-full bg-yellow-100 text-2xl font-semibold">
          {task.priority}
        </span>

        {task.dueDate && (
          <span className="text-2xl">
            Due: {formatDueDate(task.dueDate)}
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task, e.target.value as TaskStatus)}
          className="border rounded-xl px-4 py-2 text-xl"
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-500 text-white px-4 py-2 rounded-xl text-xl"
        >
          Delete
        </button>
      </div>
    </div>
  );
}