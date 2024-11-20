import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome styles
import { useNavigate } from "react-router-dom";

function NavbarProfile() {
  const navigate = useNavigate();

  // Function to handle bookmark click
  const handleBookmarkClick = () => {
    navigate("/bookmarkedblog");
  };
  // Function to handle Createblog click
  const handleCreateBlogClick = () => {
    navigate("/CreateBlog");
  };

  // Function to handle search icon click
  // const handleSearchClick = () => {
  //   navigate("/BlogSearch");
  // };

  return (
    <div>
      <div className="bg-blue-200 flex p-3 items-center justify-between rounded">
        <div className="flex items-center">
          <img
            src="src/assets/black-circle-svgrepo-com.svg"
            className="mr-3 h-6 sm:h-9"
            alt="LOGO"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            LOGO
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <div onClick={handleCreateBlogClick}>
            {/* Create Blog Icon */}
            <button className="text-blue-700 hover:text-blue-900">
              <i className="fas fa-plus-circle text-lg"></i>
              <span className="ml-2 hidden sm:inline">Create Blog</span>
            </button>
          </div>
          {/* Bookmark Icon */}
          <button
            className="text-blue-700 hover:text-blue-900"
            onClick={handleBookmarkClick}
          >
            <i className="fas fa-bookmark text-lg"></i>
            <span className="ml-2 hidden sm:inline">Bookmark</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavbarProfile;
