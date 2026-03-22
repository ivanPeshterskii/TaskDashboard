import TaskCard from './TaskCard';
import type { Task, TaskStatus } from '../types/task';

interface TaskColumnProps {
  title: TaskStatus;
  tasks: Task[];
  onDelete: (id: number) => void;
  onStatusChange: (task: Task, newStatus: TaskStatus) => void;
}

export default function TaskColumn({
  title,
  tasks,
  onDelete,
  onStatusChange,
}: TaskColumnProps) {
  return (
    <div className="task-column">
      <h2>{title}</h2>
      <div className="task-list">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        ))}
      </div>
    </div>
  );
}