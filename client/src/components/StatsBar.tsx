import type { Task } from '../types/task';

interface StatsBarProps {
  tasks: Task[];
}

export default function StatsBar({ tasks }: StatsBarProps) {
  const todo = tasks.filter((t) => t.status === 'To Do').length;
  const inProgress = tasks.filter((t) => t.status === 'In Progress').length;
  const done = tasks.filter((t) => t.status === 'Done').length;

  const low = tasks.filter((t) => t.priority === 'Low').length;
  const medium = tasks.filter((t) => t.priority === 'Medium').length;
  const high = tasks.filter((t) => t.priority === 'High').length;

  return (
    <div className="stats-bar">
      <div className="stat-card">
        <h3>By Status</h3>
        <p>To Do: {todo}</p>
        <p>In Progress: {inProgress}</p>
        <p>Done: {done}</p>
      </div>

      <div className="stat-card">
        <h3>By Priority</h3>
        <p>Low: {low}</p>
        <p>Medium: {medium}</p>
        <p>High: {high}</p>
      </div>
    </div>
  );
}