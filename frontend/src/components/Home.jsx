import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  useEffect(() => {
    setUsername(localStorage.getItem('username') || '');
  }, []);
  function handleLogout() {
    localStorage.clear();
    setUsername('');
    navigate('/login');
    window.location.reload();
  }
  return (
    <div className="home-container">
      <div className="button-container">
        {!username ? (
          <>
            <button id="login-btn" onClick={() => navigate('/login')}>Login</button>
            <button id="register-btn" onClick={() => navigate('/register')}>Register</button>
          </>
        ) : (
          <button className="logout-btn" onClick={handleLogout}>Log Out</button>
        )}
      </div>
      <h1 className="center-text">Welcome to BlogSphere</h1>
    </div>
  );
}
export default Home;
