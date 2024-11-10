import React from 'react'

export default function TableCard() {
  return (
    <div>
      {/* table card */}
     <div className="overflow-x-auto">
     <table className="min-w-full bg-gray-300 border border-blue-400 rounded-lg">
       <thead>
         <tr className="bg-gray-700 text-white text-left text-sm uppercase">
           <th className="p-4">S.No</th>
           <th className="p-4">Thumbnail</th>
           <th className="p-4">Title</th>
           <th className="p-4">Category</th>
           <th className="p-4">Date</th>
           <th className="p-4">Action</th>
         </tr>
       </thead>
       <tbody>
         <tr className="text-gray-800">
           <td className="p-4">1</td>
           <td className="p-4">
             <img
               src="https://via.placeholder.com/100" // Replace with actual image URL
               alt="Thumbnail"
               className="w-24 h-auto rounded"
             />
           </td>
           <td className="p-4">MLBB</td>
           <td className="p-4">Game</td>
           <td className="p-4">10/18/2024</td>
           <td className="p-4">
             <button className="text-blue-500 hover:underline mr-4">Edit</button>
             <button className="text-red-500 hover:underline">Delete</button>
           </td>
         </tr>
         {/* Add more rows as needed */}
       </tbody>
     </table>
   </div>
    </div>
  )
}
