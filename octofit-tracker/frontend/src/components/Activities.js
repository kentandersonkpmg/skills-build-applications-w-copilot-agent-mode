import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespace
    ? `https://${codespace}-8000.app.github.dev/api/activities/`
    : '/api/activities/';

  useEffect(() => {
    fetch(endpoint)
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.text();
      })
      .then(text => {
        if (!text) return [];
        try {
          const data = JSON.parse(text);
          const results = data.results || data;
          setActivities(results);
          console.log('Activities endpoint:', endpoint);
          console.log('Fetched activities:', results);
        } catch (err) {
          console.error('Failed to parse activities JSON:', err);
          setActivities([]);
        }
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setActivities([]);
      });
  }, [endpoint]);

  return (
    <div className="mt-4">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title text-primary">Activities</h2>
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>User</th>
                <th>Activity</th>
                <th>Duration (min)</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, idx) => (
                <tr key={activity.id || idx}>
                  <td>{activity.user_email || activity.user?.email || 'Unknown'}</td>
                  <td>{activity.activity}</td>
                  <td>{activity.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Activities;
