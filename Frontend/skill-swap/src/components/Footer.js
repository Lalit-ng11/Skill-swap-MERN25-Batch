import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-light mt-5 py-4">
      <div className="container">
        <div className="row text-center text-md-start">

          {/* About Section */}
          <div className="col-md-4 mb-4 mb-md-0">
            <h5 className="text-uppercase">SkillSwap</h5>
            <p className="small">
              SkillSwap is a platform where users can exchange skills, connect with like-minded learners, and grow together.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="col-md-4 mb-4 mb-md-0">
            <h5 className="text-uppercase">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-light text-decoration-none hover-underline">Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/skills" className="text-light text-decoration-none hover-underline">Explore Skills</Link>
              </li>
              <li className="mb-2">
                <Link to="/post-skill" className="text-light text-decoration-none hover-underline">Post a Skill</Link>
              </li>
              <li className="mb-2">
                <Link to="/requests" className="text-light text-decoration-none hover-underline">Skill Requests</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4">
            <h5 className="text-uppercase">Contact</h5>
            <p className="small mb-1">Email: <a href="mailto:support@skillswap.com" className="text-light text-decoration-none">support@skillswap.com</a></p>
            <p className="small mb-0">© {new Date().getFullYear()} Skill-Swap. All rights reserved.</p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
