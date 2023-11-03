import { useEffect, useState } from "react";
import Axios from "axios";

export const PostTemp = () => {
  const [posts, setPosts] = useState([]);
  const [User, setUser] = useState(null); 
  const [sortOrder, setSortOrder] = useState("latest");
  const userJSON = localStorage.getItem("user");
  const user = JSON.parse(userJSON);
  const [blogpfp, setBlogpfp] = useState("")

  const getBlogUser = (user) => {
    return Axios.get(`http://localhost:4000/users/getUserPfp?key=${user}`)
      .then((res) => {
        setBlogpfp(res.data.pfp)
      })
      .catch((error) => {
        console.error("Error fetching user pfp: ", error);
      });
  };

  const getCurrentUser = (user) => {
    Axios.get(`http://localhost:4000/users/getUserPfp?key=${user.key}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user pfp: ", error);
      });
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await Axios.get("http://localhost:4000/Posts/getPost");
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    getCurrentUser(user);
  }, [user]);

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const sortedPosts = [...posts];
  if (sortOrder === "latest") {
    sortedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (sortOrder === "oldest") {
    sortedPosts.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  return (
    <div className="w-full lg:w-8/12">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-700 md:text-2xl">Post</h1>
        <div>
          <select
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={sortOrder}
            onChange={handleSortChange}
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>
      {sortedPosts.map((post) => {
      getBlogUser(post.user.key)
      return (
        <div className="mt-6" key={post._id}>
          <div className="max-w-4xl px-10 py-6 mx-auto bg-white rounded-lg shadow-md">
            <div className="mt-2">
              <a href="#" className="text-2xl font-bold text-gray-700 hover:underline">
                {post.title}
              </a>
              <img src={post.img}></img>
              <p className="mt-2 text-gray-600">{post.description}</p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <p className="text-gray-600">{new Date(post.date).toDateString()}</p>
              <div>
                <a href="#" className="flex items-center">
                  <img
                    src={User ? User.pfp : "err"} 
                    alt="avatar"
                    className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block"
                  />
                  <h1 className="font-bold text-gray-700 hover:underline">
                    {post.user.username}
                  </h1>
                </a>
              </div>
            </div>
          </div>
        </div>
      )})}
    </div>
  );
};
