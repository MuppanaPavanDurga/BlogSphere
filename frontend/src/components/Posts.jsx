import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Posts.css';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [search, setSearch] = useState(""); // <-- Add state for search

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + '/posts')
      .then(res => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch(e => {
        setErr('Failed to load posts. Please try again.');
        setLoading(false);
      });
  }, []);

  // Split content into paragraphs for readability
  function formatContent(content) {
    return content
      ? content.split(/\r?\n\r?\n/).map((para, idx) =>
          <p className="post-para" key={idx}>{para.trim()}</p>
        )
      : null;
  }

  // Filter posts based on search input (case-insensitive)
  const filteredPosts = posts.filter(post =>
    (post.title?.toLowerCase().includes(search.toLowerCase()) ||
     post.content?.toLowerCase().includes(search.toLowerCase()) ||
     post.author?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="posts-page-container">
      <h2>All Posts</h2>
      {/* Search Input */}
      <input
        type="text"
        className="search-input"
        placeholder="Search posts..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {loading && <p>Loading...</p>}
      {err && <p className="error">{err}</p>}
      {!loading && filteredPosts.length === 0 && <p>No posts found.</p>}
      <div className="posts-grid">
        {filteredPosts.map(post => (
          <div key={post._id || post.id} className="post-card">
            <h3>{post.title}</h3>
            <div className="post-content">
              {formatContent(post.content || post.body)}
            </div>
            <div className="meta">By {post.author || "Unknown"}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Posts;
