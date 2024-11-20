import React from "react";
import LikeIcon from "../../components/common/card/Button/LikeIcon";

const BlogCard = ({ blog }) => {
  return (
    <div className="blog-card p-4 border rounded-md shadow">
      <img
        src={blog.thumbnail}
        alt={blog.title}
        className="w-full h-40 object-cover rounded-md"
      />
      <h3 className="text-lg font-bold mt-2">{blog.title}</h3>
      <p className="text-gray-600">{blog.author}</p>
      <div className="flex items-center justify-between mt-2">
        <button className="text-blue-500">Read More</button>
        <LikeIcon blogId={blog.id} />
      </div>
    </div>
  );
};

export default BlogCard;
