import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, updateProfile } from "../../redux/features/profile/profileSlice";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile, error, loading } = useSelector((state) => state.profile);

  const token = localStorage.getItem("token");

  const [newBio, setNewBio] = useState("");
  const [newProfileUrl, setNewProfileUrl] = useState("");

  // Fetch profile data on mount
  useEffect(() => {
    if (token) {
      dispatch(getProfile(token)); // Fetch profile when the component mounts
    }
  }, [dispatch, token]);

  // Update state once profile is available
  useEffect(() => {
    if (profile) {
      setNewBio(profile.bio || "");
      setNewProfileUrl(profile.profileUrl || "");
    }
  }, [profile]); // Only update when profile is fully loaded

  // Debugging log to check profile state and error
  useEffect(() => {
    console.log("Profile data in component:", profile);
    console.log("Error:", error);
    console.log("Loading state:", loading);
  }, [profile, error, loading]);

  // Show loading state while profile is being fetched
  if (loading) {
    return <p className="text-center">Loading profile data...</p>;
  }

  // Show error if profile fetch fails
  if (error) {
    return <p>Error loading profile data: {error}</p>;
  }

  // If no profile, display an error message
  if (!profile) {
    return <p>Profile data is not available.</p>;
  }

  // Handle input changes for bio and profile image
  const handleBioChange = (e) => setNewBio(e.target.value);
  const handleProfileImageChange = (e) => setNewProfileUrl(URL.createObjectURL(e.target.files[0]));

  const handleSubmit = () => {
    const updatedData = { bio: newBio, profileUrl: newProfileUrl };
    dispatch(updateProfile({ token, ...updatedData }));
  };

  return (
    <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-10 p-6">
      <div className="flex flex-col items-center">
        <img
          className="w-24 h-24 object-cover rounded-full shadow-lg mb-4"
          src={newProfileUrl || "https://via.placeholder.com/150"}
          alt="User Profile"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleProfileImageChange}
          className="mt-4"
        />
        <h2 className="text-xl font-semibold text-gray-800">{profile.username || "John Doe"}</h2>
        <p className="text-gray-600">{profile.email || "johndoe@example.com"}</p>

        <div className="mt-4">
          <textarea
            value={newBio}
            onChange={handleBioChange}
            className="w-full p-2 border rounded-md"
            placeholder="Update your bio"
          />
        </div>

        <div className="mt-4 flex space-x-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={() => navigate("/")}
          >
            Logout
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            onClick={handleSubmit}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
