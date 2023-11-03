import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignUp } from "./components/SignUp";
import { SignIn } from "./components/SignIn";
import { Navbar } from "./components/Navbar";
import { Dashboard } from "./components/Dashboard";
import { Index } from "./components";
import { Create } from "./components/Create";
import { Post } from "./components/Post";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {

    localStorage.setItem("isLoggedIn", isLoggedIn);
    localStorage.setItem("user", JSON.stringify(user));
  }, [isLoggedIn, user]);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} user={user}/>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/post" element={<Post />} />
        <Route path="/create" element={<Create />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn  setIsLoggedIn={setIsLoggedIn} setUser={setUser}/> } />
        <Route path="/dashboard" element={<Dashboard user={user}  setUser={setUser}/>} />
      </Routes>
    </Router>
  );
}

export default App;
