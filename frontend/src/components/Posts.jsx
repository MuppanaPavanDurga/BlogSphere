import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Posts.css';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [search, setSearch] = useState("");
  // Add state for comments and likes
  const [comments, setComments] = useState({});
  const [likes, setLikes] = useState({});

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + '/posts')
      .then(res => {
        setPosts(res.data);
        // Initialize likes/comments for all posts
        const likesObj = {}, commentsObj = {};
        res.data.forEach(post => {
          likesObj[post._id || post.id] = 0;
          commentsObj[post._id || post.id] = [];
        });
        setLikes(likesObj);
        setComments(commentsObj);
        setLoading(false);
      })
      .catch(e => {
        setErr('Failed to load posts. Please try again.');
        setLoading(false);
      });
  }, []);

  function formatContent(content) {
    return content
      ? content.split(/\r?\n\r?\n/).map((para, idx) =>
          <p className="post-para" key={idx}>{para.trim()}</p>
        )
      : null;
  }

  const filteredPosts = posts.filter(post =>
    (post.title?.toLowerCase().includes(search.toLowerCase()) ||
     post.content?.toLowerCase().includes(search.toLowerCase()) ||
     post.author?.toLowerCase().includes(search.toLowerCase()))
  );

  // Like/heart handler
  function handleLike(id) {
    setLikes(prev => ({
      ...prev,
      [id]: prev[id] + 1
    }));
  }

  // Add comment handler
  function handleAddComment(id, comment) {
    if (!comment.trim()) return;
    setComments(prev => ({
      ...prev,
      [id]: [...prev[id], comment.trim()]
    }));
  }

  return (
    <div className="posts-page-container">
      <h2>All Posts</h2>
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
            {/* Reaction Button */}
            <div className="reactions">
              <button className="like-btn" onClick={() => handleLike(post._id || post.id)}>
                ❤️ {likes[post._id || post.id] || 0}
              </button>
            </div>
            {/* Comments Section */}
            <div className="comments-section">
              <h4>Comments</h4>
              <div className="comments-list">
                {(comments[post._id || post.id] || []).map((comment, idx) => (
                  <div className="comment" key={idx}>{comment}</div>
                ))}
              </div>
              <CommentInput onAdd={comment => handleAddComment(post._id || post.id, comment)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Comment input component
function CommentInput({ onAdd }) {
  const [value, setValue] = useState("");
  return (
    <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
      <input
        type="text"
        className="comment-input"
        placeholder="Add a comment..."
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <button className="comment-btn" onClick={() => {
        onAdd(value);
        setValue("");
      }}>
        Post
      </button>
    </div>
  );
}

export default Posts;
