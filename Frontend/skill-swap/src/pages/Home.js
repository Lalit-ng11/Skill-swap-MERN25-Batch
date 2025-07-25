import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleBrowse = () => {
    if (user) {
      navigate('/skills');
    } else {
      navigate('/register');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        {/* Left: Text Section */}
        <div className="col-md-6">
          <h1 className="display-5 fw-bold">Welcome to SkillSwap</h1>
          <p className="lead text-muted">
            A platform where users can exchange skills, collaborate, and grow together.
            Post your skills or request others to learn and connect.
          </p>
          <div className="mt-4">
            <button onClick={() => navigate('/register')} className="btn btn-primary btn-lg me-3">Get Started</button>
            <button onClick={handleBrowse} className="btn btn-outline-secondary btn-lg">Browse Skills</button>
          </div>
        </div>

        {/* Right: Illustration Section */}
        <div className="col-md-6 text-center mt-4 mt-md-0">
          <img
            src="data:image/jpeg;base64,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"
            alt="Skill sharing"
            className="img-fluid"
            style={{ maxHeight: '300px' }}
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-5">
        <h3 className="text-center mb-4">Why Use SkillSwap?</h3>
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="card p-3 shadow-sm h-100">
              <h5>Post Skills</h5>
              <p className="text-muted">Share your expertise and let others learn from you.</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card p-3 shadow-sm h-100">
              <h5>Request Skills</h5>
              <p className="text-muted">Find mentors or peers to help you grow in any field.</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card p-3 shadow-sm h-100">
              <h5>Track Progress</h5>
              <p className="text-muted">Keep tabs on your shared and requested skills seamlessly.</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card p-3 shadow-sm h-100">
              <h5>Grow Your Network</h5>
              <p className="text-muted">Connect with like-minded learners and experts in your interest areas.</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card p-3 shadow-sm h-100">
              <h5>Build Your Profile</h5>
              <p className="text-muted">Create a rich skill-based profile to showcase your learning journey.</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card p-3 shadow-sm h-100">
              <h5>Completely Free</h5>
              <p className="text-muted">No hidden fees. Learn and share skills at zero cost.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;