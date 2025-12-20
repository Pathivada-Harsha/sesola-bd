// src/Pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../pages-css/Login.css";
import heroDesktop from "../images/logo.png";
import heroMobile from "../images/logo.png";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please enter username and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/login/userLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,   
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store user data
        login(data);

        // Navigate to dashboard
        navigate("/dashboard", { replace: true });
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Unable to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-root">
      <div className="login-container">
        {/* LEFT: hero */}
        <div className="login-hero">
          <img
            src={heroDesktop}
            alt="BD Portal logo"
            className="login-hero-img desktop"
          />
          <img
            src={heroMobile}
            alt="BD Portal logo"
            className="login-hero-img mobile"
          />
        </div>

        {/* RIGHT: login form */}
        <div className="login-panel">
          <div className="login-card">
            <h2 className="login-heading">Welcome back</h2>
            <p className="login-sub">
              Sign in to continue to BD Portal
            </p>

            <form className="login-form" onSubmit={handleSubmit}>
              <label className="login-label">
                Username <span className="required">*</span>
              </label>
              <input
                className="login-input"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                disabled={loading}
              />

              <label className="login-label">
                Password <span className="required">*</span>
              </label>
              <div className="login-password-row">
                <input
                  className="login-input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="login-showpw"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label="toggle password"
                  disabled={loading}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <div className="login-extras">
                <button
                  type="button"
                  className="login-forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("Forgot password clicked");
                  }}
                >
                  Forgot Password? Reset Now.
                </button>
              </div>

              {error && <div className="login-error">{error}</div>}

              <div className="login-submit-row">
                <button
                  type="submit"
                  className="login-btn"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>
              </div>
            </form>
          </div>

          <div className="login-footer-note">
            For demo: <strong>AdminSesola</strong> /{" "}
            <strong>Admin@123</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
