import React, { useState } from "react";

const LikeIcon = ({ blogId }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("No authentication token found. Please log in.");
      return;
    }

    // Construct headers
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      redirect: "follow",
    };

    fetch(`https://blog-api.automatex.dev/blogs/${blogId}/like`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            console.error("Unauthorized. Please log in.");
          } else {
            throw new Error(`Failed to like the blog: ${response.statusText}`);
          }
        }
        return response.json();
      })
      .then((result) => {
        console.log("Blog liked successfully!", result);
        setIsLiked(true); // Change state to liked
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <img
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/db15df27ce58dba9cfe945803e23d22c3e4c08c4baaa252de7cd4a26827dbf02?placeholderIfAbsent=true&apiKey=91a4dbf22d714a40962aa33b33fe0fd6"
      alt="Like icon"
      className={`object-contain w-6 aspect-square cursor-pointer ${
        isLiked ? "text-red-dark" : "text-gray-500"
      }`}
      style={{
        filter: isLiked
          ? "invert(30%) sepia(100%) saturate(400%) hue-rotate(670deg)"
          : "none",
      }}
      onClick={handleLikeClick}
    />
  );
};

export default LikeIcon;
