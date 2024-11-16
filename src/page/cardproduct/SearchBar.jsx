import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";  // Import useNavigate for navigation
import { searchBlogs } from "../../redux/features/blog/blogSlice";

const SearchBar = () => {
  const [query, setQuery] = useState("");  // Local state to handle input value
  const dispatch = useDispatch();
  const navigate = useNavigate();  // Initialize useNavigate

  const handleSearch = () => {
    if (query.trim()) {
      dispatch(searchBlogs(query));  // Dispatch the search with query
    }
  };

  const handleBackHome = () => {
    navigate("/CardAccount");  // Navigate back to the CardAccount page
  };

  return (
    <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Search blogs..."
        value={query}  // Bind input value to state
        onChange={(e) => setQuery(e.target.value)}  // Update state on input change
        className="border px-4 py-2 rounded-lg w-3/4 text-gray-700"
      />
      <button
        onClick={handleSearch}
        className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Search
      </button>
      <button
        onClick={handleBackHome}
        className="ml-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300"
      >
        Back Home
      </button>
    </div>
  );
};

export default SearchBar;
