import React, { useState } from 'react';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryIds, setCategoryIds] = useState([]);
  const [thumbnail, setThumbnail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the request data
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer YOUR_BEARER_TOKEN"); // Replace with your token

    const raw = JSON.stringify({
      title,
      content,
      category_ids: categoryIds,
      thumbnail
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    // Sending the request to the API
    fetch("https://blog-api.automatex.dev/blogs", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((result) => {
        console.log("Blog created successfully:", result);
        setStatus("Blog created successfully!");
      })
      .catch((error) => {
        console.error("Error creating blog:", error);
        setStatus("Error creating blog");
      });
  };

  return (
    <div>
      <h1>Create Blog</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Category IDs:</label>
          <input 
            type="text" 
            value={categoryIds} 
            onChange={(e) => setCategoryIds(e.target.value.split(','))} 
            placeholder="Enter comma-separated IDs" 
          />
        </div>
        <div>
          <label>Thumbnail URL:</label>
          <input 
            type="text" 
            value={thumbnail} 
            onChange={(e) => setThumbnail(e.target.value)} 
            placeholder="Enter thumbnail URL" 
          />
        </div>
        <button type="submit">Create Blog</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};

export default CreateBlog;
