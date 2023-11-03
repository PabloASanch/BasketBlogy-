import axios from "axios";
import { useState, useEffect } from "react";

export const Author = () => {
  const [authors, setAuthors] = useState([]);

  const getAuthors = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/Posts/getAuthors"
      );

      const authorData = [];
      for (let i = 0; i < response.data.length; i++) {
        const authorKey = response.data[i];
        const userResponse = await axios.get(
          `http://localhost:4000/users/getUserData?key=${authorKey}`
        );
        authorData.push(userResponse.data);
      }

      setAuthors(authorData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAuthors();
  }, []);

  return (
    <ul>
      {authors.map((author) => (
        <li className="mb-2">
          <a href="#" className="text-blue-500 hover:underline flex gap-2">
            <img src={author.pfp} alt="Profile Picture" width={30} className="rounded-full"/>
            {author.username}
          </a>
        </li>
      ))}
    </ul>
  );
};
