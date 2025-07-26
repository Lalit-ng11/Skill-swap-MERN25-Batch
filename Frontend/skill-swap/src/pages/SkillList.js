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
    <div className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center text-primary fw-bold mb-4">Explore Skills Shared by Others</h2>

        {skills.length === 0 ? (
          <div className="text-center text-muted">No skills found.</div>
        ) : (
          <div className="row g-4">
            {skills.map((skill) => (
              <div key={skill._id} className="col-lg-4 col-md-6 d-flex">
                <div className="card shadow border border-dark flex-fill">
                  <div className="card-header bg-dark text-white">
                    <h5 className="mb-0 text-truncate">{skill.title}</h5>
                  </div>
                  <div className="card-body d-flex flex-column">
                    <p className="card-text mb-2">{skill.description}</p>
                    
                    <div className="mb-2">
                      <span className="badge bg-info text-dark">
                        {skill.category || 'Uncategorized'}
                      </span>
                    </div>

                    <div className="text-muted mt-auto">
                      <small>
                        Posted by: <strong>{skill.user?.name || skill.user?.email || 'Unknown'}</strong>
                      </small>
                    </div>

                    {skill.user?._id !== user?._id && (
                      <button
                        className="btn btn-success mt-3"
                        onClick={() => sendRequest(skill._id)}
                      >
                        Request Skill
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillList;
