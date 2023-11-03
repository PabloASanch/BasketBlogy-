import axios from "axios";
import { useState, useEffect } from "react";

export const LatestPost = () => {
  const [latestPosts, setLatestPosts] = useState([]);

  const getLatestPosts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/Posts/getLatestPosts"
      );
      setLatestPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getLatestPosts();
  }, []);

  return (
    <ul>
      {latestPosts.map((post, index) => (
        <li key={index} className="mb-2">
          <a href="#" className="text-blue-500 hover:underline">
            {post.title}
          </a>
        </li>
      ))}
    </ul>
  );
};
