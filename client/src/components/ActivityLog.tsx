import { useEffect, useState } from 'react';
import { getActivityLog, type ActivityLog as ActivityLogType } from '../api/tasks';

export default function ActivityLog() {
  const [logs, setLogs] = useState<ActivityLogType[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadLogs() {
      try {
        const data = await getActivityLog();
        setLogs(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load activity log');
      }
    }

    loadLogs();
  }, []);

  return (
    <section className="activity-log">
      <h2>Activity Log</h2>
      {error && <p className="error-message">{error}</p>}
      {logs.length === 0 ? (
        <p>No activity yet.</p>
      ) : (
        <ul>
          {logs.map((log) => (
            <li key={log.id}>
              <strong>{log.action}</strong> — Task #{log.taskId} — {log.details}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}