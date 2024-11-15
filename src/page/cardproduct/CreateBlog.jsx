import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import Quill from 'quill'; // Import Quill instance
import Editor from '../../redux/features/blog/Editor';

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category_ids: ['23c70ee2-df8c-4284-a5b5-3302a0702a6b'],
    thumbnail: '',
  });

  const [readOnly, setReadOnly] = useState(false); // Add readOnly state
  const [range, setRange] = useState(null); // Add state for range
  const [lastChange, setLastChange] = useState(null); // Add state for last change

  const quillRef = useRef();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleEditorChange = () => {
    const editorContent = quillRef.current.getContents(); // Get the content from the Quill editor
    setFormData((prevData) => ({
      ...prevData,
      content: editorContent,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch or submit formData which includes the content
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

      {/* Controls */}
      <div className="controls mb-4 flex items-center gap-4">
        <label className="flex items-center">
          <span className="mr-2">Read Only:</span>
          <input
            type="checkbox"
            checked={readOnly}
            onChange={(e) => setReadOnly(e.target.checked)}
            className="form-checkbox"
          />
        </label>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600"
          type="button"
          onClick={() => {
            alert(quillRef.current?.getLength());
          }}
        >
          Get Content Length
        </button>
      </div>

      {/* State Display */}
      <div className="state mb-4">
        <div className="state-title text-lg font-medium">Current Range:</div>
        <p className="text-sm">{range ? JSON.stringify(range) : 'Empty'}</p>
      </div>

      <div className="state mb-6">
        <div className="state-title text-lg font-medium">Last Change:</div>
        <p className="text-sm">{lastChange ? JSON.stringify(lastChange.ops) : 'Empty'}</p>
      </div>

      {/* Back Home Button */}
      <button
        onClick={() => navigate('/')}
        className="bg-gray-700 text-white py-2 px-4 rounded-md shadow-md hover:bg-gray-800 transition-colors"
      >
        Back Home
      </button>

      {/* Submit Button */}
      <div className="mt-6">
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-600"
        >
          Publish Blog
        </button>
      </div>
    </div>
  );
};

export default CreateBlog;
