import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, updateProfile } from '../../redux/features/profile/profileSlice';
import FileUpload from '../common/FileUpload/FileUpload';

const UserProfile = () => {
  const { profile, status, error } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile(localStorage.getItem('token')));
  }, [dispatch]);

  const handleUploadComplete = (fileUrl) => {
    const token = localStorage.getItem('token');
    dispatch(updateProfile({ token, bio: profile?.bio || '', profileUrl: fileUrl }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md w-full max-w-md">
        {status === 'loading' && <p className="text-gray-500">Loading...</p>}
        {status === 'failed' && <p className="text-red-500">Error: {error}</p>}
        {status === 'succeeded' && profile && (
          <div className="text-center">
            <img
              src={profile.profileUrl}
              alt="User Profile"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h1 className="text-xl font-semibold text-gray-800">{profile.username}</h1>
            <p className="mt-2 text-gray-600">Email: {profile.email}</p>
            <p className="mt-2 text-gray-600">User ID: {profile.id}</p>
            <p className="mt-2 text-gray-600">Bio: {profile.bio}</p>
          </div>
        )}
        <FileUpload onUploadComplete={handleUploadComplete} />
      </div>
    </div>
  );
};

export default UserProfile;
