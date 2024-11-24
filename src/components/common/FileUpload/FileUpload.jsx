import React, { useState } from 'react';

const FileUpload = ({ onUploadComplete }) => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('files', file);

    try {
      setUploadStatus('Uploading...');
      const response = await fetch('https://blog-api.automatex.dev/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('File upload failed');
      }

      const data = await response.json();
      setUploadStatus('Upload successful!');
      console.log('Uploaded file URL:', data.files[0].url);

      onUploadComplete(data.files[0].url); // Pass the URL to the parent component

      // Clear the selected file
      setFile(null);
      // Reset the file input field
      document.getElementById('file-input').value = ''; // Clearing file input field
    } catch (error) {
      setUploadStatus('Upload failed');
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <input
        id="file-input"
        type="file"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      <button
        onClick={handleUpload}
        className="mt-2 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Upload
      </button>
      {uploadStatus && <p className="mt-2 text-sm">{uploadStatus}</p>}
    </div>
  );
};

export default FileUpload;
