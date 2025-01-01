"use client"

import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {jwtDecode} from 'jwt-decode';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Image from 'next/image';

const ItemType = 'CONTENT_ITEM';

const DraggableItem = ({ item, index, moveItem, handleChange, handleFileChange, handleRemove }) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const imageUrl = useMemo(() => {
    if (item.type === 'image' && item.value) {
      return item.value;
    }
    return null;
  }, [item.type, item.value]);

  return (
    <div ref={(node) => ref(drop(node))} className="relative p-4 border rounded bg-white">
      {item.type === 'text' && (
        <textarea
          className="w-full p-2 border rounded text-black"
          value={item.value || ''}
          onChange={(e) => handleChange(index, e.target.value)}
          placeholder="Write your text here..."
        />
      )}
      {item.type === 'image' && (
        <div>
          <input
            type="file"
            accept="image/*"
            className="w-full p-2 border rounded"
            onChange={(e) => handleFileChange(index, e.target.files[0])}
          />
          {imageUrl && (
            <div className="mt-2 relative w-full h-48">
              <Image
                src={imageUrl}
                alt="Selected"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
              />
            </div>
          )}
        </div>
      )}
      {item.type === 'video' && (
        <input
          type="file"
          accept="video/*"
          className="w-full p-2 border rounded"
          onChange={(e) => handleFileChange(index, e.target.files[0])}
        />
      )}
      <button onClick={() => handleRemove(index)} className="absolute top-0 right-0 p-2 bg-red-500 text-white rounded">Remove</button>
      <label className='text-black'>{item.type}</label>
    </div>
  );
};

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [content, setContent] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp > currentTime) {
        setIsLoggedIn(true);
      }
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        localStorage.setItem('token', result.token);
        setIsLoggedIn(true);
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Failed to log in.');
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const result = await response.json();
      if (response.ok) {
        alert(result.message);
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error('Error signing up:', error);
      alert('Failed to sign up.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const addText = () => {
    setContent([...content, { type: 'text', value: '' }]);
  };

  const addImage = () => {
    setContent([...content, { type: 'image', value: '' }]);
  };

  const addVideo = () => {
    setContent([...content, { type: 'video', value: '' }]);
  };

  const handleChange = (index, value) => {
    const newContent = [...content];
    newContent[index].value = value;
    setContent(newContent);
  };

  const handleFileChange = (index, file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const newContent = [...content];
      newContent[index].value = reader.result; // Store base64 string
      setContent(newContent);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = (index) => {
    const newContent = content.filter((_, i) => i !== index);
    setContent(newContent);
  };

  const moveItem = (fromIndex, toIndex) => {
    const newContent = [...content];
    const [movedItem] = newContent.splice(fromIndex, 1);
    newContent.splice(toIndex, 0, movedItem);
    setContent(newContent);
  };

  const handleSave = async () => {
    const response = await fetch('/api/saveAdminPost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    if (response.ok) {
      alert('Content saved successfully!');
    } else {
      alert('Failed to save content.');
    }
  };

  if (isLoggedIn) {
    return (
      <DndProvider backend={HTML5Backend}>
        <div className="w-1/2 p-4 border mx-auto mt-20">
          <div className="absolute top-4 right-4">
            <button onClick={handleLogout} className="dar:text-white mr-8 font-bold">Logout</button>
          </div>
          <div className="flex space-x-4 mb-4">
            <button onClick={addText} className="p-2 bg-blue-500 text-white rounded">Add Text</button>
            <button onClick={addImage} className="p-2 bg-green-500 text-white rounded">Add Image</button>
            <button onClick={addVideo} className="p-2 bg-red-500 text-white rounded">Add Video</button>
          </div>
          <div className="space-y-4">
            {content.map((item, index) => (
              <DraggableItem
                key={index}
                item={item}
                index={index}
                moveItem={moveItem}
                handleChange={handleChange}
                handleFileChange={handleFileChange}
                handleRemove={handleRemove}
              />
            ))}
          </div>
          <button onClick={handleSave} className="mt-4 p-2 bg-blue-500 text-white rounded">Save Content</button>
        </div>
      </DndProvider>
    );
  }

  return (
    <div className="grid grid-col-1 mx-auto w-1/6 mt-28">
      <form onSubmit={handleLogin} className="p-8 dark:bg-black shadow-md rounded-lg">
        <div className="mb-4">
          <label className="block dark:text-white text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Enter your username'
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block dark:text-white text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter your password'
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
          <button
            onClick={handleSignUp}
            className="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
