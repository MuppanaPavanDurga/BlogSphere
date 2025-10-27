import "../styles/About.css";
function About() {
  return (
    <div className="about-container">
      <h2>About BlogSphere</h2>
      <p>Welcome to <strong>BlogSphere</strong> – your ultimate blogging platform! Share your stories, connect with a vibrant community, and explore content from around the globe. We are dedicated to making blogging effortless and enjoyable for everyone.</p>
      <h3>Key Features:</h3>
      <ul className="features-list">
        <li>Create, edit, and delete posts</li>
        <li>Personalized user profile and dashboard</li>
        <li>Beautiful UI with dark and gradient themes</li>
        <li>Persistent session & easy login/logout</li>
        <li>Contact form and admin controls</li>
      </ul>
    </div>
  );
}
export default About;
