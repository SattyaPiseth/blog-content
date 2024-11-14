import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const BlogSearch = () => {
  const [searchTitle, setSearchTitle] = useState(''); // State for search query
  const [categoryId, setCategoryId] = useState(''); // State for selected category
  const [blogs, setBlogs] = useState([]); // State for holding search results
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling
  const [categories, setCategories] = useState([]); // State for categories dropdown

  // Get the navigate function from useNavigate
  const navigate = useNavigate();

  // Handle the change in search input
  const handleSearchChange = (e) => {
    setSearchTitle(e.target.value);
  };

  // Handle category selection
  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value);
  };

  // Fetch categories (optional, if categories are dynamic, otherwise hardcode them)
  useEffect(() => {
    fetch('https://blog-api.automatex.dev/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  // Fetch blogs based on the search title and category filter
  const handleSearch = () => {
    setLoading(true); // Set loading to true while fetching
    setError(null); // Reset previous errors

    const queryParams = [];

    // If there is a search title, add it to the query
    if (searchTitle.trim()) {
      queryParams.push(`title=${searchTitle}`);
    }

    // If a category is selected, add it to the query
    if (categoryId.trim()) {
      queryParams.push(`category_id=${categoryId}`);
    }

    // Construct the query string
    const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';

    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(`https://blog-api.automatex.dev/blogs${queryString}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((result) => {
        setBlogs(result);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  // Handle "Back" button click
  const handleBack = () => {
    navigate("/"); // This will take the user back to the previous page
  };

  return (
    <div className="max-w-3xl mx-auto p-6 border border-gray-300 rounded-lg bg-gray-50">
      <h2 className="text-center text-xl text-gray-800 mb-6">Search Blogs</h2>

      {/* Back Button */}
      <button
        onClick={handleBack}
        className="mb-6 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Back
      </button>

      {/* Search Bar */}
      <div className="flex mb-6">
        <input
          type="text"
          value={searchTitle}
          onChange={handleSearchChange}
          placeholder="Search by title"
          className="w-4/5 p-2 text-base border border-gray-300 rounded-l-md"
        />
        <button
          onClick={handleSearch}
          className="w-1/5 p-2 bg-green-500 text-white rounded-r-md hover:bg-green-600"
        >
          Search
        </button>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <label className="block mb-2 text-gray-700" htmlFor="category">Filter by Category</label>
        <select
          id="category"
          value={categoryId}
          onChange={handleCategoryChange}
          className="w-full p-2 text-base border border-gray-300 rounded-md"
        >
          <option value="">Select Category</option>
          {categories.length > 0 ? (
            categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))
          ) : (
            <option value="">Loading Categories...</option>
          )}
        </select>
      </div>

      {/* Loading and Error Messages */}
      {loading && <p className="text-center text-lg text-gray-700">Loading...</p>}
      {error && <p className="text-center text-lg text-red-500">{error}</p>}

      {/* Display Blogs */}
      <div className="mt-6">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog.id} className="border-b border-gray-300 py-4">
              <h3 className="text-lg text-gray-800">{blog.title}</h3>
              <p className="text-base text-gray-600">{blog.content}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-lg text-gray-500">No blogs found</p>
        )}
      </div>
    </div>
  );
};

export default BlogSearch;
