import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookmarkedBlogs } from "../../redux/features/blog/bookmarkSlice";

const BookmarkedBlog = () => {
  const dispatch = useDispatch();
  const { items: bookmarks, status, error } = useSelector((state) => state.bookmarks);

  useEffect(() => {
    dispatch(fetchBookmarkedBlogs());
  }, [dispatch]);

  if (status === "loading") {
    return <p>Loading bookmarked blogs...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Bookmarked Blogs</h2>
      {bookmarks.length > 0 ? (
        bookmarks.map((blog) => (
          <div key={blog.id}>
            <h3>{blog.title}</h3>
            <p>{blog.description}</p>
          </div>
        ))
      ) : (
        <p>No bookmarked blogs found.</p>
      )}
    </div>
  );
};

export default BookmarkedBlog;
