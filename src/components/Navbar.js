import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import "../styles.css"; // ✅ Ensure styles are applied

const Navbar = ({ user, setUser }) => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "enabled");

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode ? "enabled" : "disabled");
  }, [darkMode]);

  // ✅ Google Sign-In
  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  // ✅ Sign Out
  const handleSignOut = () => {
    signOut(auth)
      .then(() => setUser(null))
      .catch((error) => console.error("Sign-Out Error:", error));
  };

  return (
    <nav className={`navbar ${darkMode ? "dark-navbar" : ""}`}>
      {/* ✅ Navbar Buttons (Aligned to Left) */}
      <div className="nav-links">
        <Link to="/" className="nav-btn">🏠 Home</Link>
        <Link to="/test" className="nav-btn">📝 Test</Link>
        <Link to="/analytics" className="nav-btn">📊 Analytics</Link>
      </div>

      {/* ✅ Sign-In Button & Dark Mode Toggle (Right Side) */}
      <div className="nav-right">
        {user ? (
          <div className="user-info">
            <img src={user.photoURL} alt="User" className="user-img" />
            <button onClick={handleSignOut} className="auth-btn">Sign Out</button>
          </div>
        ) : (
          <button onClick={handleSignIn} className="auth-btn">Sign In</button>
        )}

        {/* ✅ Dark Mode Toggle (Far Right) */}
        <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
