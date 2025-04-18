```jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
  const { token, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    fetchTasks();
    fetchSchedule();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get('/api/tasks', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(res.data);
  };

  const fetchSchedule = async () => {
    const res = await axios.get('/api/schedule', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setSchedule(res.data);
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    await axios.post(
      '/api/tasks',
      { title, duration: parseInt(duration) },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setTitle('');
    setDuration('');
    fetchTasks();
    fetchSchedule();
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">WorkSync Dashboard</h1>
        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </div>

      <form onSubmit={handleAddTask} className="mb-6 flex gap-2">
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="p-2 border w-1/3" placeholder="Task title" />
        <input value={duration} onChange={(e) => setDuration(e.target.value)} className="p-2 border w-1/3" placeholder="Duration (min)" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Task</button>
      </form>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Tasks</h2>
          <ul>
            {tasks.map(t => (
              <li key={t.id} className="bg-white p-3 shadow rounded mb-2">{t.title} – {t.duration} min</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Suggested Schedule</h2>
          <ul>
            {schedule.map((s, i) => (
              <li key={i} className="bg-white p-3 shadow rounded mb-2">{s.start} - {s.end} → {s.title}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
```
