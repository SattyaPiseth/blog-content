import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Quill from 'quill';
import Editor from '../../redux/features/blog/Editor';

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category_ids: ['23c70ee2-df8c-4284-a5b5-3302a0702a6b'],
    thumbnail: '',
  });

  const [error, setError] = useState(''); // State for error message

  const quillRef = useRef();
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to upload thumbnail
  const uploadThumbnail = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await fetch('https://blog-api.automatex.dev/uploads', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        const errorText = await response.text();  // Change to text() to catch the error message
        throw new Error(`Failed to upload thumbnail: ${response.status} - ${errorText}`);
      }
  
      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error('Thumbnail upload error:', error.message);
      throw error;
    }
  };  

  const handleEditorChange = () => {
    const editorContent = quillRef.current.getContents(); // Get the content from the Quill editor
    setFormData((prevData) => ({
      ...prevData,
      content: editorContent,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let thumbnailUrl = '';

      // Upload the thumbnail if it's selected
      if (formData.thumbnail) {
        thumbnailUrl = await uploadThumbnail(formData.thumbnail);
      }

      // Construct the request body
      const raw = {
        title: formData.title,
        content: formData.content,
        category_ids: formData.category_ids,
        thumbnail: thumbnailUrl || formData.thumbnail, // Use uploaded URL or existing thumbnail URL
      };

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(raw), // Convert raw object to JSON string
        redirect: "follow",
      };

      // Submit the blog data to the API
      const response = await fetch("https://blog-api.automatex.dev/blogs", requestOptions);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create blog: ${response.status} - ${errorText}`);
      }

      // Handle success (e.g., redirect, show success message, etc.)
      navigate('/'); // Redirect to homepage after successful blog creation
    } catch (error) {
      setError('Failed to create blog. Please try again.');
      console.error('Error creating blog:', error);
    }
  };

  React.useEffect(() => {
    // Initialize Quill editor with toolbar options
    const quill = new Quill(quillRef.current, {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          ['bold', 'italic', 'underline', 'strike'],
          ['link', 'image', 'blockquote'],
          ['code-block'], // Add the code-block button to the toolbar
        ],
      },
    });

    // Update the content state when the editor changes
    quill.on('text-change', handleEditorChange);
  }, []);

  return (
    <div className="container mx-auto p-6">
      {/* Back Home Button */}
      <button
        onClick={() => navigate('/')}
        className="bg-gray-700 text-white py-2 px-4 rounded-md shadow-md hover:bg-gray-800 transition-colors my-4"
      >
        Back Home
      </button>
      <h2 className="text-2xl font-bold mb-6">Create a New Blog</h2>

      {/* Title Input */}
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium">Title</label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="mt-1 p-2 border rounded-md w-full"
          placeholder="Enter blog title"
        />
      </div>

      {/* Thumbnail Input */}
      <div className="mb-4">
        <label htmlFor="thumbnail" className="block text-sm font-medium">Thumbnail</label>
        <input
          type="file"
          id="thumbnail"
          onChange={(e) => setFormData({ ...formData, thumbnail: e.target.files[0] })}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>

      {/* Quill Editor */}
      <div ref={quillRef} className="mb-4 p-4 border rounded-md shadow-md" />

      {/* Error Message */}
      {error && <div className="text-red-500 my-4">{error}</div>}

      {/* Submit Button */}
      <div className="mt-6">
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreateBlog;
