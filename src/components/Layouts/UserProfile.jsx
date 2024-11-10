import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../redux/features/profile/profileSlice.js";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile, error } = useSelector((state) => state.profile);

  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(getProfile(token));
  }, [dispatch, token]);

  // Debugging log to ensure profile data is loaded
  useEffect(() => {
    console.log("Profile data in component:", profile);
  }, [profile]);

  // Display loading or error state if profile is still undefined
  if (!profile || !profile.id) {
    return <p>Loading profile data...</p>;
  }

  if (error) {
    return <p>Error loading profile data: {error}</p>;
  }

  return (
    <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-10 p-6">
      <div className="flex flex-col items-center">
        <img
          className="w-24 h-24 object-cover rounded-full shadow-lg mb-4"
          src={
            profile.profileUrl
              ? `${profile.profileUrl}` // Adjust if needed for relative paths
              : "https://via.placeholder.com/150"
          }
          alt="User Profile"
        />
        <h2 className="text-xl font-semibold text-gray-800">
          {profile.username || "John Doe"}
        </h2>
        <p className="text-gray-600">
          {profile.email || "johndoe@example.com"}
        </p>
        <p className="text-gray-600 mt-2 text-center">
          {profile.bio || "Sharing is caring"}
        </p>
        <div className="mt-4 flex space-x-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={() => navigate("/")}
          >
            Logout
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
            Create Blogs
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
