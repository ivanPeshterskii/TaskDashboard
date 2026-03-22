import type { Task, TaskInput } from '../types/task';

const BASE_URL = import.meta.env.VITE_API_URL;

export async function getTasks(priority?: string, search?: string): Promise<Task[]> {
  const params = new URLSearchParams();

  if (priority) params.append('priority', priority);
  if (search) params.append('search', search);

  const queryString = params.toString();
  const url = queryString ? `${BASE_URL}/tasks?${queryString}` : `${BASE_URL}/tasks`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }

  return response.json();
}

export async function createTask(task: TaskInput): Promise<Task> {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create task');
  }

  return response.json();
}

export async function updateTask(id: number, task: TaskInput): Promise<Task> {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update task');
  }

  return response.json();
}

export async function deleteTask(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete task');
  }
}

export interface ActivityLog {
  id: number;
  taskId: number;
  action: string;
  details: string;
  createdAt: string;
}

export async function getActivityLog(limit = 10, offset = 0): Promise<ActivityLog[]> {
  const response = await fetch(`${BASE_URL}/tasks/activity-log?limit=${limit}&offset=${offset}`);

  if (!response.ok) {
    throw new Error('Failed to fetch activity log');
  }

  return response.json();
}