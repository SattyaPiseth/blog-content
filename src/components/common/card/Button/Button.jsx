// src/components/DarkRoundedButton.jsx

import React from 'react';
import CategoriesList from '../../../../page/cardproduct/CategoriesList'; // Import CategoriesList

const DarkRoundedButton = ({ blogs }) => {
  return (
    <div className="flex flex-col items-center">
      <button className='bg-gray-300 dark:bg-gray-300 border-dark dark:border-dark-2 border rounded-full inline-flex items-center justify-center py-3 px-7 text-center text-base font-medium text-white hover:bg-body-color hover:border-body-color disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5'>
        Dark Button
      </button>
      {/* Render CategoriesList below the button */}
      <CategoriesList />
    </div>
  );
}

export default DarkRoundedButton;
