import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export const Create = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem('user'));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      title,
      description,
      user,
    };

    try {
      const response = await axios.post('http://localhost:4000/Posts/CreatePost', newPost);
      return navigate('/post')
    } catch (error) {
      console.error('Error creating post:', error);
    }

    setTitle('');
    setDescription('');
  };

  return (
    <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl mt-32">
      <input
        className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
        spellCheck="false"
        placeholder="Title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none resize-none"

        spellCheck="false"
        placeholder="Describe everything about this post here"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <div className="icons flex text-gray-500 m-2">
      <div className="buttons flex">
        <div className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">
        <Link to={"/post"}>
            Cancel
        </Link>
        </div>
        <button
          type="submit"
          className="btn border border-red-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-red-500"
          onClick={handleSubmit}
        >
          Post
        </button>
      </div>
    </div>
    </div>
  )}
