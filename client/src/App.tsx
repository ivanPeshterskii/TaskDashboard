import { useEffect, useState } from 'react';
import './index.css';
import TaskColumn from './components/TaskColumn';
import TaskForm from './components/TaskForm';
import FilterBar from './components/FilterBar';
import { createTask, deleteTask, getTasks, updateTask } from './api/tasks';
import type { Task, TaskInput, TaskStatus } from './types/task';
import StatsBar from './components/StatsBar';
import ActivityLog from './components/ActivityLog';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [priorityFilter, setPriorityFilter] = useState('');
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  async function loadTasks() {
    try {
      setError('');
      const data = await getTasks(priorityFilter, search);
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    }
  }

  useEffect(() => {
    loadTasks();
  }, [priorityFilter, search]);

  async function handleCreate(task: TaskInput) {
    try {
      setError('');
      await createTask(task);
      await loadTasks();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create task');
    }
  }

  async function handleDelete(id: number) {
    try {
      setError('');
      await deleteTask(id);
      await loadTasks();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task');
    }
  }

  async function handleStatusChange(task: Task, newStatus: TaskStatus) {
    try {
      setError('');
      await updateTask(task.id, {
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: newStatus,
        dueDate: task.dueDate || null,
      });
      await loadTasks();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
    }
  }

  const todoTasks = tasks.filter((task) => task.status === 'To Do');
  const inProgressTasks = tasks.filter((task) => task.status === 'In Progress');
  const doneTasks = tasks.filter((task) => task.status === 'Done');

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Management Dashboard</h1>
      </header>

      <TaskForm onSubmit={handleCreate} />

      <FilterBar
        priorityFilter={priorityFilter}
        search={search}
        onPriorityChange={setPriorityFilter}
        onSearchChange={setSearch}
      />
      <StatsBar tasks={tasks} />

      {error && <p className="error-message">{error}</p>}

      <div className="board">
        <TaskColumn
          title="To Do"
          tasks={todoTasks}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
        <TaskColumn
          title="In Progress"
          tasks={inProgressTasks}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
        <TaskColumn
          title="Done"
          tasks={doneTasks}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      </div>
      <ActivityLog />
    </div>
  );
}