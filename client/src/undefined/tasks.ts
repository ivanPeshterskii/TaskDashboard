import type { Task } from '../types/task';

const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  throw new Error('VITE_API_URL is not defined');
}

export async function getTasks(priority?: string, search?: string): Promise<Task[]> {
  const params = new URLSearchParams();
  if (priority) params.append('priority', priority);
  if (search) params.append('search', search);

  const queryString = params.toString();
  const url = queryString ? `${BASE_URL}/tasks?${queryString}` : `${BASE_URL}/tasks`;

  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch tasks');

  return response.json();
}