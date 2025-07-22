import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthProvider from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import SkillForm from './pages/SkillForm';
import SkillList from './pages/SkillList';
import Requests from './pages/Requests';

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/post-skill" element={<ProtectedRoute><SkillForm /></ProtectedRoute>} />
        <Route path="/skills" element={<SkillList />} />
        <Route path="/requests" element={<ProtectedRoute><Requests /></ProtectedRoute>} />
        <Route path="/edit-skill/:id" element={<ProtectedRoute><SkillForm editMode={true} /></ProtectedRoute>} />
<Route path="/edit-skill/:id" element={<ProtectedRoute><SkillForm editMode={true} /></ProtectedRoute>} />

      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
