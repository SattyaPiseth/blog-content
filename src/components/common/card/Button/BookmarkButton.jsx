import React from "react";
import { useDispatch } from "react-redux";
import { toggleBookmark } from "../../../../redux/features/blog/bookmarkSlice";

const BookmarkButton = ({ blogId }) => {
  const dispatch = useDispatch();

  const handleBookmarkClick = async (id) => {
    dispatch(toggleBookmark(id));

    try {
      const response = await fetch(
        `https://blog-api.automatex.dev/blogs/${id}/like`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer YOUR_TOKEN_HERE",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to bookmark");
      }

      console.log("Bookmark successful:", await response.json());
    } catch (error) {
      console.error("Error bookmarking blog:", error);
    }
  };

  return (
    <img
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/b9fb6718387cf4f368800147fbe7f34ad8ffa421b93b62f6ae215f13472b3d29?placeholderIfAbsent=true&apiKey=91a4dbf22d714a40962aa33b33fe0fd6"
      alt="Bookmark icon"
      className="object-contain shrink-0 w-6 aspect-square cursor-pointer"
      onClick={() => handleBookmarkClick(blogId)}
    />
  );
};

export default BookmarkButton;
