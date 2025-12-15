// ClientDashboard.js
import React, { useState } from "react";
import "../pages-css/Client-dashboard.css";

export default function ClientDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedLead, setSelectedLead] = useState(null);

  // Mock data (replace with real data from API)
  const client = {
    name: "ABC Industries",
    company: "ABC Industries Pvt Ltd",
    type: "Corporate",
    status: "Active",
    email: "contact@abcind.com",
    phone: "+91 98765 43210",
    address: "Plot 12, Industrial Area, Hyderabad, Telangana",
    gst: "36ABCDE1234F1Z5",
    avatarUrl: "",
    assignedTo: "Vijay Kumar",
  };

  const kpis = [
    { id: 1, title: "Total Leads", value: 12, className: "leads" },
    { id: 2, title: "Proposals Sent", value: 5, className: "proposals" },
    { id: 3, title: "Quotations Given", value: 7, className: "quotations" },
    { id: 4, title: "Invoices Issued", value: 4, className: "invoices" },
    { id: 5, title: "Total Revenue (₹)", value: "1,25,000", className: "revenue" },
    { id: 6, title: "Outstanding (₹)", value: "18,500", className: "outstanding" },
  ];

  const leads = [
    { id: "L-001", date: "2025-11-25", summary: "Enquiry for 100kW inverter", status: "Contacted", assigned: "Ravi" },
    { id: "L-002", date: "2025-11-29", summary: "Site visit request", status: "New", assigned: "Meena" },
  ];

  const proposals = [
    { id: "P-101", title: "Solar + Battery proposal", version: "v1", value: 450000, status: "Sent", date: "2025-11-28" },
  ];

  const quotations = [
    { id: "Q-501", title: "Equipment & Installation", amount: 370000, validity: "2025-12-31", status: "Sent" },
  ];

  const invoices = [
    { id: "INV-9001", total: 125000, paid: 106500, balance: 18500, status: "Partially Paid", due: "2025-12-15" },
  ];

  const followUps = [
    { date: "2025-12-02", desc: "Call to confirm site readiness", member: "Ravi", status: "Completed" },
    { date: "2025-12-10", desc: "Send revised quotation", member: "Meena", status: "Pending" },
  ];

  const documents = [
    { name: "Signed NDA.pdf", type: "Contract", uploadedBy: "Vijay", date: "2025-10-05" },
    { name: "Site Plan.png", type: "Image", uploadedBy: "Ravi", date: "2025-11-20" },
  ];

  const activity = [
    { time: "2025-12-01 10:30", text: "Proposal P-101 sent to client", by: "Vijay" },
    { time: "2025-12-02 15:00", text: "Site visit scheduled", by: "Meena" },
  ];

  function renderOverview() {
    return (
      <div className="Client-Dashboard-page-overview">
        <div className="Client-Dashboard-page-kpis">
          {kpis.map((k) => (
            <div key={k.id} className={`Client-Dashboard-page-kpi-card Client-Dashboard-page-kpi-${k.className}`}>
              <div className="Client-Dashboard-page-kpi-title">{k.title}</div>
              <div className="Client-Dashboard-page-kpi-value">{k.value}</div>
            </div>
          ))}
        </div>

        <div className="Client-Dashboard-page-two-col">
          <div className="Client-Dashboard-page-card">
            <h3>Recent Leads</h3>
            <table className="Client-Dashboard-page-table">
              <thead>
                <tr>
                  <th>Lead ID</th>
                  <th>Date</th>
                  <th>Summary</th>
                  <th>Status</th>
                  <th>Assigned</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((l) => (
                  <tr key={l.id} onClick={() => setSelectedLead(l)} className="Client-Dashboard-page-row-clickable">
                    <td>{l.id}</td>
                    <td>{l.date}</td>
                    <td>{l.summary}</td>
                    <td>{l.status}</td>
                    <td>{l.assigned}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="Client-Dashboard-page-card">
            <h3>Quick Actions</h3>
            <div className="Client-Dashboard-page-actions">
              <button className="Client-Dashboard-page-btn primary">Add Follow-Up</button>
              <button className="Client-Dashboard-page-btn">Create Proposal</button>
              <button className="Client-Dashboard-page-btn">Create Quotation</button>
              <button className="Client-Dashboard-page-btn">Create Invoice</button>
            </div>

            <h3 style={{ marginTop: "1rem" }}>Documents</h3>
            <ul className="Client-Dashboard-page-doc-list">
              {documents.map((d, i) => (
                <li key={i}>
                  <span className="Client-Dashboard-page-doc-name">{d.name}</span>
                  <span className="Client-Dashboard-page-doc-meta">{d.type} • {d.uploadedBy} • {d.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="Client-Dashboard-page-card">
          <h3>Activity Timeline</h3>
          <ul className="Client-Dashboard-page-timeline">
            {activity.map((a, i) => (
              <li key={i}>
                <div className="Client-Dashboard-page-timeline-time">{a.time}</div>
                <div className="Client-Dashboard-page-timeline-text">{a.text} <span className="Client-Dashboard-page-muted">— {a.by}</span></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  function renderLeads() {
    return (
      <div className="Client-Dashboard-page-card">
        <h3>All Leads</h3>
        <table className="Client-Dashboard-page-table full">
          <thead>
            <tr>
              <th>Lead ID</th>
              <th>Date</th>
              <th>Requirement</th>
              <th>Status</th>
              <th>Assigned</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((l) => (
              <tr key={l.id}>
                <td>{l.id}</td>
                <td>{l.date}</td>
                <td>{l.summary}</td>
                <td>{l.status}</td>
                <td>{l.assigned}</td>
                <td>
                  <button className="Client-Dashboard-page-link" onClick={() => alert(`View lead ${l.id}`)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  function renderProposals() {
    return (
      <div className="Client-Dashboard-page-card">
        <h3>Proposals</h3>
        <table className="Client-Dashboard-page-table full">
          <thead>
            <tr>
              <th>Proposal ID</th>
              <th>Title</th>
              <th>Version</th>
              <th>Value (₹)</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {proposals.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.title}</td>
                <td>{p.version}</td>
                <td>{p.value.toLocaleString()}</td>
                <td>{p.status}</td>
                <td>{p.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  function renderQuotations() {
    return (
      <div className="Client-Dashboard-page-card">
        <h3>Quotations</h3>
        <table className="Client-Dashboard-page-table full">
          <thead>
            <tr>
              <th>Quotation ID</th>
              <th>Title</th>
              <th>Amount (₹)</th>
              <th>Validity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {quotations.map((q) => (
              <tr key={q.id}>
                <td>{q.id}</td>
                <td>{q.title}</td>
                <td>{q.amount.toLocaleString()}</td>
                <td>{q.validity}</td>
                <td>{q.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  function renderInvoices() {
    return (
      <div className="Client-Dashboard-page-card">
        <h3>Invoices</h3>
        <table className="Client-Dashboard-page-table full">
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Total (₹)</th>
              <th>Paid (₹)</th>
              <th>Balance (₹)</th>
              <th>Status</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id}>
                <td>{inv.id}</td>
                <td>{inv.total.toLocaleString()}</td>
                <td>{inv.paid.toLocaleString()}</td>
                <td>{inv.balance.toLocaleString()}</td>
                <td>{inv.status}</td>
                <td>{inv.due}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  function renderFollowUps() {
    return (
      <div className="Client-Dashboard-page-card">
        <h3>Follow-Ups</h3>
        <table className="Client-Dashboard-page-table full">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>BD Member</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {followUps.map((f, i) => (
              <tr key={i}>
                <td>{f.date}</td>
                <td>{f.desc}</td>
                <td>{f.member}</td>
                <td>{f.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="Client-Dashboard-page-root">
      <div className="Client-Dashboard-page-header">
        <div className="Client-Dashboard-page-avatar">{client.avatarUrl ? <img src={client.avatarUrl} alt="avatar" /> : client.name.charAt(0)}</div>
        <div className="Client-Dashboard-page-client-info">
          <h1 className="Client-Dashboard-page-client-name">{client.name}</h1>
          <div className="Client-Dashboard-page-client-meta">{client.company} • {client.type} • <span className="Client-Dashboard-page-status">{client.status}</span></div>
          <div className="Client-Dashboard-page-contact">{client.email} • {client.phone}</div>
        </div>
        <div className="Client-Dashboard-page-header-actions">
          <button className="Client-Dashboard-page-btn primary">Add Follow-Up</button>
          <button className="Client-Dashboard-page-btn">Export</button>
          <button className="Client-Dashboard-page-btn">Edit Client</button>
        </div>
      </div>

      <div className="Client-Dashboard-page-container">
        <aside className="Client-Dashboard-page-side">
          <div className="Client-Dashboard-page-side-kpis">
            {kpis.slice(0, 4).map((k) => (
              <div key={k.id} className="Client-Dashboard-page-side-kpi">
                <div className="Client-Dashboard-page-side-kpi-title">{k.title}</div>
                <div className="Client-Dashboard-page-side-kpi-value">{k.value}</div>
              </div>
            ))}
          </div>

          <nav className="Client-Dashboard-page-side-nav">
            <button className={`Client-Dashboard-page-side-nav-item ${activeTab === "overview" ? "active" : ""}`} onClick={() => setActiveTab("overview")}>Overview</button>
            <button className={`Client-Dashboard-page-side-nav-item ${activeTab === "leads" ? "active" : ""}`} onClick={() => setActiveTab("leads")}>Leads / Enquiries</button>
            <button className={`Client-Dashboard-page-side-nav-item ${activeTab === "proposals" ? "active" : ""}`} onClick={() => setActiveTab("proposals")}>Proposals</button>
            <button className={`Client-Dashboard-page-side-nav-item ${activeTab === "quotations" ? "active" : ""}`} onClick={() => setActiveTab("quotations")}>Quotations</button>
            <button className={`Client-Dashboard-page-side-nav-item ${activeTab === "invoices" ? "active" : ""}`} onClick={() => setActiveTab("invoices")}>Invoices</button>
            <button className={`Client-Dashboard-page-side-nav-item ${activeTab === "followups" ? "active" : ""}`} onClick={() => setActiveTab("followups")}>Follow-Ups</button>
            <button className={`Client-Dashboard-page-side-nav-item ${activeTab === "documents" ? "active" : ""}`} onClick={() => setActiveTab("documents")}>Documents</button>
            <button className={`Client-Dashboard-page-side-nav-item ${activeTab === "activity" ? "active" : ""}`} onClick={() => setActiveTab("activity")}>Activity</button>
          </nav>
        </aside>

        <main className="Client-Dashboard-page-main">
          {activeTab === "overview" && renderOverview()}
          {activeTab === "leads" && renderLeads()}
          {activeTab === "proposals" && renderProposals()}
          {activeTab === "quotations" && renderQuotations()}
          {activeTab === "invoices" && renderInvoices()}
          {activeTab === "followups" && renderFollowUps()}
          {activeTab === "documents" && (
            <div className="Client-Dashboard-page-card">
              <h3>Documents</h3>
              <table className="Client-Dashboard-page-table full">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Uploaded By</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((d, i) => (
                    <tr key={i}>
                      <td>{d.name}</td>
                      <td>{d.type}</td>
                      <td>{d.uploadedBy}</td>
                      <td>{d.date}</td>
                      <td><button className="Client-Dashboard-page-link">Download</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "activity" && (
            <div className="Client-Dashboard-page-card">
              <h3>Full Activity Log</h3>
              <ul className="Client-Dashboard-page-timeline full">
                {activity.map((a, i) => (
                  <li key={i}>
                    <div className="Client-Dashboard-page-timeline-time">{a.time}</div>
                    <div className="Client-Dashboard-page-timeline-text">{a.text} <span className="Client-Dashboard-page-muted">— {a.by}</span></div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </main>
      </div>

      {/* Simple selected lead drawer */}
      {selectedLead && (
        <div className="Client-Dashboard-page-drawer" onClick={() => setSelectedLead(null)}>
          <div className="Client-Dashboard-page-drawer-content" onClick={(e) => e.stopPropagation()}>
            <h3>Lead: {selectedLead.id}</h3>
            <p><strong>Date:</strong> {selectedLead.date}</p>
            <p><strong>Summary:</strong> {selectedLead.summary}</p>
            <p><strong>Status:</strong> {selectedLead.status}</p>
            <p><strong>Assigned:</strong> {selectedLead.assigned}</p>
            <div style={{ marginTop: "1rem" }}>
              <button className="Client-Dashboard-page-btn primary" onClick={() => alert("Convert to proposal")}>Convert to Proposal</button>
              <button className="Client-Dashboard-page-btn" onClick={() => setSelectedLead(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}