import { useState, useEffect } from "react";
import Axios from "axios";
import { UserPost } from "./UserPost";
import { UserSettings } from "./settings";
import { useNavigate } from "react-router-dom";

export const Dashboard = ({ user }) => {
  const [currentPfp, setCurrentPfp] = useState(null);
  const [page, setPage] = useState("UserPost");
  const navigate = useNavigate();
  const getCurrentUserPfp = (user, setCurrentPfp) => {
    Axios.get(`http://localhost:4000/users/getUserPfp?key=${user.key}`)
      .then((response) => {
        const pfpUrl = response.data.pfp;
        setCurrentPfp(pfpUrl);
      })
      .catch((error) => {
        console.error("Error fetching user pfp: ", error);
      });
  };

  const [newUsername, setNewUsername] = useState(user.username);
  const [isEditingUsername, setIsEditingUsername] = useState(false);

  const handleEditUsername = () => {
    setIsEditingUsername(true);
  };

  const handleSaveUsername = () => {
    Axios.put("http://localhost:4000/users/updateUsername", {
      key: user.key,
      newUsername: newUsername,
    })
      .then((response) => {
        user.username = response.data.user.username;
        const existingUserJSON = localStorage.getItem("user");
          const existingUser = JSON.parse(existingUserJSON);
          existingUser.username = user.username;
          const updatedUserJSON = JSON.stringify(existingUser);
          localStorage.setItem("user", updatedUserJSON);
        setIsEditingUsername(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating username:", error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");

    return navigate("/"), window.location.reload();
  };

  useEffect(() => {
    getCurrentUserPfp(user, setCurrentPfp);
  }, [user.key]);
  return (
    <div className="w-full flex flex-row flex-wrap">
      <div className="w-full bg-white h-screen flex flex-row flex-wrap justify-center">
        <div className="w-0 md:w-1/4 lg:w-1/5 h-0 md:h-auto  overflow-y-hidden bg-slate-100 shadow-lg justify-center">
          <div className="p-5 bg-slate-100 sticky top-0">
            <img
              className=" border-red-600 shadow-2xl rounded-full ml-10 md:w-44"
              src={currentPfp}
              alt="Profile Picture"
            />
            <div className="pt-2 border-t mt-5 w-full text-center text-xl text-black">
              {user.username}
            </div>
          </div>
          <div className="w-full h-screen antialiased flex flex-col hover:cursor-pointer">
            <div
              className="hover:bg-red-700 bg-red-600 border-t-2 p-3 w-full text-xl text-left text-white font-semibold"
              onClick={() => setPage("UserPost")}
            >
              <i className="fa fa-cog text-white text-2xl pr-1 pt-1 float-right"></i>
              Your Post
            </div>
            <div
              className="hover:bg-red-700 bg-red-600 border-t-2 p-3 w-full text-xl text-left text-white font-semibold"
              onClick={() => setPage("UserSettings")}
            >
              <i className="fa fa-cog text-white text-2xl pr-1 pt-1 float-right"></i>
              Settings
            </div>
            <div
              className="hover:bg-red-700 bg-red-600 border-t-2 p-3 w-full text-xl text-left text-white font-semibold"
              onClick={handleLogout}
            >
              <i className="fa fa-arrow-left text-white text-2xl pr-1 pt-1 float-right"></i>
              Log out
            </div>
          </div>
        </div>

        <div className="w-full md:w-3/4 lg:w-4/5 p-5 md:px-12 lg:24 h-max overflow-hidden antialiased">
          {page === "UserPost" && <UserPost />}
          {page === "UserSettings" && (
            <UserSettings
              user={user}
              setCurrentPfp={setCurrentPfp}
              handleSaveUsername={handleSaveUsername}
              handleEditUsername={handleEditUsername}
              isEditingUsername={isEditingUsername}
              newUsername={newUsername}
              setNewUsername={setNewUsername}
            />
          )}
        </div>
      </div>
    </div>
  );
};
