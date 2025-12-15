// ClientDashboardFollowUps.js
import React, { useState } from "react";
import "../pages-css/Follow-ups.css";

export default function ClientDashboardFollowUps({ initialFollowUps = [], onAdd }) {
  // initialFollowUps: optional prop to seed follow-ups (array)
  const [followUps, setFollowUps] = useState(initialFollowUps);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [form, setForm] = useState({
    date: "",
    time: "",
    description: "",
    member: "",
    status: "Pending",
    notes: "",
  });

  const resetForm = () => {
    setForm({
      date: "",
      time: "",
      description: "",
      member: "",
      status: "Pending",
      notes: "",
    });
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function handleAdd(e) {
    e.preventDefault();
    // Basic validation
    if (!form.date || !form.description || !form.member) {
      alert("Please fill Date, Description and BD Member.");
      return;
    }

    const newFU = {
      id: `F-${Date.now()}`,
      date: form.date + (form.time ? ` ${form.time}` : ""),
      desc: form.description,
      member: form.member,
      status: form.status,
      notes: form.notes,
      createdAt: new Date().toISOString(),
    };

    const updated = [newFU, ...followUps];
    setFollowUps(updated);
    setShowForm(false);
    resetForm();

    if (typeof onAdd === "function") onAdd(newFU);
  }

  function handleDelete(id) {
    if (!window.confirm("Delete this follow-up?")) return;
    setFollowUps((list) => list.filter((f) => f.id !== id));
  }

  function toggleStatus(id) {
    setFollowUps((list) =>
      list.map((f) => (f.id === id ? { ...f, status: f.status === "Pending" ? "Completed" : "Pending" } : f))
    );
  }

  return (
    <div className="Client-Dashboard-page-followups-root">
      <div className="Client-Dashboard-page-followups-header">
        <h2>Follow-Ups</h2>
        <div className="Client-Dashboard-page-followups-actions">
          <button className="Client-Dashboard-page-btn" onClick={() => setShowForm((s) => !s)}>
            {showForm ? "Close" : "Add Follow-Up"}
          </button>
        </div>
      </div>

      {showForm && (
        <form className="Client-Dashboard-page-followups-form" onSubmit={handleAdd}>
          <div className="Client-Dashboard-page-form-row">
            <label>
              Date
              <input type="date" name="date" value={form.date} onChange={handleChange} />
            </label>
            <label>
              Time
              <input type="time" name="time" value={form.time} onChange={handleChange} />
            </label>
            <label>
              BD Member
              <input type="text" name="member" value={form.member} onChange={handleChange} placeholder="Assigned person" />
            </label>
            <label>
              Status
              <select name="status" value={form.status} onChange={handleChange}>
                <option>Pending</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>
            </label>
          </div>

          <div className="Client-Dashboard-page-form-row">
            <label style={{ flex: 2 }}>
              Description
              <textarea name="description" value={form.description} onChange={handleChange} placeholder="What to follow up about" />
            </label>

            <label style={{ flex: 1 }}>
              Notes (internal)
              <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Internal notes (optional)" />
            </label>
          </div>

          <div className="Client-Dashboard-page-form-actions">
            <button type="submit" className="Client-Dashboard-page-btn primary">Save Follow-Up</button>
            <button type="button" className="Client-Dashboard-page-btn" onClick={() => { resetForm(); setShowForm(false); }}>Cancel</button>
          </div>
        </form>
      )}

      <div className="Client-Dashboard-page-followups-list-card Client-Dashboard-page-card">
        <table className="Client-Dashboard-page-table Client-Dashboard-page-followups-table">
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Description</th>
              <th>BD Member</th>
              <th>Status</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {followUps.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "20px 0", color: "#6b7280" }}>
                  No follow-ups yet.
                </td>
              </tr>
            )}
            {followUps.map((f) => (
              <tr key={f.id}>
                <td>{f.date}</td>
                <td style={{ maxWidth: 360 }}>{f.desc}</td>
                <td>{f.member}</td>
                <td>
                  <button
                    className={`Client-Dashboard-page-followup-status ${f.status === "Completed" ? "completed" : f.status === "Cancelled" ? "cancelled" : "pending"}`}
                    onClick={() => toggleStatus(f.id)}
                    title="Toggle status"
                  >
                    {f.status}
                  </button>
                </td>
                <td style={{ maxWidth: 260 }}>{f.notes || "-"}</td>
                <td>
                  <button className="Client-Dashboard-page-link" onClick={() => alert(`Edit follow-up ${f.id} (implement edit)`)}>Edit</button>
                  <button className="Client-Dashboard-page-link" onClick={() => handleDelete(f.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
