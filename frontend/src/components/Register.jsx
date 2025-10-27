import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../styles/Register.css';

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function handleRegister() {
    if (!email || !password || !username) {
      setMessage("Please enter all details");
      return;
    }
    try {
      const res = await axios.post(process.env.REACT_APP_API_URL + "/register", { email, password, username });
      setMessage(res.data.message);
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setMessage(err?.response?.data?.message || "Registration failed");
    }
  }

  return (
    <div className="register-container">
      <div className="register-input">
        <input type="email" placeholder="Email"
          value={email} onChange={e => setEmail(e.target.value)} />
        <input type="text" placeholder="Username"
          value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Password"
          value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={handleRegister}>Register</button>
        {message && <div id="output">{message}</div>}
      </div>
    </div>
  );
}
export default Register;
