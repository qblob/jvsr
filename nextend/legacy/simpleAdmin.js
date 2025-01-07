"use client"
import React, { useState } from 'react';

const AdminPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log({ title, description, image });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-10 border p-4 w-1/4 rounded-lg [&_*]:rounded-lg mx-auto my-10">
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 text-black"
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border min-h-[200px] p-2 text-left align-top text-black"
          />
        </div>
        <div>
          <label>Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full border p-2 text-black"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AdminPage;