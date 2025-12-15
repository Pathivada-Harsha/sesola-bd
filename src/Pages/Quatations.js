// QuotationsPage.jsx
import React, { useState, useMemo, useEffect } from "react";
import "../pages-css/Quatations.css";
import GroupProjectFilter from "./../components/Dropdowns/GroupProjectFilter.js";
import useGroupProjectFilters from "./../components/Dropdowns/useGroupProjectFilters.js";
// If you have Navbar / Sidebar components in your project, uncomment and adjust paths:
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";

export default function QuotationsPage() {
  const { groupName, projectId, updateFilters } = useGroupProjectFilters();

  const sample = [
    {
      id: "Q-2025-001",
      clientName: "Acuity Solutions",
      company: "Acuity Pvt Ltd",
      proposalRef: "P-102",
      title: "Website Redesign",
      amount: 125000,
      validityDate: "2026-01-15",
      status: "Draft",
      preparedBy: "Ankur",
      updatedAt: "2025-11-29T10:15:00Z",
    },
    {
      id: "Q-2025-002",
      clientName: "Blue Leaf",
      company: "Blue Leaf Inc.",
      proposalRef: null,
      title: "Digital Marketing Retainer",
      amount: 85000,
      validityDate: "2025-12-30",
      status: "Sent",
      preparedBy: "Vijay",
      updatedAt: "2025-12-01T08:30:00Z",
    },
  ];

  const [quotations, setQuotations] = useState(sample);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    preparedBy: "",
    validity: "",
    dateFrom: "",
    dateTo: "",
  });
  const [selected, setSelected] = useState([]);
  const [sortBy, setSortBy] = useState({ key: "updatedAt", dir: "desc" });
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  const [viewing, setViewing] = useState(null);
  const [showBuilder, setShowBuilder] = useState(false);
  const [editing, setEditing] = useState(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let arr = quotations.filter((r) => {
      if (!q) return true;
      const combined = [r.id, r.clientName, r.company, r.proposalRef || "", r.title, String(r.amount), r.preparedBy]
        .join(" ")
        .toLowerCase();
      return combined.includes(q);
    });

    if (filters.status) arr = arr.filter((r) => r.status === filters.status);
    if (filters.preparedBy) arr = arr.filter((r) => r.preparedBy === filters.preparedBy);

    if (filters.validity) {
      const now = new Date();
      if (filters.validity === "Active") arr = arr.filter((r) => new Date(r.validityDate) > now);
      if (filters.validity === "Expired Soon") {
        const soon = new Date(); soon.setDate(soon.getDate() + 7);
        arr = arr.filter((r) => new Date(r.validityDate) <= soon && new Date(r.validityDate) >= now);
      }
      if (filters.validity === "Expired") arr = arr.filter((r) => new Date(r.validityDate) < new Date());
    }

    if (filters.dateFrom) arr = arr.filter((r) => new Date(r.updatedAt) >= new Date(filters.dateFrom));
    if (filters.dateTo) arr = arr.filter((r) => new Date(r.updatedAt) <= new Date(filters.dateTo));

    const sorted = arr.sort((a, b) => {
      const key = sortBy.key;
      let va = a[key];
      let vb = b[key];
      if (key === "amount") { va = Number(va); vb = Number(vb); }
      if (key === "updatedAt" || key === "validityDate") { va = new Date(va); vb = new Date(vb); }
      if (va < vb) return sortBy.dir === "asc" ? -1 : 1;
      if (va > vb) return sortBy.dir === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [quotations, search, filters, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => { if (page > totalPages) setPage(totalPages); }, [totalPages]);

  const toggleSelect = (id) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const toggleSort = (key) => setSortBy((s) => (s.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" }));

  const openView = (q) => setViewing(q);
  const closeModal = () => { setViewing(null); setShowBuilder(false); setEditing(null); };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this quotation?")) return;
    setQuotations((q) => q.filter((x) => x.id !== id));
  };

  const handleDuplicate = (id) => {
    const orig = quotations.find((x) => x.id === id); if (!orig) return;
    const copy = { ...orig, id: orig.id + "-COPY", updatedAt: new Date().toISOString(), status: "Draft" };
    setQuotations((q) => [copy, ...q]);
  };

  const handleCreate = () => { setEditing(null); setShowBuilder(true); };

  const exportPDF = () => alert("Export PDF (stub)");
  const exportExcel = () => alert("Export Excel (stub)");
  const duplicateSelected = () => { selected.forEach(handleDuplicate); setSelected([]); };

  return (
    <div className="quatations-page-root">
      {/* Uncomment these if you use global Navbar/Sidebar */}
      {/* <Navbar /> */}
      <div className="quatations-page-layout">
        {/* <Sidebar /> */}

        <main className="quatations-page-main">
          <div className="quatations-page-header">
            <nav className="quatations-page-breadcrumb">Dashboard &gt; Quotations</nav>
          </div>
          <div className="page-header-with-filter">
            <h1 className="quatations-page-title">Quotations</h1>

            <GroupProjectFilter
              groupValue={groupName}
              projectValue={projectId}
              onChange={updateFilters}
            />
          </div>

          <section className="quatations-page-actions card">
            <div className="quatations-page-actions-left">
              <div className="quatations-page-search">
                <input
                  className="quatations-page-search-input"
                  placeholder="Search by Quotation ID, Client, Company, Email, Proposal Ref, Amount..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="quatations-page-filters">
                <select className="quatations-page-filter" value={filters.status} onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}>
                  <option value="">All Statuses</option>
                  <option>Draft</option><option>Sent</option><option>Approved</option><option>Rejected</option><option>Revised</option><option>Cancelled</option>
                </select>

                <select className="quatations-page-filter" value={filters.preparedBy} onChange={(e) => setFilters((f) => ({ ...f, preparedBy: e.target.value }))}>
                  <option value="">Prepared By</option><option>Ankur</option><option>Vijay</option><option>Ravi</option>
                </select>

                <select className="quatations-page-filter" value={filters.validity} onChange={(e) => setFilters((f) => ({ ...f, validity: e.target.value }))}>
                  <option value="">Validity</option><option>Active</option><option>Expired Soon</option><option>Expired</option>
                </select>

                <div className="quatations-page-date-range">
                  <input type="date" value={filters.dateFrom} onChange={(e) => setFilters((f) => ({ ...f, dateFrom: e.target.value }))} />
                  <input type="date" value={filters.dateTo} onChange={(e) => setFilters((f) => ({ ...f, dateTo: e.target.value }))} />
                </div>
              </div>
            </div>

            <div className="quatations-page-actions-right">
              <button className="quatations-page-btn primary" onClick={handleCreate}>+ Create New Quotation</button>
              <div className="quatations-page-quick-actions">
                <button className="quatations-page-btn" onClick={exportPDF}>Export PDF</button>
                <button className="quatations-page-btn" onClick={exportExcel}>Export Excel</button>
                <button className="quatations-page-btn" onClick={duplicateSelected}>Duplicate Selected</button>
              </div>
            </div>
          </section>

          <section className="quatations-page-table card">
            <div className="quatations-page-table-controls">
              <div>
                <label>Show</label>
                <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
                  <option value={10}>10</option><option value={25}>25</option><option value={50}>50</option>
                </select>
                <span>rows</span>
              </div>

              <div>
                <button className="quatations-page-btn" disabled={selected.length === 0} onClick={() => alert(`Batch action on: ${selected.join(",")}`)}>
                  Batch Actions ({selected.length})
                </button>
              </div>
            </div>

            <div className="quatations-page-table-wrapper">
              <table className="quatations-page-data-table">
                <thead className="quatations-page-sticky-head">
                  <tr>
                    <th className="quatations-page-col-check"><input type="checkbox" checked={selected.length === quotations.length && quotations.length > 0} onChange={(e) => setSelected(e.target.checked ? quotations.map(q => q.id) : [])} /></th>
                    <th onClick={() => toggleSort("id")}>Quotation ID <span className="quatations-page-sort-indicator">{sortBy.key === "id" ? (sortBy.dir === "asc" ? "▲" : "▼") : ""}</span></th>
                    <th onClick={() => toggleSort("clientName")}>Client Name</th>
                    <th>Proposal Ref</th>
                    <th>Quotation Title</th>
                    <th onClick={() => toggleSort("amount")}>Amount (₹)</th>
                    <th onClick={() => toggleSort("validityDate")}>Validity Date</th>
                    <th>Status</th>
                    <th>Prepared By</th>
                    <th onClick={() => toggleSort("updatedAt")}>Last Updated</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {paginated.map(row => (
                    <tr key={row.id} className="quatations-page-row">
                      <td><input type="checkbox" checked={selected.includes(row.id)} onChange={() => toggleSelect(row.id)} /></td>
                      <td>{row.id}</td>
                      <td>
                        <div className="quatations-page-client">
                          <div className="quatations-page-client-name">{row.clientName}</div>
                          <div className="quatations-page-client-company">{row.company}</div>
                        </div>
                      </td>
                      <td>{row.proposalRef || "—"}</td>
                      <td>{row.title}</td>
                      <td>₹ {row.amount.toLocaleString("en-IN")}</td>
                      <td>{new Date(row.validityDate).toLocaleDateString()}</td>
                      <td><span className={`quatations-page-badge quatations-page-badge-${row.status.toLowerCase()}`}>{row.status}</span></td>
                      <td>{row.preparedBy}</td>
                      <td>{new Date(row.updatedAt).toLocaleString()}</td>
                      <td className="quatations-page-actions-td">
                        <button className="quatations-page-icon-btn" onClick={() => openView(row)}>View</button>
                        <button className="quatations-page-icon-btn" onClick={() => { setEditing(row); setShowBuilder(true); }}>Edit</button>
                        <button className="quatations-page-icon-btn" onClick={() => alert("Download PDF (stub)")}>PDF</button>
                        <button className="quatations-page-icon-btn" onClick={() => alert("Send (stub)")}>Send</button>
                        <button className="quatations-page-icon-btn" onClick={() => handleDuplicate(row.id)}>Duplicate</button>
                        <button className="quatations-page-icon-btn danger" onClick={() => handleDelete(row.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}

                  {paginated.length === 0 && (
                    <tr><td colSpan={11} className="quatations-page-empty">No quotations found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="quatations-page-pagination">
              <div>Showing {Math.min((page - 1) * pageSize + 1, filtered.length)} - {Math.min(page * pageSize, filtered.length)} of {filtered.length}</div>
              <div className="quatations-page-pagination-controls">
                <button onClick={() => setPage(1)} disabled={page === 1}>{"<<"}</button>
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>{"<"}</button>
                <span>Page</span>
                <input type="number" value={page} onChange={(e) => setPage(Math.max(1, Math.min(totalPages, Number(e.target.value || 1))))} />
                <span>of {totalPages}</span>
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>{">"}</button>
                <button onClick={() => setPage(totalPages)} disabled={page === totalPages}>{">>"}</button>
              </div>
            </div>
          </section>

          {/* View Modal */}
          {viewing && (
            <div className="quatations-page-modal-overlay" onClick={closeModal}>
              <div className="quatations-page-modal" onClick={(e) => e.stopPropagation()}>
                <header className="quatations-page-modal-header">
                  <div>
                    <h2>{viewing.id} — {viewing.title}</h2>
                    <div className="quatations-page-meta">Prepared by {viewing.preparedBy} • Updated {new Date(viewing.updatedAt).toLocaleString()}</div>
                  </div>
                  <div><span className={`quatations-page-badge quatations-page-badge-${viewing.status.toLowerCase()}`}>{viewing.status}</span></div>
                </header>

                <div className="quatations-page-modal-body">
                  <section className="quatations-page-modal-section">
                    <h3>Client Details</h3>
                    <div className="quatations-page-grid">
                      <div><strong>Name</strong><div>{viewing.clientName}</div></div>
                      <div><strong>Company</strong><div>{viewing.company}</div></div>
                      <div><strong>Email</strong><div>client@example.com</div></div>
                      <div><strong>Phone</strong><div>+91 90000 00000</div></div>
                      <div className="quatations-page-full"><strong>Address</strong><div>1 Example Street, City</div></div>
                    </div>
                  </section>

                  <section className="quatations-page-modal-section">
                    <h3>Quotation Items</h3>
                    <table className="quatations-page-items-table">
                      <thead><tr><th>Item</th><th>Qty</th><th>Unit</th><th>Tax %</th><th>Total</th></tr></thead>
                      <tbody>
                        <tr><td>Sample item A — Design</td><td>1</td><td>₹100,000</td><td>18%</td><td>₹118,000</td></tr>
                        <tr><td>Sample item B — Dev</td><td>1</td><td>₹25,000</td><td>18%</td><td>₹29,500</td></tr>
                      </tbody>
                      <tfoot>
                        <tr><td colSpan={4}>Subtotal</td><td>₹125,000</td></tr>
                        <tr><td colSpan={4}>Taxes</td><td>₹22,500</td></tr>
                        <tr><td colSpan={4}>Discount</td><td>₹0</td></tr>
                        <tr className="quatations-page-grand"><td colSpan={4}>Grand Total</td><td>₹147,500</td></tr>
                      </tfoot>
                    </table>
                  </section>

                  <section className="quatations-page-modal-section">
                    <h3>Terms & Conditions</h3>
                    <div className="quatations-page-terms">
                      <p><strong>Payment:</strong> 50% advance, balance on delivery.</p>
                      <p><strong>Delivery:</strong> As per signed SOW.</p>
                      <p><strong>Validity:</strong> Valid until {new Date(viewing.validityDate).toLocaleDateString()}.</p>
                    </div>
                  </section>

                  <section className="quatations-page-modal-section">
                    <h3>Attachments</h3>
                    <ul><li>proposal.pdf</li><li>scope.docx</li></ul>
                  </section>
                </div>

                <footer className="quatations-page-modal-footer">
                  <div className="quatations-page-modal-actions">
                    <button className="quatations-page-btn" onClick={() => { setEditing(viewing); setShowBuilder(true); }}>Edit</button>
                    <button className="quatations-page-btn" onClick={() => alert("Download PDF (stub)")}>Download PDF</button>
                    <button className="quatations-page-btn" onClick={() => alert("Send (stub)")}>Send to Client</button>
                    <button className="quatations-page-btn" onClick={() => alert("Revise (stub)")}>Revise</button>
                    <button className="quatations-page-btn" onClick={closeModal}>Close</button>
                  </div>
                </footer>
              </div>
            </div>
          )}

          {/* Create/Edit Builder */}
          {showBuilder && (
            <div className="quatations-page-modal-overlay" onClick={closeModal}>
              <div className="quatations-page-builder" onClick={(e) => e.stopPropagation()}>
                <header className="quatations-page-builder-header">
                  <h2>{editing ? `Edit ${editing.id}` : "Create New Quotation"}</h2>
                </header>

                <div className="quatations-page-builder-body">
                  <div className="quatations-page-form-col">
                    <label>Quotation Title</label>
                    <input placeholder="Quotation title" />

                    <label>Reference Proposal (optional)</label>
                    <select><option value="">None</option><option>P-102</option></select>

                    <label>Validity Date</label>
                    <input type="date" />

                    <label>Notes / Description</label>
                    <textarea rows={3}></textarea>

                    <h4>Client</h4>
                    <select><option value="">Select existing client</option><option>Acuity Solutions</option></select>
                    <button className="quatations-page-btn">+ Create New Client</button>
                  </div>

                  <div className="quatations-page-form-col">
                    <h4>Items</h4>
                    <table className="quatations-page-items-table">
                      <thead><tr><th>Item</th><th>Qty</th><th>Unit Price</th><th>Tax %</th><th>Total</th></tr></thead>
                      <tbody>
                        <tr>
                          <td><input placeholder="Item name" /></td>
                          <td><input type="number" defaultValue={1} /></td>
                          <td><input defaultValue={10000} /></td>
                          <td><input defaultValue={18} /></td>
                          <td>₹ 11,800</td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="quatations-page-form-summary">
                      <div>Subtotal: ₹ 100,000</div>
                      <div>Tax: ₹ 18,000</div>
                      <div>Discount: ₹ 0</div>
                      <div className="quatations-page-grand">Grand Total: ₹ 118,000</div>
                    </div>

                    <div className="quatations-page-builder-actions">
                      <button className="quatations-page-btn" onClick={() => alert("Saved as Draft (stub)")}>Save as Draft</button>
                      <button className="quatations-page-btn" onClick={() => alert("Preview (stub)")}>Preview</button>
                      <button className="quatations-page-btn primary" onClick={() => alert("Generate PDF (stub)")}>Generate PDF</button>
                      <button className="quatations-page-btn" onClick={() => alert("Send to Client (stub)")}>Send to Client</button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
