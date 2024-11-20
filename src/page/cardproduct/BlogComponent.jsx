// BlogComponent.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { likeBlog } from './actions';

const BlogComponent = ({ blog }) => {
  const dispatch = useDispatch();

  const handleLike = () => {
    dispatch(likeBlog(blog.id)); // Dispatch the likeBlog action
  };

  return (
    <div className="blog-card">
      <h3>{blog.title}</h3>
      <button onClick={handleLike}>
        {blog.liked ? "Liked" : "Like"}
      </button>
    </div>
  );
};

export default BlogComponent;
