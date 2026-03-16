import React, { useEffect, useState } from 'react';
import { getLecturerDashboard } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export default function LecturerDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, signOut } = useAuth();

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const response = await getLecturerDashboard();
        setData(response.data);
      } catch (err) {
        setError(err.message || 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <div className="page">
      <header>
        <h1>Lecturer Dashboard</h1>
        <button onClick={signOut}>Logout</button>
      </header>

      {loading && <p>Loading…</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {data && (
        <section>
          <h2>Welcome, {user?.first_name}</h2>
          <h3>Courses</h3>
          <ul>
            {data.courses?.map((course) => (
              <li key={course.course_code}>
                {course.course_code}: {course.course_name}
              </li>
            ))}
          </ul>

          <h3>Upcoming Sessions</h3>
          <ul>
            {data.sessions?.map((session) => (
              <li key={session.id}>
                {session.day_of_week} {session.start_time}-{session.end_time} - {session.course_code} ({session.room})
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
