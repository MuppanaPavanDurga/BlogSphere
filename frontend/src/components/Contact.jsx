import { useState } from "react";
import axios from "axios";
import "../styles/Contact.css";

function Contact() {
  const [email, setEmail] = useState("");
  const [phno, setPhno] = useState("");
  const [message, setMessage] = useState("");
  async function handleContact() {
    if (!email || !phno) {
      setMessage("Please fill in both fields");
      return;
    }
    try {
      const res = await axios.post(process.env.REACT_APP_API_URL + "/contact", { email, phno });
      setMessage(res.data.message);
    } catch (err) {
      setMessage("Failed to send contact info");
    }
  }
  return (
    <div className="form-container">
      <h1>Contact Us</h1>
      <input type="email" placeholder="Your Email"
        value={email} onChange={e => setEmail(e.target.value)} />
      <input type="tel" placeholder="Your Phone Number"
        value={phno} onChange={e => setPhno(e.target.value)} />
      <button className="submit-btn" onClick={handleContact}>Send</button>
      {message && <div className="response-message">{message}</div>}
    </div>
  );
}
export default Contact;
