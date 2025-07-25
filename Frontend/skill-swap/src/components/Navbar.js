import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">SkillSwap</Link>
      <div className="ml-auto">
        {user ? (
          <>
            <Link to="/dashboard" className="btn btn-outline-light mx-2">Dashboard</Link>
            {/* <Link to="/post-skill" className="btn btn-outline-light mx-2">Post Skill</Link> */}
            <Link to="/skills" className="btn btn-outline-info mx-2">Browse Skills</Link>
            <Link to="/requests" className="btn btn-outline-light mx-2">Requests</Link>
            <button className="btn btn-outline-warning mx-2" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline-light mx-2">Login</Link>
            <Link to="/register" className="btn btn-outline-success">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;