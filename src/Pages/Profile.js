// src/Pages/Profile.jsx
import React, { useState, useRef } from "react";
import "../pages-css/Profile.css";

export default function Profile() {
  const initialUser = {
    id: "U-1001",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 90000 00000",
    role: "BD Manager",
    team: "Business Development",
    joined: "2024-03-12T09:30:00Z",
    lastLogin: "2025-12-05T10:30:00Z",
    avatarUrl: null,
  };

  const [user, setUser] = useState(initialUser);
  const [editing, setEditing] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    team: user.team,
  });

  const [pwdForm, setPwdForm] = useState({
    current: "",
    newPwd: "",
    confirm: "",
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user.avatarUrl || null);
  const fileRef = useRef();

  function handleProfileChange(e) {
    const { name, value } = e.target;
    setProfileForm((p) => ({ ...p, [name]: value }));
  }

  function handlePwdChange(e) {
    const { name, value } = e.target;
    setPwdForm((p) => ({ ...p, [name]: value }));
  }

  function handleAvatarSelect(e) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;

    setAvatarFile(f);
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarPreview(ev.target.result);
    reader.readAsDataURL(f);
  }

  function clearAvatar() {
    setAvatarFile(null);
    setAvatarPreview(null);
    fileRef.current.value = "";
  }

  function saveProfile(e) {
    e.preventDefault();
    if (!profileForm.name || !profileForm.email) {
      alert("Please provide name and email.");
      return;
    }

    setUser((u) => ({
      ...u,
      name: profileForm.name,
      email: profileForm.email,
      phone: profileForm.phone,
      role: profileForm.role,
      team: profileForm.team,
      avatarUrl: avatarPreview || u.avatarUrl,
    }));

    setEditing(false);
    alert("Profile saved (stub). Replace with real API.");
  }

  function changePassword(e) {
    e.preventDefault();

    if (!pwdForm.current || !pwdForm.newPwd || !pwdForm.confirm) {
      alert("Fill all password fields.");
      return;
    }
    if (pwdForm.newPwd !== pwdForm.confirm) {
      alert("New password and confirm password do not match.");
      return;
    }

    setPwdForm({ current: "", newPwd: "", confirm: "" });
    alert("Password changed (stub). Replace with real API.");
  }

  function cancelEdit() {
    setEditing(false);
    setProfileForm({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      team: user.team,
    });

    setAvatarFile(null);
    setAvatarPreview(user.avatarUrl || null);
    if (fileRef.current) fileRef.current.value = "";
  }

  function initials(name) {
    return (name || "")
      .split(" ")
      .map((s) => s[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }

  return (
    <div className="profile-user-page-root page-container">
      <div className="profile-user-page-grid">
        
        {/* LEFT CARD */}
        <div className="profile-user-page-card card">
          <div className="profile-user-page-top">
            <div className="profile-user-page-avatar-wrap">
              {avatarPreview ? (
                <img src={avatarPreview} alt={user.name} className="profile-user-page-avatar-img" />
              ) : (
                <div className="profile-user-page-avatar-initials">
                  {initials(user.name)}
                </div>
              )}
            </div>

            <div className="profile-user-page-meta">
              <h2 className="profile-user-page-name">{user.name}</h2>
              <div className="profile-user-page-role">{user.role}</div>
              <div className="profile-user-page-email">{user.email}</div>
            </div>
          </div>

          <div className="profile-user-page-stats">
            <div className="profile-user-page-stat">
              <div className="profile-user-page-stat-title">Joined</div>
              <div className="profile-user-page-stat-value">
                {new Date(user.joined).toLocaleDateString()}
              </div>
            </div>

            <div className="profile-user-page-stat">
              <div className="profile-user-page-stat-title">Last Login</div>
              <div className="profile-user-page-stat-value">
                {new Date(user.lastLogin).toLocaleString()}
              </div>
            </div>

            <div className="profile-user-page-stat">
              <div className="profile-user-page-stat-title">Team</div>
              <div className="profile-user-page-stat-value">
                {user.team}
              </div>
            </div>
          </div>

          <div className="profile-user-page-actions">
            {!editing ? (
              <button className="btn primary" onClick={() => setEditing(true)}>
                Edit Profile
              </button>
            ) : (
              <>
                <button className="btn" onClick={cancelEdit}>Cancel</button>
                <button className="btn primary" onClick={saveProfile}>Save</button>
              </>
            )}
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="profile-user-page-main">

          {/* PROFILE FORM */}
          <form className="profile-user-page-form card" onSubmit={saveProfile}>
            <h3>Profile Details</h3>

            <div className="profile-user-page-row">
              <label>Name</label>
              <input name="name" value={profileForm.name} onChange={handleProfileChange} disabled={!editing} />
            </div>

            <div className="profile-user-page-row">
              <label>Email</label>
              <input name="email" value={profileForm.email} onChange={handleProfileChange} disabled={!editing} />
            </div>

            <div className="profile-user-page-row">
              <label>Phone</label>
              <input name="phone" value={profileForm.phone} onChange={handleProfileChange} disabled={!editing} />
            </div>

            <div className="profile-user-page-row">
              <label>Designation / Role</label>
              <input name="role" value={profileForm.role} onChange={handleProfileChange} disabled={!editing} />
            </div>

            <div className="profile-user-page-row">
              <label>Team</label>
              <input name="team" value={profileForm.team} onChange={handleProfileChange} disabled={!editing} />
            </div>

            <div className="profile-user-page-row">
              <label>Avatar</label>
              <div className="profile-user-page-avatar-controls">
                <input ref={fileRef} type="file" accept="image/*" onChange={handleAvatarSelect} disabled={!editing} />
                {avatarPreview && (
                  <button type="button" className="btn" onClick={clearAvatar} disabled={!editing}>
                    Remove
                  </button>
                )}
              </div>
              <div className="profile-user-page-avatar-note">PNG, JPG. Max 2MB.</div>
            </div>

            {editing && (
              <div className="profile-user-page-actions-row">
                <button type="button" className="btn" onClick={cancelEdit}>
                  Cancel
                </button>
                <button type="submit" className="btn primary">
                  Save Profile
                </button>
              </div>
            )}
          </form>

          {/* PASSWORD FORM */}
          <form className="profile-user-page-password card" onSubmit={changePassword}>
            <h3>Change Password</h3>

            <div className="profile-user-page-row">
              <label>Current Password</label>
              <input type="password" name="current" value={pwdForm.current} onChange={handlePwdChange} />
            </div>

            <div className="profile-user-page-row">
              <label>New Password</label>
              <input type="password" name="newPwd" value={pwdForm.newPwd} onChange={handlePwdChange} />
            </div>

            <div className="profile-user-page-row">
              <label>Confirm New Password</label>
              <input type="password" name="confirm" value={pwdForm.confirm} onChange={handlePwdChange} />
            </div>

            <div className="profile-user-page-actions-row">
              <button type="submit" className="btn primary">Change Password</button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
