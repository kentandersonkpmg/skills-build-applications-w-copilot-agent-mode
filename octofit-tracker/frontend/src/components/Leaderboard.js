import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespace
    ? `https://${codespace}-8000.app.github.dev/api/leaderboard/`
    : '/api/leaderboard/';

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
          setLeaderboard(results);
          console.log('Leaderboard endpoint:', endpoint);
          console.log('Fetched leaderboard:', results);
        } catch (err) {
          console.error('Failed to parse leaderboard JSON:', err);
          setLeaderboard([]);
        }
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setLeaderboard([]);
      });
  }, [endpoint]);

  return (
    <div className="mt-4">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title text-primary">Leaderboard</h2>
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Team</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, idx) => (
                <tr key={entry.id || idx}>
                  <td>{entry.team?.name || entry.team || 'Unknown'}</td>
                  <td>{entry.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
