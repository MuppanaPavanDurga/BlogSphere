import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Posts.css';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + '/posts')
      .then(res => {
        setPosts(res.data); // assuming res.data is your posts array
        setLoading(false);
      })
      .catch(e => {
        setErr('Failed to load posts. Please try again.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="main-content">
      <h2>All Posts</h2>
      {loading && <p>Loading...</p>}
      {err && <p className="error">{err}</p>}
      {!loading && posts.length === 0 && <p>No posts found.</p>}
      <div className="posts-grid">
        {posts.map(post => (
          <div key={post._id || post.id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.content || post.body}</p>
            <p className="meta">By {post.author || "Unknown"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Posts;
