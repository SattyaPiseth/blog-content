// src/page/cardproduct/CategoriesList.jsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../redux/features/category/categorySlice';

const CategoriesList = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  console.log("Categories loading:", loading);
  console.log("Categories error:", error);
  console.log("Categories data:", categories);

  if (loading) return <p className="text-center text-blue-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <ul className="list-disc p-5 space-y-2  ">
      {categories.map((category) => (
        <button key={category.id} className=" bg-gray-300 dark:bg-gray-300  dark:border-dark-2 border rounded-full inline-flex items-center justify-center py-3 px-7 text-center text-base font-medium text-black hover:bg-body-color hover:border-body-color disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5 m-3">
          {category.name}
        </button>
      ))}
    </ul>
  );
};

export default CategoriesList;
