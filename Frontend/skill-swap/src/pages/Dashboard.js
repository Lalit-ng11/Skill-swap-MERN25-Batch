import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/axios';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [mySkills, setMySkills] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMySkills = async () => {
      try {
        const res = await API.get('/skills', {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        const onlyMySkills = res.data.filter(skill => skill.user._id === user._id);
        setMySkills(onlyMySkills);
      } catch (err) {
        console.error('Error fetching skills:', err.message);
      }
    };

    if (user?.token) {
      fetchMySkills();
    }
  }, [user.token, user._id]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) return;

    try {
      await API.delete(`/skills/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setMySkills(prev => prev.filter(skill => skill._id !== id));
      alert('Skill deleted successfully');
    } catch (err) {
      alert('Failed to delete skill');
      console.error(err);
    }
  };

  const handleEdit = (skill) => {
    navigate(`/edit-skill/${skill._id}`, { state: { skill } });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Welcome, {user?.name || user?.email}</h2>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h4 className="card-title">Your Skills</h4>
          <p className="card-text">
            You have posted <strong>{mySkills.length}</strong> skill{mySkills.length !== 1 ? 's' : ''}.
          </p>
          <Link to="/post-skill" className="btn btn-primary btn-sm">+ Post New Skill</Link>
        </div>
      </div>

      <div className="row">
        {mySkills.length === 0 ? (
          <div className="col-12 text-muted">You haven’t posted any skills yet.</div>
        ) : (
          mySkills.map(skill => (
            <div key={skill._id} className="col-md-4 mb-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{skill.title}</h5>
                  <p className="card-text text-muted">{skill.description}</p>
                  <span className="badge bg-info mb-2">{skill.category || 'General'}</span>

                  <div className="mt-auto">
                    <button
                      className="btn btn-sm btn-outline-warning me-2"
                      onClick={() => handleEdit(skill)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(skill._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
