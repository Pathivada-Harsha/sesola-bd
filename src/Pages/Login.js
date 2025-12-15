// src/Pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages-css/Login.css";
import heroDesktop from "../images/logo.png";
import heroMobile from "../images/logo.png";
/*
  Replace the image imports below with your actual image paths.
  Examples:
    import heroDesktop from "../assets/login-desktop.png";
    import heroMobile from "../assets/login-mobile.png";
  Or put images in public/ and use: const heroDesktop = "/images/login-desktop.png";
*/
// const heroDesktop = "../images/logo.png"; // <- update to your desktop image path
// const heroMobile = "../images/logo.png";   // <- update to your mobile image path

export default function Login() {
  const navigate = useNavigate();

  // dummy credentials (front-end validation only, per your request)
  const DUMMY_EMAIL = "admin@sesolaenergy.com";
  const DUMMY_PASSWORD = "Password123";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // small client-side validation
    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    setLoading(true);
    // simulate async (very short)
    await new Promise((r) => setTimeout(r, 500));

    if (email.trim().toLowerCase() === DUMMY_EMAIL && password === DUMMY_PASSWORD) {
      // success -> navigate to dashboard
      // you may want to set auth token / context here
      navigate("/dashboard", { replace: true });
    } else {
      setError("Invalid credentials. Try: admin@axcl.com / Password123");
    }
    setLoading(false);
  }

  return (
    <div className="login-root">
      <div className="login-container">
        {/* LEFT: hero for larger screens */}
        <div className="login-hero">
          <img src={heroDesktop} alt="AXCL logo" className="login-hero-img desktop" />
          <img src={heroMobile} alt="AXCL logo" className="login-hero-img mobile" />
        </div>

        {/* RIGHT: form */}
        <div className="login-panel">
          <div className="login-card">
            <h2 className="login-heading">Welcome back</h2>
            <p className="login-sub">Sign in to continue to BD Portal</p>

            <form className="login-form" onSubmit={handleSubmit}>
              <label className="login-label">Email Address <span className="required">*</span></label>
              <input
                className="login-input"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
              />

              <label className="login-label">Password <span className="required">*</span></label>
              <div className="login-password-row">
                <input
                  className="login-input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="login-showpw"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label="toggle password"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <div className="login-extras">
                <a className="login-forgot" href="#0" onClick={(e) => e.preventDefault()}>
                  Forget Password? Reset Now.
                </a>
              </div>

              {error && <div className="login-error">{error}</div>}

              <div className="login-submit-row">
                <button type="submit" className="login-btn" disabled={loading}>
                  {loading ? "Signing in..." : "Sign in"}
                </button>
              </div>
            </form>
          </div>

          <div className="login-footer-note">
            For demo: <strong>admin@sesolaenergy.com</strong> / <strong>Password123</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
