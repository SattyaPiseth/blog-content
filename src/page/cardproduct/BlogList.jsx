import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../../redux/features/category/categorySlice"; // Import fetchCategories from your categorySlice

const BlogList = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category); // Access category state from Redux store

  useEffect(() => {
    // Dispatch the action only once when the component mounts
    dispatch(fetchCategories());
  }, [dispatch]); // Empty dependency array ensures it runs only once

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="category-list">
      {/* Render categories after they are fetched */}
      {categories.map((category) => (
        <div key={category.id} className="category-item">
          <h2>{category.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
