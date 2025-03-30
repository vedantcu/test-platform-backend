import "./styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Test from "./pages/Test";
import Navbar from "./components/Navbar";
import TestPage from "./pages/TestPage";
import Analytics from "./pages/Analytics";
import VectorsTest from "./pages/VectorsTest";
import ThreeDGeometryTest from "./pages/ThreeDGeometryTest";
import SolidStateTest from "./pages/SolidStateTest";
import { useState, useEffect } from "react";

// ✅ Firebase Auth Imports
import { auth, googleProvider } from "./firebase"; // ✅ Fix import
import { signInWithPopup, signOut } from "firebase/auth";

function App() {
    // ✅ Dark Mode State
    const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "enabled");
    
    // ✅ User Authentication State
    const [user, setUser] = useState(null);

    // ✅ Apply Dark Mode on Load
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
        signOut(auth).then(() => setUser(null)).catch((error) => console.error("Sign-Out Error:", error));
    };

    return (
        <Router>
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

            {/* ✅ Google Sign-In Button */}
            <div className="auth-container">
                {user ? (
                    <div className="user-info">
                        <img src={user.photoURL} alt="User" className="user-img" />
                        <p>Welcome, {user.displayName}!</p>
                        <button onClick={handleSignOut} className="auth-btn">Sign Out</button>
                    </div>
                ) : (
                    <button onClick={handleSignIn} className="auth-btn">Sign In with Google</button>
                )}
            </div>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/test" element={<Test />} />

                {/* ✅ Subject-wise Test Routes */}
                <Route path="/test/subject/:category" element={<TestPage />} />
                <Route path="/analytics" element={<Analytics />} />

                {/* ✅ Topic-wise Test Routes */}
                <Route path="/test/topic/:category" element={<TestPage />} />
                <Route path="/test/topic/maths/vectors" element={<VectorsTest />} />
                <Route path="/test/topic/maths/3d-geometry" element={<ThreeDGeometryTest />} />
                <Route path="/test/topic/chemistry/solid-state" element={<SolidStateTest />} />
            </Routes>
        </Router>
    );
}

export default App;
