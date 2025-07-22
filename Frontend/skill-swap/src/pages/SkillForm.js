import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import API from '../api/axios';

const SkillForm = ({ editMode = false }) => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();
  const { id } = useParams(); // for /edit-skill/:id
  const location = useLocation();

  //  Load skill data for editing if in edit mode
  useEffect(() => {
    if (editMode && location.state?.skill) {
      const skill = location.state.skill;
      setTitle(skill.title);
      setDescription(skill.description);
      setCategory(skill.category || '');
    }
  }, [editMode, location.state]);

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Defensive check: ensure user is logged in
    if (!user?.token) {
      alert("You're not logged in. Please log in first.");
      return;
    }

    const skillData = { title, description, category };
    const config = {
  headers: {
    Authorization: `Bearer ${user.token}`,
  },
};


    try {
      if (editMode) {
        //  Update existing skill
        await API.put(`/skills/${id}`, skillData, config);
        alert('Skill updated successfully');
      } else {
        //  Create new skill
        await API.post('/skills', skillData, config);
        alert('Skill posted successfully');
      }

      navigate('/dashboard');
    } catch (err) {
      console.error('Error saving skill:', err);
      alert('Error saving skill');
    }
  };

  return (
    <div className="container mt-4">
      <h3>{editMode ? 'Edit Skill' : 'Post New Skill'}</h3>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Title:</label>
          <input
            type="text"
            className="form-control"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Graphic Design"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description:</label>
          <textarea
            className="form-control"
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what you can offer..."
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Category:</label>
          <input
            type="text"
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g., Tech, Art, Music"
          />
        </div>

        <button type="submit" className="btn btn-success">
          {editMode ? 'Update Skill' : 'Post Skill'}
        </button>
      </form>
    </div>
  );
};

export default SkillForm;
