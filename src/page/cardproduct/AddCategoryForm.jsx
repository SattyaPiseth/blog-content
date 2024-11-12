// // src/page/cardproduct/AddCategoryForm.jsx

// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { createCategory } from '../../redux/features/category/categorySlice';

// const AddCategoryForm = () => {
//   const [categoryName, setCategoryName] = useState('');
//   const dispatch = useDispatch();
//   const { loading, error } = useSelector((state) => state.category);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (categoryName.trim()) {
//       dispatch(createCategory(categoryName));
//       setCategoryName(''); // Clear the input after submission
//     }
//   };

//   return (
//     <div className="p-4 bg-white shadow-md rounded-md">
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           placeholder="Enter category name"
//           value={categoryName}
//           onChange={(e) => setCategoryName(e.target.value)}
//           className="w-full p-2 border border-gray-300 rounded"
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//           disabled={loading}
//         >
//           {loading ? 'Creating...' : 'Create Category'}
//         </button>
//       </form>
//       {error && <p className="text-red-500 mt-2">Error: {error}</p>}
//     </div>
//   );
// };

// export default AddCategoryForm;
