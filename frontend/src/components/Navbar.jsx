import React from "react";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = ({ isLoggedIn, user }) => {
  const navigate = useNavigate();

  const goToPost = () => {
    navigate("/post");
  };

  const handleLinkClick = () => {
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/signup");
    }
  };

  return (
    <nav className="flex justify-around p-4 items-center shadow-2xl bg-slate-100">
      <Link to={"/"}>
        <h1 className="cursor-pointer link link-underline link-underline-black">
          BasketBlogy!
        </h1>
      </Link>

      <ul className="flex gap-4 items-center">
        {user ? (
          <div onClick={goToPost}>
            <li className="cursor-pointer link link-underline link-underline-black">
              Postys
            </li>
          </div>
        ) : (
          ""
        )}

        <div
          className="flex items-center gap-1 hover:scale-110 transition-transform hover:transition-transform cursor-pointer"
          onClick={handleLinkClick}
        >
          <li>
            <FaUser className="text-red-600 text-4xl border-2 border-black rounded-full p-1  transition-transform hover:transition-transform" />
          </li>
          <p>{user ? user.username : "Guest"}</p>
        </div>
      </ul>
    </nav>
  );
};
