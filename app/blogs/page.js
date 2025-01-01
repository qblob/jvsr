"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const BlogsPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/getAdminPosts');
      const result = await response.json();
      console.log('Fetched posts:', JSON.stringify(result, null, 2));
      setPosts(result);
    };

    fetchPosts();
  }, []);

  return (
    <div className="p-4">
      {posts.map((post, index) => (
        <div key={index} className="mb-8 p-4 w-1/2 mx-auto mt-16 border rounded">
          {post.content.map((item, idx) => (
            <div key={idx} className="mb-4">
              {item.type === 'text' && <p className="dark:text-white">{item.value}</p>}
              {item.type === 'image' && item.value && (
                <div className="relative w-full h-48">
                  <Image
                    src={`data:image/jpeg;base64,${item.value}`}
                    alt="Post Image"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-lg"
                  />
                </div>
              )}
              {item.type === 'video' && item.value && (
                <video controls className="w-full h-auto">
                  <source src={`data:video/mp4;base64,${item.value}`} type="video/mp4" />
                </video>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default BlogsPage;