import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../../redux/features/category/categorySlice";
import { useNavigate } from "react-router-dom";  // Import useNavigate for navigation

const BlogList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();  // Initialize useNavigate
  const { categories, loading, error } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) return <p className="text-center text-xl font-semibold text-gray-600">Loading categories...</p>;
  if (error) return <p className="text-center text-xl font-semibold text-red-600">Error: {error}</p>;

  // Handle category click
  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);  // Navigate to filtered blog list based on category ID
  };

  return (
    <div className="category-list container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Blog Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div 
            key={category.id} 
            className="category-item bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => handleCategoryClick(category.id)}  // Add onClick event to handle navigation
          >
            <h2 className="text-xl font-semibold text-gray-700">{category.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
