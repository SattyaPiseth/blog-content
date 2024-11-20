import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../../redux/features/category/categorySlice";
import { filterBlog } from "../../redux/features/blog/blogActions";  
import { useNavigate } from "react-router-dom";  // Import useNavigate for navigation

const BlogList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();  // Initialize useNavigate
  const { categories, loading, error } = useSelector((state) => state.category);
  const { filteredBlogs, loading: blogLoading, error: blogError } = useSelector((state) => state.blog);  // Access filtered blogs from Redux state

  const [selectedCategory, setSelectedCategory] = useState(null); // Track the selected category

  // Fetch categories when the component mounts
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Handle category click to filter blogs
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);  // Set the selected category
    dispatch(filterBlog(categoryId));  // Dispatch action to filter blogs by category
    navigate(`/category/${categoryId}`);  // Navigate to filtered blog list based on category ID
  };

  if (loading) {
    return (
      <div className="text-center">
        <p className="text-xl font-semibold text-gray-600">Loading categories...</p>
        {/* You can add a spinner here if you want */}
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-xl font-semibold text-red-600">Error: {error}</p>;
  }

  if (categories.length === 0) {
    return <p className="text-center text-xl font-semibold text-gray-600">No categories available.</p>;
  }

  // Render the filtered blogs after category selection
  if (selectedCategory && blogLoading) {
    return (
      <div className="text-center">
        <p className="text-xl font-semibold text-gray-600">Loading blogs...</p>
        <div className="loader"></div>
      </div>
    );
  }

  if (blogError) {
    return <p className="text-center text-xl font-semibold text-red-600">Error: {blogError}</p>;
  }

  return (
    <div className="category-list container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Blog Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div 
            key={category.id} 
            className="category-item bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => handleCategoryClick(category.id)}  // Add onClick event to handle navigation
            role="button"
            aria-label={`View blogs in category: ${category.name}`}
          >
            <h2 className="text-xl font-semibold text-gray-700">{category.name}</h2>
          </div>
        ))}
      </div>

      {/* Render filtered blogs */}
      {selectedCategory && filteredBlogs.length > 0 && (
        <div className="filtered-blogs mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Blogs in {categories.find(cat => cat.id === selectedCategory)?.name} category:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBlogs.map((blog) => (
              <div key={blog.id} className="blog-item bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-gray-700">{blog.title}</h3>
                <p className="text-gray-500">{blog.author}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogList;
