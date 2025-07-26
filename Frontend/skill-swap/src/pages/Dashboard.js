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
        if (!user || !user._id) return;
        const response = await API.get('/skills/my-skills', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setMySkills(response.data);
      } catch (error) {
        console.error('Error fetching skills:', error.response?.data || error.message);
      }
    };

    if (user && user.token) {
      fetchMySkills();
    }
  }, [user]);

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
    <div className="d-flex flex-column min-vh-90 bg-light">
      {/* Main Content */}
      <div className="container pt-5 flex-grow-1">
        {/* Welcome Card */}
        <div className="text-center mb-5">
          <div className="card border-0 shadow-sm bg-info text-white">
            <div className="card-body">
              <h2 className="fw-bold">Welcome, {user?.name || user?.email}</h2>
              <p>Manage your posted skills here</p>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-semibold text-dark">Your Skills</h4>
          <Link to="/post-skill" className="btn btn-success fw-semibold">+ Post New Skill</Link>
        </div>

        {/* Skill Cards */}
        <div className="row">
          {mySkills.length === 0 ? (
            <div className="col-12 text-center text-muted py-5 bg-white rounded shadow">
              You haven't posted any skills yet.
            </div>
          ) : (
            mySkills.map((skill) => (
              <div key={skill._id} className="col-md-6 col-lg-4 mb-4">
                <div className="card h-100 shadow-sm" style={{ backgroundColor: '#423a3aff' }}>
                  <div className="card-body d-flex flex-column">
                    <h5 className="fw-bold text-white">{skill.title}</h5>
                    <p className="text-white flex-grow-1">{skill.description}</p>
                    <div className="mb-3">
                      <span className="badge bg-info text-dark">
                        {skill.category || 'General'}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn w-50 me-2 fw-semibold text-white"
                        style={{ backgroundColor: '#ffc107', border: 'none' }}
                        onClick={() => handleEdit(skill)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn w-50 fw-semibold text-white"
                        style={{ backgroundColor: '#dc3545', border: 'none' }}
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
    </div>
  );
};

export default Dashboard;
