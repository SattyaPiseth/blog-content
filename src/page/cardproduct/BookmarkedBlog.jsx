// src/components/BookmarkedBlog.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Card from './CardProduct';

const BookmarkedBlog = () => {
  const navigate = useNavigate();
  const { blogs } = useSelector((state) => state.blog);

  // Filter blogs that are bookmarked
  const bookmarkedBlogs = blogs.filter((blog) => blog.bookmarked);

  // Function to handle back to profile navigation
  const handleBackToProfile = () => {
    navigate("/profilecard"); // Change this path to your profile route
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center mb-5">
        <button
          onClick={handleBackToProfile}
          className="text-blue-700 hover:text-blue-900 px-4 py-2 rounded bg-gray-100 hover:bg-gray-200"
        >
          &larr; Back to Profile
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-5">Bookmarked Blogs</h2>
      {bookmarkedBlogs.length > 0 ? (
        <Card blogs={bookmarkedBlogs} />
      ) : (
        <p>No blogs bookmarked yet.</p>
      )}
    </div>
  );
};

export default BookmarkedBlog;
