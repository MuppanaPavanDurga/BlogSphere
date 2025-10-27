import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import '../styles/Navigation.css';

function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  function handleLogout() {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  }
  return (
    <nav>
      <div className="nav-head">
        <div className="logo"><Link to="/">BlogSphere</Link></div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/posts">Posts</Link>
          <Link to="/createpost">Create Post</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/about">About</Link>
          {username ? (
            <button onClick={handleLogout} className="logout-btn">Log Out</button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
export default Navigation;
