// SearchComponent.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchBlogs } from "../../redux/actions";

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.searchResults);

  const handleSearch = () => {
    dispatch(searchBlogs(searchTerm));
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for blogs..."
      />
      <button onClick={handleSearch}>Search</button>

      <div>
        {searchResults.length > 0 ? (
          searchResults.map((blog) => (
            <div key={blog.id}>
              <h3>{blog.title}</h3>
              <p>{blog.author}</p>
            </div>
          ))
        ) : (
          <p>No blogs found</p>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
