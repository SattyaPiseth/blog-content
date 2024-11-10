import React from "react";
import { useForm } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";

const CreateBlog = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create Blog</h2>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Thumbnail Upload */}
        <label className="block text-gray-700 mb-2">Upload Thumbnail</label>
        <input
          type="file"
          {...register("thumbnail")}
          className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300"
        />

        {/* Title */}
        <input
          type="text"
          placeholder="Enter Your Title"
          {...register("title", { required: true })}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />

        {/* Category */}
        <input
          type="text"
          placeholder="Enter Your Category"
          {...register("category", { required: true })}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />

        {/* Rich Text Editor for Content */}
        <label className="block text-gray-700 mb-2">Content</label>
        <Editor
          apiKey="your-tinymce-api-key"
          init={{
            height: 300,
            menubar: true,
            plugins: "link image code",
            toolbar:
              "undo redo | formatselect | bold italic | alignleft aligncenter alignright | code",
          }}
          onEditorChange={(content) => {
            // Here you could update the content in the form state
          }}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
