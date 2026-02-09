import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespace
    ? `https://${codespace}-8000.app.github.dev/api/users/`
    : '/api/users/';

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
          setUsers(results);
          console.log('Users endpoint:', endpoint);
          console.log('Fetched users:', results);
        } catch (err) {
          console.error('Failed to parse users JSON:', err);
          setUsers([]);
        }
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setUsers([]);
      });
  }, [endpoint]);

  return (
    <div className="mt-4">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title text-primary">Users</h2>
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user.id || idx}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
