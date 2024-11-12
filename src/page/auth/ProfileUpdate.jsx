// src/page/auth/ProfileUpdate.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../redux/features/profile/profileSlice";

const ProfileUpdate = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const [bio, setBio] = useState(profile.bio);
  const [profileUrl, setProfileUrl] = useState(profile.profileUrl);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ bio, profileUrl }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Bio:
        <input
          type="text"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </label>
      <label>
        Profile URL:
        <input
          type="text"
          value={profileUrl}
          onChange={(e) => setProfileUrl(e.target.value)}
        />
      </label>
      <button type="submit">Update Profile</button>

      {profile.status === "loading" && <p>Updating...</p>}
      {profile.status === "failed" && <p>Error: {profile.error}</p>}
      {profile.status === "succeeded" && <p>Profile updated!</p>}
    </form>
  );
};

export default ProfileUpdate;
