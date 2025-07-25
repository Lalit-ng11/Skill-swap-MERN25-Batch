import { createContext, useState } from 'react';
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
 const [user, setUser] = useState(() =>
  localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
);

const login = (userData) => {
  setUser(userData);
  localStorage.setItem('user', JSON.stringify(userData));
};
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;