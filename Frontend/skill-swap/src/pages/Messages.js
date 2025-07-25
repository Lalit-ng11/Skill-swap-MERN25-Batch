import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chat from './Chat';

const Messages = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [selectedChatUser, setSelectedChatUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/api/users', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUsers(res.data.filter((u) => u._id !== user._id)); // exclude self
      } catch (err) {
        console.error('Error fetching users:', err.message);
      }
    };

    fetchUsers();
  }, [user]);

  const handleUserClick = (chatUser) => {
    setSelectedChatUser(chatUser);
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Messages</h3>

      <div className="row">
        <div className="col-md-4">
          <h5>Users</h5>
          <ul className="list-group">
            {users.length === 0 && <li className="list-group-item">No users found</li>}
            {users.map((u) => (
              <li
                key={u._id}
                className={`list-group-item ${
                  selectedChatUser?._id === u._id ? 'active text-white' : ''
                }`}
                style={{ cursor: 'pointer' }}
                onClick={() => handleUserClick(u)}
              >
                {u.name} ({u.email})
              </li>
            ))}
          </ul>
        </div>

        <div className="col-md-8">
          <Chat user={user} selectedChatUser={selectedChatUser} />
        </div>
      </div>
    </div>
  );
};

export default Messages;
