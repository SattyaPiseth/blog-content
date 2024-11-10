import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome styles

function NavbarProfile() {
  return (
    <div>
      <div className="bg-blue-200 flex p-3 items-center justify-between rounded">
        <div className="flex items-center">
          <img
            src="src/assets/—Pngtree—circle clipart black circle_5553148.png"
            className="mr-3 h-6 sm:h-9"
            alt="LOGO"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            LOGO
          </span>
        </div>

        <div className="flex items-center space-x-4">
          {/* Create Blog Icon */}
          <button className="text-blue-700 hover:text-blue-900">
            <i className="fas fa-plus-circle text-lg"></i>
            <span className="ml-2 hidden sm:inline">Create Blog</span>
          </button>

          {/* Bookmark Icon */}
          <button className="text-blue-700 hover:text-blue-900">
            <i className="fas fa-bookmark text-lg"></i>
            <span className="ml-2 hidden sm:inline">Bookmark</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavbarProfile;
