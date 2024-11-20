import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogsByCategory } from "../../redux/features/blog/blogSlice";

const BlogFilter = () => {
  const dispatch = useDispatch();
  const { blogs, status, error } = useSelector((state) => state.blog);

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    dispatch(fetchBlogsByCategory(categoryId));
  };

  return (
    <div>
      <h1>Filter Blogs</h1>
      <select onChange={handleCategoryChange}>
        <option value="1">Category 1</option>
        <option value="2">Category 2</option>
        <option value="3">Category 3</option>
      </select>

      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}

      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default BlogFilter;
