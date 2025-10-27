import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../styles/Login.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    if (!email || !password) {
      setMessage("Please enter both fields");
      return;
    }
    try {
      const res = await axios.post(process.env.REACT_APP_API_URL + "/login", { email, password });
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("isAdmin", res.data.isAdmin || false);
      setMessage(res.data.message);
      setTimeout(() => navigate("/profile"), 1200);
    } catch (err) {
      setMessage(err?.response?.data?.message || "Failed to log in");
    }
  }

  return (
    <div className="login-container">
      <div className="login-input">
        <input type="email" placeholder="Email"
          value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password"
          value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
        {message && <div className="login-output Failed">{message}</div>}
      </div>
    </div>
  );
}
export default Login;
