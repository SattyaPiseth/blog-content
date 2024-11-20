import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchBlogsByCategory } from "../../redux/features/blog/blogSlice";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchBlogsByCategory(categoryId));
    }
  }, [categoryId, dispatch]);

  return (
    <div>
      <h1>Blogs in Category: {categoryId}</h1>
      {/* Render your blogs here */}
    </div>
  );
};

export default CategoryPage;
