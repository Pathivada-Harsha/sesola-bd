import React, { useState, useMemo, useEffect } from "react";
import "../pages-css/Documents.css";

// DocumentsPage - redesigned with better alignment & unique prefixed classes
export default function DocumentsPage() {
  const sampleCategories = [
    { id: 'proposals', name: 'Proposals', color: '#0b63d6' },
    { id: 'quotations', name: 'Quotations', color: '#059669' },
    { id: 'invoices', name: 'Invoices', color: '#b45309' },
    { id: 'contracts', name: 'Contracts', color: '#7c3aed' },
    { id: 'design', name: 'Design Files', color: '#0ea5a4' },
    { id: 'vendor', name: 'Vendor Docs', color: '#ef4444' },
    { id: 'others', name: 'Others', color: '#6b7280' },
  ];

  const sampleDocs = [
    { id: 'D-001', name: 'Proposal_Website_Redesign.pdf', type: 'pdf', category: 'proposals', size: 245000, uploadedBy: 'Ankur', uploadedOn: '2025-12-01T10:00:00Z', tags: ['website','client-a'] },
    { id: 'D-002', name: 'Quotation_Q-2025-002.xlsx', type: 'xlsx', category: 'quotations', size: 12000, uploadedBy: 'Vijay', uploadedOn: '2025-12-03T09:30:00Z', tags: ['quote'] },
    { id: 'D-003', name: 'Logo_Concept.png', type: 'png', category: 'design', size: 560000, uploadedBy: 'Ravi', uploadedOn: '2025-11-28T14:20:00Z', tags: ['logo','concept'] },
    { id: 'D-004', name: 'Service_Agreement.docx', type: 'docx', category: 'contracts', size: 78000, uploadedBy: 'Ankur', uploadedOn: '2025-11-20T12:00:00Z', tags: ['contract'] },
  ];

  const [categories, setCategories] = useState(sampleCategories);
  const [documents, setDocuments] = useState(sampleDocs);

  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ category: '', type: '', uploadedBy: '', size: '' , dateFrom: '', dateTo: '' });

  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  const summary = useMemo(() => {
    const total = documents.length;
    const storage = documents.reduce((s,d) => s + d.size, 0);
    const freqType = documents.reduce((acc,d) => (acc[d.type] = (acc[d.type]||0)+1, acc), {});
    const mostType = Object.keys(freqType).sort((a,b)=>freqType[b]-freqType[a])[0] || '-';
    const uploadsThisMonth = documents.filter(d => { const dt = new Date(d.uploadedOn); const now = new Date(); return dt.getMonth() === now.getMonth() && dt.getFullYear() === now.getFullYear(); }).length;
    const activeUser = documents.reduce((acc,d)=> (acc[d.uploadedBy] = (acc[d.uploadedBy]||0)+1, acc), {});
    const mostUser = Object.keys(activeUser).sort((a,b)=>activeUser[b]-activeUser[a])[0] || '-';
    return { total, storage, mostType, uploadsThisMonth, mostUser };
  }, [documents]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let arr = documents.filter(d => {
      if (!q) return true;
      const combined = [d.name, (d.tags || []).join(' '), d.uploadedBy, d.type].join(' ').toLowerCase();
      return combined.includes(q);
    });

    if (filters.category) arr = arr.filter(d => d.category === filters.category);
    if (filters.type) arr = arr.filter(d => d.type === filters.type);
    if (filters.uploadedBy) arr = arr.filter(d => d.uploadedBy === filters.uploadedBy);
    if (filters.size) {
      if (filters.size === 'Small') arr = arr.filter(d => d.size < 50_000);
      if (filters.size === 'Medium') arr = arr.filter(d => d.size >= 50_000 && d.size < 500_000);
      if (filters.size === 'Large') arr = arr.filter(d => d.size >= 500_000);
    }
    if (filters.dateFrom) arr = arr.filter(d => new Date(d.uploadedOn) >= new Date(filters.dateFrom));
    if (filters.dateTo) arr = arr.filter(d => new Date(d.uploadedOn) <= new Date(filters.dateTo));

    return arr;
  }, [documents, search, filters]);

  useEffect(() => { if (selectedIds.length === 0) return; }, [selectedIds]);

  function openDoc(doc) { setSelectedDoc(doc); }
  function closeDoc() { setSelectedDoc(null); }

  function handleDelete(id) {
    if (!window.confirm('Delete this file?')) return;
    setDocuments(docs => docs.filter(d => d.id !== id));
  }

  function handleDownload(doc) { alert('Download stub: ' + doc.name); }
  function handleRename(doc) {
    const name = window.prompt('Rename file', doc.name);
    if (!name) return;
    setDocuments(docs => docs.map(d => d.id === doc.id ? { ...d, name } : d));
  }

  function handleUpload(formData) {
    const newDoc = {
      id: 'D-' + String(Math.floor(Math.random()*10000)).padStart(3,'0'),
      name: formData.name || formData.file.name,
      type: formData.file.name.split('.').pop().toLowerCase(),
      category: formData.category || 'others',
      size: formData.file.size || 0,
      uploadedBy: 'You',
      uploadedOn: new Date().toISOString(),
      tags: formData.tags || [],
    };
    setDocuments(d => [newDoc, ...d]);
    setShowUpload(false);
  }

  function handleCreateCategory(cat) {
    setCategories(c => [...c, cat]);
  }

  function toggleSelect(id) { setSelectedIds(s => s.includes(id) ? s.filter(x=>x!==id) : [...s,id]); }
  function bulkDelete() { if (!window.confirm('Delete selected files?')) return; setDocuments(d => d.filter(doc => !selectedIds.includes(doc.id))); setSelectedIds([]); }
  function bulkDownload() { alert('Bulk download stub: ' + selectedIds.join(',')); }

  function fmtSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024*1024) return (bytes/1024).toFixed(1) + ' KB';
    return (bytes/(1024*1024)).toFixed(2) + ' MB';
  }

  return (
    <div className="documents-page-root">
      <div className="documents-page-layout">
        <main className="documents-page-main">
          <header className="documents-page-header">
            <h1>Document Repository</h1>
            <div className="documents-page-breadcrumb">Dashboard &gt; Documents</div>
          </header>

          {/* Top Action Bar */}
          <section className="documents-page-actions documents-page-card">
            <div className="documents-page-actions-left">
              <input
                className="documents-page-search"
                placeholder="Search by file name, tags, uploaded by, type..."
                value={search}
                onChange={e=>setSearch(e.target.value)}
              />

              <div className="documents-page-filters">
                <select value={filters.category} onChange={e=>setFilters(f=>({...f, category: e.target.value}))} className="documents-page-filter">
                  <option value="">All Categories</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>

                <select value={filters.type} onChange={e=>setFilters(f=>({...f, type: e.target.value}))} className="documents-page-filter">
                  <option value="">All Types</option>
                  <option value="pdf">PDF</option>
                  <option value="docx">DOCX</option>
                  <option value="xlsx">XLSX</option>
                  <option value="png">PNG</option>
                </select>

                <select value={filters.size} onChange={e=>setFilters(f=>({...f, size: e.target.value}))} className="documents-page-filter">
                  <option value="">Size</option>
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                </select>

                <input type="date" value={filters.dateFrom} onChange={e=>setFilters(f=>({...f, dateFrom: e.target.value}))} className="documents-page-filter-date" />
                <input type="date" value={filters.dateTo} onChange={e=>setFilters(f=>({...f, dateTo: e.target.value}))} className="documents-page-filter-date" />
              </div>
            </div>

            <div className="documents-page-actions-right">
              <button className="documents-page-action-btn documents-page-action-primary" onClick={()=>setShowUpload(true)}>New Document</button>
              <button className="documents-page-action-btn" onClick={()=>setShowCategoryManager(true)}>Manage Categories</button>
              <button className="documents-page-action-btn" disabled={selectedIds.length===0} onClick={bulkDownload}>Bulk Download</button>
              <button className="documents-page-action-btn documents-page-action-danger" disabled={selectedIds.length===0} onClick={bulkDelete}>Bulk Delete</button>
            </div>
          </section>

          {/* Summary Cards */}
          <section className="documents-page-summary">
            <div className="documents-page-stat-card documents-page-card">
              <div className="documents-page-card-title">Total Documents</div>
              <div className="documents-page-card-value">{summary.total}</div>
            </div>
            <div className="documents-page-stat-card documents-page-card">
              <div className="documents-page-card-title">Storage Used</div>
              <div className="documents-page-card-value">{fmtSize(summary.storage)}</div>
            </div>
            <div className="documents-page-stat-card documents-page-card">
              <div className="documents-page-card-title">Most Frequent File Type</div>
              <div className="documents-page-card-value">{summary.mostType}</div>
            </div>
            <div className="documents-page-stat-card documents-page-card">
              <div className="documents-page-card-title">Most Active Upload User</div>
              <div className="documents-page-card-value">{summary.mostUser}</div>
            </div>
            <div className="documents-page-stat-card documents-page-card">
              <div className="documents-page-card-title">Documents Added This Month</div>
              <div className="documents-page-card-value">{summary.uploadsThisMonth}</div>
            </div>
          </section>

          {/* View Toggle */}
          <section className="documents-page-view-toggle">
            <div className="documents-page-toggle-left">
              <button className={`documents-page-toggle ${viewMode==='grid' ? 'active' : ''}`} onClick={()=>setViewMode('grid')}>Grid View</button>
              <button className={`documents-page-toggle ${viewMode==='list' ? 'active' : ''}`} onClick={()=>setViewMode('list')}>List View</button>
            </div>
            <div className="documents-page-toggle-right">
              <div>{filtered.length} items</div>
            </div>
          </section>

          {/* Grid / List */}
          <section className="documents-page-content">
            {viewMode === 'grid' ? (
              <div className="documents-page-grid">
                {filtered.map(doc => (
                  <div key={doc.id} className="documents-page-file-card">
                    <input type="checkbox" className="documents-page-select" checked={selectedIds.includes(doc.id)} onChange={()=>toggleSelect(doc.id)} />

                    <div className="documents-page-file-top">
                      <div className="documents-page-file-icon">{doc.type.toUpperCase()}</div>

                      <div className="documents-page-file-info">
                        <div className="documents-page-file-name" title={doc.name}>{doc.name}</div>
                        <div className="documents-page-file-sub">{doc.uploadedBy} • {new Date(doc.uploadedOn).toLocaleDateString()}</div>
                      </div>
                    </div>

                    <div className="documents-page-file-meta-row">
                      <span className="documents-page-file-category" style={{background: (categories.find(c=>c.id===doc.category)||{}).color}}>
                        {(categories.find(c=>c.id===doc.category)||{name:'Others'}).name}
                      </span>
                      <div className="documents-page-file-size">{fmtSize(doc.size)}</div>
                    </div>

                    <div className="documents-page-file-actions">
                      <div className="documents-page-action-group">
                        <button className="documents-page-action-btn" onClick={()=>openDoc(doc)} aria-label="View document">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path stroke="currentColor" strokeWidth="1.5" d="M3 12s4-7 9-7 9 7 9 7-4 7-9 7-9-7-9-7z"/></svg>
                          View
                        </button>
                        <button className="documents-page-action-btn" onClick={()=>handleDownload(doc)}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path stroke="currentColor" strokeWidth="1.5" d="M12 3v12m0 0l4-4m-4 4-4-4M21 21H3"/></svg>
                          Download
                        </button>
                      </div>

                      <div className="documents-page-action-group documents-page-action-group-right">
                        <button className="documents-page-action-btn" onClick={()=>handleRename(doc)}>Rename</button>
                        <button className="documents-page-action-btn documents-page-action-danger" onClick={()=>handleDelete(doc.id)}>Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <table className="documents-page-table">
                <thead>
                  <tr>
                    <th style={{width:36}}></th>
                    <th>File Name</th>
                    <th>Type</th>
                    <th>Category</th>
                    <th>Size</th>
                    <th>Uploaded By</th>
                    <th>Date Uploaded</th>
                    <th style={{width:220}}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(doc => (
                    <tr key={doc.id} className="documents-page-list-row">
                      <td><input type="checkbox" checked={selectedIds.includes(doc.id)} onChange={()=>toggleSelect(doc.id)} /></td>
                      <td>{doc.name}</td>
                      <td>{doc.type.toUpperCase()}</td>
                      <td>{(categories.find(c=>c.id===doc.category)||{name:'Others'}).name}</td>
                      <td>{fmtSize(doc.size)}</td>
                      <td>{doc.uploadedBy}</td>
                      <td>{new Date(doc.uploadedOn).toLocaleDateString()}</td>
                      <td>
                        <div className="documents-page-action-group">
                          <button className="documents-page-action-btn" onClick={()=>openDoc(doc)}>View</button>
                          <button className="documents-page-action-btn" onClick={()=>handleDownload(doc)}>Download</button>
                          <button className="documents-page-action-btn" onClick={()=>handleRename(doc)}>Rename</button>
                          <button className="documents-page-action-btn documents-page-action-danger" onClick={()=>handleDelete(doc.id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>

          {/* Preview Modal */}
          {selectedDoc && (
            <div className="documents-page-modal-overlay" onClick={()=>setSelectedDoc(null)}>
              <div className="documents-page-modal" onClick={e=>e.stopPropagation()}>
                <header className="documents-page-modal-header">
                  <div>
                    <h3 className="documents-page-modal-title">{selectedDoc.name}</h3>
                    <div className="documents-page-meta">{(categories.find(c=>c.id===selectedDoc.category)||{name:'Others'}).name} • {selectedDoc.uploadedBy} • {fmtSize(selectedDoc.size)}</div>
                  </div>
                  <div className="documents-page-modal-header-actions">
                    <button className="documents-page-action-btn" onClick={()=>handleDownload(selectedDoc)}>Download</button>
                    <button className="documents-page-action-btn" onClick={()=>handleRename(selectedDoc)}>Rename</button>
                    <button className="documents-page-action-btn documents-page-action-danger" onClick={()=>handleDelete(selectedDoc.id)}>Delete</button>
                    <button className="documents-page-action-btn" onClick={()=>setSelectedDoc(null)}>Close</button>
                  </div>
                </header>

                <div className="documents-page-modal-body">
                  <div className="documents-page-preview-area">
                    {selectedDoc.type === 'pdf' && <div className="documents-page-pdf-placeholder">[PDF Preview Placeholder]</div>}
                    {selectedDoc.type === 'png' && <div className="documents-page-image-placeholder">[Image Preview Placeholder]</div>}
                    {['docx','xlsx'].includes(selectedDoc.type) && <div className="documents-page-filetype-placeholder">[{selectedDoc.type.toUpperCase()} preview not available]</div>}
                  </div>

                  <aside className="documents-page-meta-panel">
                    <div><strong>Name</strong><div>{selectedDoc.name}</div></div>
                    <div><strong>Size</strong><div>{fmtSize(selectedDoc.size)}</div></div>
                    <div><strong>Tags</strong><div>{(selectedDoc.tags||[]).join(', ') || '—'}</div></div>
                    <div><strong>Uploaded On</strong><div>{new Date(selectedDoc.uploadedOn).toLocaleString()}</div></div>
                    <div><strong>Uploaded By</strong><div>{selectedDoc.uploadedBy}</div></div>
                    <div className="documents-page-meta-actions">
                      <button className="documents-page-action-btn" onClick={()=>alert('Move to category (stub)')}>Move</button>
                      <button className="documents-page-action-btn" onClick={()=>alert('Add tags (stub)')}>Add Tags</button>
                    </div>
                  </aside>
                </div>
              </div>
            </div>
          )}

          {/* Upload Modal */}
          {showUpload && (
            <UploadModal onClose={()=>setShowUpload(false)} onUpload={handleUpload} categories={categories} />
          )}

          {/* Category Manager */}
          {showCategoryManager && (
            <CategoryManager onClose={()=>setShowCategoryManager(false)} onCreate={handleCreateCategory} categories={categories} setCategories={setCategories} />
          )}
        </main>
      </div>
    </div>
  );
}

// ---------------- UploadModal (unchanged behavior, class names updated) ----------------
function UploadModal({ onClose, onUpload, categories }){
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [notes, setNotes] = useState('');
  const [visibleTo, setVisibleTo] = useState('BD Only');

  function submit(e){
    e.preventDefault();
    if(!file) return alert('Choose a file');
    onUpload({ file, name: name || file.name, category, tags: tags.split(',').map(t=>t.trim()).filter(Boolean), notes, visibleTo });
  }

  return (
    <div className="documents-page-modal-overlay" onClick={onClose}>
      <div className="documents-page-modal upload-modal" onClick={e=>e.stopPropagation()}>
        <header className="documents-page-modal-header">
          <h3>Upload Document</h3>
          <div><button className="documents-page-action-btn" onClick={onClose}>Close</button></div>
        </header>
        <form className="documents-page-modal-body upload-modal-body" onSubmit={submit}>
          <div className="documents-page-upload-row">
            <label>Choose File</label>
            <input type="file" onChange={e=>setFile(e.target.files[0])} />
          </div>
          <div className="documents-page-upload-row">
            <label>File Name</label>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Optional - override file name" />
          </div>
          <div className="documents-page-upload-row">
            <label>Category</label>
            <select value={category} onChange={e=>setCategory(e.target.value)}>
              <option value="">Select category</option>
              {categories.map(c=> <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="documents-page-upload-row">
            <label>Tags (comma separated)</label>
            <input value={tags} onChange={e=>setTags(e.target.value)} />
          </div>
          <div className="documents-page-upload-row">
            <label>Notes</label>
            <textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={3}></textarea>
          </div>
          <div className="documents-page-upload-row">
            <label>Visible To</label>
            <select value={visibleTo} onChange={e=>setVisibleTo(e.target.value)}>
              <option>BD Only</option>
              <option>Procurement</option>
              <option>Management</option>
              <option>All Teams</option>
            </select>
          </div>

          <div className="documents-page-upload-actions">
            <button type="submit" className="documents-page-action-btn documents-page-action-primary">Upload</button>
            <button type="button" className="documents-page-action-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ---------------- CategoryManager ----------------
function CategoryManager({ onClose, onCreate, categories, setCategories }){
  const [name, setName] = useState('');
  const [color, setColor] = useState('#0b63d6');

  function add(e){ e.preventDefault(); if(!name) return; const id = name.toLowerCase().replace(/\s+/g,'-'); const cat = { id, name, color }; setCategories(c=>[...c,cat]); setName(''); setColor('#0b63d6'); }
  function remove(id){ if(!window.confirm('Delete category?')) return; setCategories(c=>c.filter(x=>x.id!==id)); }

  return (
    <div className="documents-page-modal-overlay" onClick={onClose}>
      <div className="documents-page-modal category-modal" onClick={e=>e.stopPropagation()}>
        <header className="documents-page-modal-header">
          <h3>Category Manager</h3>
          <div><button className="documents-page-action-btn" onClick={onClose}>Close</button></div>
        </header>

        <div className="documents-page-modal-body">
          <form onSubmit={add} className="documents-page-category-form">
            <input placeholder="Category name" value={name} onChange={e=>setName(e.target.value)} />
            <input type="color" value={color} onChange={e=>setColor(e.target.value)} />
            <button className="documents-page-action-btn">Create</button>
          </form>

          <div className="documents-page-category-list">
            {categories.map(c=> (
              <div key={c.id} className="documents-page-category-item">
                <div style={{display:'flex',alignItems:'center',gap:8}}>
                  <div className="documents-page-category-swatch" style={{background:c.color}}></div>
                  <div className="documents-page-category-name">{c.name}</div>
                </div>
                <div className="documents-page-category-actions">
                  <button className="documents-page-action-btn" onClick={()=>{ const newName = window.prompt('Rename category', c.name); if(newName) setCategories(prev=> prev.map(x=> x.id===c.id?{...x,name:newName}:x)); }}>Rename</button>
                  <button className="documents-page-action-btn documents-page-action-danger" onClick={()=>remove(c.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
