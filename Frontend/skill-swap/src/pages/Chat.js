import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import API from '../api/axios';

const Chat = () => {
  const { user } = useContext(AuthContext);
  const { otherUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const [receiverUsername, setReceiverUsername] = useState('');

  // Set selected chat ID
  useEffect(() => {
    if (otherUserId) {
      setSelectedChat({ _id: otherUserId });
    }
  }, [otherUserId]);

  // Fetch receiver username
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const res = await API.get(`/auth/user/${otherUserId}`);
        setReceiverUsername(res.data.username);
      } catch (err) {
        console.error('Error fetching receiver username:', err);
      }
    };

    if (otherUserId) fetchUsername();
  }, [otherUserId]);

  // Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (user && selectedChat) {
          const res = await API.get(`/messages/${selectedChat._id}`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          setMessages(res.data);
        }
      } catch (err) {
        console.error('Error fetching messages:', err);
      }
    };

    fetchMessages();
  }, [selectedChat, user]);

  // Send message handler
  const handleSendMessage = async () => {
    try {
      const response = await API.post(
        '/messages',
        {
          sender: user._id,
          receiver: selectedChat._id,
          message: newMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setMessages((prevMessages) => [...prevMessages, response.data]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '700px' }}>
      <div className="bg-primary text-white rounded p-3 mb-3 shadow-sm">
        <h5 className="mb-0">Chat with <strong>{receiverUsername || 'User'}</strong></h5>
      </div>

      <div className="border rounded p-3 mb-3 bg-light shadow-sm" style={{ height: '60vh', overflowY: 'auto' }}>
        {messages.map((msg) => (
          <div key={msg._id} className={`d-flex mb-3 ${msg.sender === user._id ? 'justify-content-end' : 'justify-content-start'}`}>
            <div className={`p-2 rounded ${msg.sender === user._id ? 'bg-primary text-white' : 'bg-success text-white'}`} style={{ maxWidth: '75%' }}>
              {msg.message}
            </div>
          </div>
        ))}
      </div>

      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          disabled={!selectedChat || !user}
        />
        <button
          className="btn btn-primary"
          onClick={handleSendMessage}
          disabled={!selectedChat || !user || !newMessage.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
