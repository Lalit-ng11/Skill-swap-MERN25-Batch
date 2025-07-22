import { useContext, useEffect, useState, useCallback } from 'react';
import API from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Requests = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const currentUserId = user._id || user.id;

  const fetchRequests = useCallback(async () => {
    try {
      setLoading(true);
      const res = await API.get('/requests', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setRequests(res.data);
    } catch (err) {
      toast.error('Failed to fetch requests!');
    } finally {
      setLoading(false);
    }
  }, [user.token]);

  const handleStatus = async (id, status) => {
    try {
      await API.put(`/requests/${id}`, { status }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      toast.success(`Request ${status}`);
      fetchRequests();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error updating request');
    }
  };

  useEffect(() => {
    if (user?.token) fetchRequests();
  }, [fetchRequests, user]);

  const filteredRequests = requests.filter((r) => {
    if (filter === 'sent') return r.sender?._id === currentUserId;
    if (filter === 'received') return r.receiver?._id === currentUserId;
    return true;
  });

  return (
    <div className="container mt-4">
      <ToastContainer />
      <h2>My Skill Requests</h2>

      <div className="mb-3">
        <button className={`btn btn-sm me-2 ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setFilter('all')}>All</button>
        <button className={`btn btn-sm me-2 ${filter === 'sent' ? 'btn-success' : 'btn-outline-success'}`} onClick={() => setFilter('sent')}>Sent</button>
        <button className={`btn btn-sm ${filter === 'received' ? 'btn-warning' : 'btn-outline-warning'}`} onClick={() => setFilter('received')}>Received</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filteredRequests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <ul className="list-group">
          {filteredRequests.map((r) => {
            const isReceiver = r.receiver?._id === currentUserId;
            const isPending = r.status === 'pending';

            return (
              <li key={r._id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{r.skill?.title || 'Untitled Skill'}</strong><br />
                  <small>From: {r.sender?.name || 'Unknown'} | To: {r.receiver?.name || 'Unknown'}</small><br />
                  Status:{' '}
                  <span className={
                    r.status === 'pending' ? 'text-warning' :
                    r.status === 'accepted' ? 'text-success' :
                    'text-danger'
                  }>
                    {r.status}
                  </span>

                  {/* Show Email After Accepted */}
                  {r.status === 'accepted' && (
                    <div className="mt-2">
                      <small className="text-muted">
                        Contact:{' '}
                        <strong>
                          {currentUserId === r.sender?._id
                            ? r.receiver?.email
                            : r.sender?.email}
                        </strong>
                      </small>
                    </div>
                  )}
                </div>

                {/*  Action buttons */}
                {isReceiver && isPending && (
                  <div>
                    <button
                      className="btn btn-sm btn-success me-2"
                      onClick={() => handleStatus(r._id, 'accepted')}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleStatus(r._id, 'rejected')}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Requests;
