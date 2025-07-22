
import { useContext, useEffect, useState } from 'react';
import API from '../api/axios';
import { AuthContext } from '../context/AuthContext';

const SkillList = () => {
  const { user } = useContext(AuthContext);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      if (!user?.token) return;
      try {
        const res = await API.get('/skills', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setSkills(res.data);
      } catch (err) {
        console.error('Failed to fetch skills:', err);
      }
    };
    fetchSkills();
  }, [user?.token]);

  const sendRequest = async (skillId) => {
    try {
      await API.post(`/requests/${skillId}`, {}, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      alert('Skill request sent successfully!');
    } catch (err) {
      console.error('Skill request failed:', err.response?.data || err.message);
      alert('Request failed: ' + (err.response?.data?.message || 'Something went wrong'));
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Available Skills</h2>
      <div className="row">
        {skills.length === 0 ? (
          <div className="text-muted">No skills found.</div>
        ) : (
          skills.map((skill) => (
            <div key={skill._id} className="col-md-4 mb-3">
              <div className="card shadow-sm h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{skill.title}</h5>
                  <p className="card-text">{skill.description}</p>
                  <span className="badge bg-info mb-2">
                    {skill.category || 'Uncategorized'}
                  </span>
                  <p className="card-text text-muted mt-auto">
                    Posted by: {skill.user?.name || skill.user?.email || 'Unknown'}
                  </p>

                  {/*  Prevent requesting own skill */}
                  {skill.user?._id !== user?._id && (
                    <button
                      className="btn btn-primary mt-2"
                      onClick={() => sendRequest(skill._id)}
                    >
                      Request Skill
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SkillList;
