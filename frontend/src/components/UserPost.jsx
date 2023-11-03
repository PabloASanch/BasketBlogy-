import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaSave, FaBan, FaTrash } from 'react-icons/fa';

export const UserPost = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const userKey = user.key;
  const [userPosts, setUserPosts] = useState([]);
  const [userPfp, setUserPfp] = useState('');
  const [editingPostId, setEditingPostId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    description: '',
  });
  const [searchQuery, setSearchQuery] = useState('');

  const getCurrentUserPfp = () => {
    axios
      .get(`http://localhost:4000/users/getUserPfp?key=${user.key}`)
      .then((response) => {
        const pfpUrl = response.data.pfp;
        setUserPfp(pfpUrl);
      })
      .catch((error) => {
        console.error("Error fetching user pfp: ", error);
      });
  };

  const fetchUserPosts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/posts/userPosts?key=${userKey}`
      );
      setUserPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditPost = (postId) => {
    const postToEdit = userPosts.find((post) => post._id === postId);

    setEditFormData({
      title: postToEdit.title,
      description: postToEdit.description,
    });

    setEditingPostId(postId);
  };

  const handleCancelEdit = () => {
    setEditingPostId(null);
    setEditFormData({
      title: '',
      description: '',
    });
  };

  const handleSaveEdit = async (postId) => {
    try {
      await axios.put(`http://localhost:4000/posts/editPost/${postId}`, editFormData);
      setEditingPostId(null);
      setEditFormData({
        title: '',
        description: '',
      });
      fetchUserPosts();
    } catch (error) {
      console.error("Error editing post: ", error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:4000/posts/deletePost/${postId}`);
      fetchUserPosts();
    } catch (error) {
      console.error("Error deleting post: ", error);
    }
  };

  useEffect(() => {
    getCurrentUserPfp();
    fetchUserPosts();
  }, [userKey]);

  const filterUserPosts = () => {
    if (searchQuery === '') {
      return userPosts;
    } else {
      return userPosts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  };

  const filteredUserPosts = filterUserPosts();

  return (
    <div >
      <h3 className='text-3xl'>Your Posts</h3>
      <input
        type='text'
        placeholder='Search for a post...'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className='border mt-4 p-2 w-full mb-5'
      />

      {filteredUserPosts.map((post) => (
        <div className='mt-6' key={post._id}>
          <div className='max-w-4xl px-10 py-6 mx-auto bg-white rounded-lg shadow-md'>
            {editingPostId === post._id ? (
              <div className='flex flex-col gap-5'>
                <h4>Update Title</h4>
                <input
                  type='text'
                  placeholder='Title'
                  value={editFormData.title}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, title: e.target.value })
                  }
                  className='border'
                />
                <h4>Update Description</h4>
                <textarea
                  placeholder='Description'
                  value={editFormData.description}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, description: e.target.value })
                  }
                  className='resize-none border'
                />
                <button
                  className='flex items-center gap-2'
                  onClick={() => handleSaveEdit(post._id)}
                >
                  <FaSave /> Save
                </button>
                <button className='flex items-center gap-2' onClick={handleCancelEdit}>
                  <FaBan /> Cancel
                </button>
              </div>
            ) : (
              <div>
                <div className='mt-2'>
                  <a href='#' className='text-2xl font-bold text-gray-700 hover:underline'>
                    {post.title}
                  </a>
                  <p className='mt-2 text-gray-600'>{post.description}</p>
                </div>
                <div className='flex items-center justify-between mt-4'>
                  <p className='text-gray-600'>{new Date(post.date).toDateString()}</p>

                  <div>
                    <a href='#' className='flex items-center'>
                      <img
                        src={userPfp ? userPfp : 'err'}
                        alt='avatar'
                        className='hidden object-cover w-10 h-10 mx-4 rounded-full sm:block'
                      />
                      <h1 className='font-bold text-gray-700 hover:underline'>
                        {user.username}
                      </h1>
                    </a>
                  </div>
                </div>
                <div className='flex gap-3'>
                  <button className='flex items-center' onClick={() => handleEditPost(post._id)}>
                    <FaEdit /> Edit
                  </button>
                  <button className='flex items-center' onClick={() => handleDeletePost(post._id)}>
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
