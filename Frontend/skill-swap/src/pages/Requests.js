import { useContext, useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
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
    <div className="py-4">
      <div className="container">
        <ToastContainer />
        <h2 className="mb-4 text-center">My Skill Requests</h2>

        <div className="d-flex justify-content-center mb-4">
          <button
            className={`btn btn-sm mx-1 ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`btn btn-sm mx-1 ${filter === 'sent' ? 'btn-success' : 'btn-secondary'}`}
            onClick={() => setFilter('sent')}
          >
            Sent
          </button>
          <button
            className={`btn btn-sm mx-1 ${filter === 'received' ? 'btn-warning' : 'btn-secondary'}`}
            onClick={() => setFilter('received')}
          >
            Received
          </button>
        </div>

        {loading ? (
          <div className="text-center text-muted">Loading...</div>
        ) : filteredRequests.length === 0 ? (
          <div className="text-center text-muted">No requests found.</div>
        ) : (
          <div className="row">
            {filteredRequests.map((r) => {
              const isReceiver = r.receiver?._id === currentUserId;
              const isPending = r.status === 'pending';
              const otherUserId =
                currentUserId === r.sender?._id ? r.receiver?._id : r.sender?._id;

              return (
                <div key={r._id} className="col-md-6 col-lg-4 mb-4 d-flex">
                  <div className="card shadow border border-dark bg-light text-dark w-100 d-flex flex-column" style={{ borderWidth: '2px' }}>
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{r.skill?.title || 'Untitled Skill'}</h5>
                      <p className="card-text mb-2">
                        <strong>From:</strong> {r.sender?.name || 'Unknown'}<br />
                        <strong>To:</strong> {r.receiver?.name || 'Unknown'}
                      </p>
                      <p className="card-text">
                        <strong>Status:</strong>{' '}
                        <span className={
                          r.status === 'pending' ? 'text-warning' :
                          r.status === 'accepted' ? 'text-success' :
                          'text-danger'
                        }>
                          {r.status}
                        </span>
                      </p>

                      {/* Show contact + message if accepted */}
                      {r.status === 'accepted' && (
                        <div className="mt-auto">
                          <div className="text-muted mb-2">
                            <strong>Contact:</strong>{' '}
                            {currentUserId === r.sender?._id
                              ? r.receiver?.email
                              : r.sender?.email}
                          </div>
                          <div className="text-end">
                            <Link to={`/chat/${otherUserId}`}>
                              <button className="btn btn-outline-primary btn-sm">
                                Message
                              </button>
                            </Link>
                          </div>
                        </div>
                      )}

                      {/* Accept/Reject buttons if receiver and pending */}
                      {isReceiver && isPending && (
                        <div className="mt-auto d-flex justify-content-between">
                          <button
                            className="btn btn-sm btn-success"
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
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Requests;
