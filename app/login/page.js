"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import "../styles/Auth.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  

  //
  const handleSubmit = async (e) => {
    e.preventDefault(); 



    console.log("Submitting:", { username, password });

    if (!username || !password) return;

    setLoading(true);
   setPopupMessage("Logging in...");
    setShowPopup(true);

    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });
 localStorage.setItem("token", res.data.token);
      setPopupMessage(res.data.message);

      if (res.data.message === "Login successful") {
        setTimeout(() => router.push("/dashboard"), 1000);//
      }
    } catch (err) {
      setPopupMessage(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-left">
          <img src="/group112.png" alt="Login" className="hero-img" />
        </div>

        <div className="auth-right">
          <h2>Login</h2>
          <p className="subtitle">Enter your credentials</p>

          <form onSubmit={handleSubmit}>
            <input
            type="text"
            name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit" 
              className="primary-btn"
              disabled={loading}
              
            >
              {loading ? "Checking..." : "Login"}
            </button>
          </form>

          <p className="terms">
            Don’t have an account?{" "}
            <span
              className="btn-link"
              onClick={() => router.push("/signup")}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <div className="tick">
              {popupMessage === "Login successful" ? "✓" : "✕"}
            </div>
            <p>{popupMessage}</p>
            <button
              className="primary-btn"
              onClick={() => setShowPopup(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}












