import React, { useState } from 'react';
import '../pages-css/Proposals.css';

import GroupProjectFilter from "./../components/Dropdowns/GroupProjectFilter.js";
import useGroupProjectFilters from "./../components/Dropdowns/useGroupProjectFilters.js";
// Mock data for proposals
const mockProposals = [
  {
    id: 'PROP-2024-001',
    clientName: 'Rajesh Kumar',
    companyName: 'Tech Innovations Pvt Ltd',
    title: 'Digital Transformation Strategy',
    value: 2500000,
    version: 'v3',
    status: 'Sent',
    preparedBy: 'Anita Sharma',
    lastUpdated: '2024-12-08',
    createdDate: '2024-11-15',
    email: 'rajesh@techinnovations.com',
    phone: '+91 98765 43210',
    address: 'Mumbai, Maharashtra',
    introduction: 'We are pleased to present our comprehensive digital transformation strategy...',
    scopeOfWork: 'Complete digital infrastructure overhaul, cloud migration, and process automation',
    deliverables: 'Cloud Architecture, Migration Plan, Training Materials, Support Documentation',
    pricingBreakdown: 'Infrastructure: ₹15,00,000\nConsulting: ₹8,00,000\nTraining: ₹2,00,000',
    terms: 'Payment in 3 installments. 30-day notice for cancellation.',
    notes: 'Client prefers phased implementation'
  },
  {
    id: 'PROP-2024-002',
    clientName: 'Priya Menon',
    companyName: 'Global Exports Inc',
    title: 'Supply Chain Optimization',
    value: 1800000,
    version: 'v2',
    status: 'Approved',
    preparedBy: 'Vikram Singh',
    lastUpdated: '2024-12-07',
    createdDate: '2024-11-20',
    email: 'priya@globalexports.com',
    phone: '+91 98234 56789',
    address: 'Chennai, Tamil Nadu',
    introduction: 'Our supply chain optimization solution will streamline your operations...',
    scopeOfWork: 'Process analysis, system integration, and performance monitoring',
    deliverables: 'Process Maps, Integration Documentation, Monitoring Dashboard',
    pricingBreakdown: 'Analysis: ₹5,00,000\nImplementation: ₹10,00,000\nSupport: ₹3,00,000',
    terms: '50% advance, balance on completion',
    notes: 'Urgent requirement - fast-track approval needed'
  },
  {
    id: 'PROP-2024-003',
    clientName: 'Amit Patel',
    companyName: 'Healthcare Solutions',
    title: 'Hospital Management System',
    value: 3200000,
    version: 'v1',
    status: 'Draft',
    preparedBy: 'Neha Gupta',
    lastUpdated: '2024-12-09',
    createdDate: '2024-12-05',
    email: 'amit@healthcaresol.com',
    phone: '+91 99887 65432',
    address: 'Bangalore, Karnataka',
    introduction: 'Comprehensive hospital management system to digitize all operations...',
    scopeOfWork: 'Custom software development, database design, and staff training',
    deliverables: 'HMS Software, Database Schema, User Manual, Training Program',
    pricingBreakdown: 'Development: ₹22,00,000\nTesting: ₹5,00,000\nTraining: ₹5,00,000',
    terms: 'Payment in 4 milestones',
    notes: 'Requires HIPAA compliance review'
  },
  {
    id: 'PROP-2024-004',
    clientName: 'Sunita Reddy',
    companyName: 'EduTech Solutions',
    title: 'E-Learning Platform Development',
    value: 1500000,
    version: 'v2',
    status: 'Sent',
    preparedBy: 'Vikram Singh',
    lastUpdated: '2024-12-06',
    createdDate: '2024-11-10',
    email: 'sunita@edutech.com',
    phone: '+91 97654 32109',
    address: 'Hyderabad, Telangana',
    introduction: 'Modern e-learning platform with interactive features and analytics...',
    scopeOfWork: 'Platform development, content management system, student portal',
    deliverables: 'Web Platform, Mobile Apps, Admin Dashboard, Analytics Module',
    pricingBreakdown: 'Development: ₹10,00,000\nDesign: ₹3,00,000\nDeployment: ₹2,00,000',
    terms: 'Payment in 3 phases based on milestones',
    notes: 'Client wants beta launch by January'
  },
  {
    id: 'PROP-2024-005',
    clientName: 'Karthik Iyer',
    companyName: 'Retail Mart Pvt Ltd',
    title: 'Point of Sale System Upgrade',
    value: 950000,
    version: 'v1',
    status: 'Rejected',
    preparedBy: 'Neha Gupta',
    lastUpdated: '2024-12-05',
    createdDate: '2024-11-28',
    email: 'karthik@retailmart.com',
    phone: '+91 96543 21098',
    address: 'Pune, Maharashtra',
    introduction: 'Upgrade existing POS systems with modern cloud-based solution...',
    scopeOfWork: 'POS software upgrade, hardware integration, staff training',
    deliverables: 'POS Software, Integration Guides, Training Sessions',
    pricingBreakdown: 'Software: ₹6,00,000\nHardware: ₹2,50,000\nTraining: ₹1,00,000',
    terms: '40% advance, 60% on completion',
    notes: 'Rejected due to budget constraints'
  },
  {
    id: 'PROP-2024-006',
    clientName: 'Deepa Krishnan',
    companyName: 'Finance Advisory Group',
    title: 'Financial Management Platform',
    value: 2800000,
    version: 'v1',
    status: 'On Hold',
    preparedBy: 'Anita Sharma',
    lastUpdated: '2024-12-04',
    createdDate: '2024-11-22',
    email: 'deepa@financeadvisory.com',
    phone: '+91 95432 10987',
    address: 'Delhi, NCR',
    introduction: 'Comprehensive financial management and advisory platform...',
    scopeOfWork: 'Custom platform development, API integrations, compliance features',
    deliverables: 'Web Platform, Mobile App, Compliance Module, Reporting Dashboard',
    pricingBreakdown: 'Development: ₹18,00,000\nCompliance: ₹6,00,000\nSupport: ₹4,00,000',
    terms: 'Payment in 5 installments',
    notes: 'On hold pending regulatory approval'
  }
];

const ProposalsManagementPage = () => {
  const [proposals, setProposals] = useState(mockProposals);
  const { groupName, projectId, updateFilters } = useGroupProjectFilters();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterPreparedBy, setFilterPreparedBy] = useState('All');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showVersionModal, setShowVersionModal] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    clientName: '',
    companyName: '',
    email: '',
    phone: '',
    address: '',
    introduction: '',
    scopeOfWork: '',
    deliverables: '',
    pricingBreakdown: '',
    terms: '',
    value: '',
    preparedBy: '',
    notes: ''
  });

  // Filter and search logic
  const filteredProposals = proposals.filter(proposal => {
    const matchesSearch =
      proposal.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposal.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposal.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposal.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposal.phone.includes(searchTerm) ||
      proposal.value.toString().includes(searchTerm);

    const matchesStatus = filterStatus === 'All' || proposal.status === filterStatus;
    const matchesPreparedBy = filterPreparedBy === 'All' || proposal.preparedBy === filterPreparedBy;

    return matchesSearch && matchesStatus && matchesPreparedBy;
  });

  // Sorting logic
  const sortedProposals = [...filteredProposals].sort((a, b) => {
    if (!sortConfig.key) return 0;

    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];

    if (sortConfig.key === 'value') {
      aValue = parseFloat(aValue);
      bValue = parseFloat(bValue);
    }

    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedProposals.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedProposals = sortedProposals.slice(startIndex, startIndex + rowsPerPage);

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const handleView = (proposal) => {
    setSelectedProposal(proposal);
    setShowViewModal(true);
  };

  const handleEdit = (proposal) => {
    setSelectedProposal(proposal);
    setFormData(proposal);
    setIsEditMode(true);
    setShowCreateModal(true);
    setShowViewModal(false);
  };

  const handleDuplicate = (proposal) => {
    const newProposal = {
      ...proposal,
      id: `PROP-2024-${String(proposals.length + 1).padStart(3, '0')}`,
      title: `${proposal.title} (Copy)`,
      version: 'v1',
      status: 'Draft',
      lastUpdated: new Date().toISOString().split('T')[0],
      createdDate: new Date().toISOString().split('T')[0]
    };
    setProposals([...proposals, newProposal]);
    alert('Proposal duplicated successfully!');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this proposal?')) {
      setProposals(proposals.filter(p => p.id !== id));
      alert('Proposal deleted successfully!');
    }
  };

  const handleCreateNew = () => {
    setIsEditMode(false);
    setFormData({
      title: '',
      clientName: '',
      companyName: '',
      email: '',
      phone: '',
      address: '',
      introduction: '',
      scopeOfWork: '',
      deliverables: '',
      pricingBreakdown: '',
      terms: '',
      value: '',
      preparedBy: '',
      notes: ''
    });
    setShowCreateModal(true);
  };

  const handleSubmitProposal = (status = 'Draft') => {
    // Validation
    if (!formData.title || !formData.clientName || !formData.companyName || !formData.email || !formData.value) {
      alert('Please fill in all required fields (Title, Client Name, Company Name, Email, Value)');
      return;
    }

    const newProposal = {
      ...formData,
      id: isEditMode ? selectedProposal.id : `PROP-2024-${String(proposals.length + 1).padStart(3, '0')}`,
      version: isEditMode ? selectedProposal.version : 'v1',
      status: status,
      lastUpdated: new Date().toISOString().split('T')[0],
      createdDate: isEditMode ? selectedProposal.createdDate : new Date().toISOString().split('T')[0],
      value: parseFloat(formData.value) || 0
    };

    if (isEditMode) {
      setProposals(proposals.map(p => p.id === selectedProposal.id ? newProposal : p));
      alert('Proposal updated successfully!');
    } else {
      setProposals([...proposals, newProposal]);
      alert('Proposal created successfully!');
    }

    setShowCreateModal(false);
    setCurrentPage(1); // Reset to first page to see new proposal
  };

  const handleStatusChange = (newStatus) => {
    const updated = proposals.map(p =>
      p.id === selectedProposal.id ? { ...p, status: newStatus, lastUpdated: new Date().toISOString().split('T')[0] } : p
    );
    setProposals(updated);
    setSelectedProposal({ ...selectedProposal, status: newStatus });
    alert(`Proposal status changed to ${newStatus}`);
  };

  const handleExportPDF = () => {
    alert('Export PDF functionality - This would generate a PDF report of all proposals');
  };

  const handleExportExcel = () => {
    alert('Export Excel functionality - This would generate an Excel spreadsheet of all proposals');
  };

  const handleDownloadProposalPDF = (proposal) => {
    alert(`Downloading PDF for ${proposal.id} - ${proposal.title}`);
  };

  const handlePreviewPDF = () => {
    alert('Preview PDF functionality - This would show a preview of the proposal document');
  };

  const handleShareEmail = () => {
    alert('Share via Email functionality - This would open email client with proposal attached');
  };

  const getStatusClass = (status) => {
    const statusMap = {
      'Draft': 'status-draft',
      'Sent': 'status-sent',
      'Approved': 'status-approved',
      'Rejected': 'status-rejected',
      'On Hold': 'status-hold'
    };
    return statusMap[status] || 'status-draft';
  };

  return (
    <div className="proposal-page-container">
      {/* Header */}
      <div className="proposal-page-header">
        <div>
          <div className="proposal-page-breadcrumb">
            Dashboard &gt; Proposals
          </div>
        </div>

      </div>
      <div className="page-header-with-filter">
        <h1 className="proposal-page-title">Proposals</h1>

        <GroupProjectFilter
          groupValue={groupName}
          projectValue={projectId}
          onChange={updateFilters}
        />
      </div>
      {/* Action Bar */}
      <div className="proposal-page-action-bar">
        <div className="proposal-page-search-filters">
          <input
            type="text"
            className="proposal-page-search"
            placeholder="Search by ID, Client, Company, Email, Phone, Value..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="proposal-page-filter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Draft">Draft</option>
            <option value="Sent">Sent</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="On Hold">On Hold</option>
          </select>

          <select
            className="proposal-page-filter"
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="All">All Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <select
            className="proposal-page-filter"
            value={filterPreparedBy}
            onChange={(e) => setFilterPreparedBy(e.target.value)}
          >
            <option value="All">All Members</option>
            <option value="Anita Sharma">Anita Sharma</option>
            <option value="Vikram Singh">Vikram Singh</option>
            <option value="Neha Gupta">Neha Gupta</option>
          </select>
        </div>

        <div className="proposal-page-action-buttons">
          <button
            className="proposal-page-btn proposal-page-btn-secondary"
            onClick={handleExportPDF}
          >
            Export PDF
          </button>
          <button
            className="proposal-page-btn proposal-page-btn-secondary"
            onClick={handleExportExcel}
          >
            Export Excel
          </button>
          <button
            className="proposal-page-btn proposal-page-btn-secondary"
            onClick={() => setShowVersionModal(true)}
          >
            Version History
          </button>
          <button
            className="proposal-page-btn proposal-page-btn-primary"
            onClick={handleCreateNew}
          >
            + Create New Proposal
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="proposal-page-table-container">
        <table className="proposal-page-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('id')}>
                Proposal ID {sortConfig.key === 'id' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th>Client Name</th>
              <th>Company Name</th>
              <th>Proposal Title</th>
              <th onClick={() => handleSort('value')}>
                Value (₹) {sortConfig.key === 'value' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th>Version</th>
              <th>Status</th>
              <th>Prepared By</th>
              <th onClick={() => handleSort('lastUpdated')}>
                Last Updated {sortConfig.key === 'lastUpdated' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProposals.length > 0 ? (
              paginatedProposals.map((proposal) => (
                <tr key={proposal.id}>
                  <td className="proposal-page-id">{proposal.id}</td>
                  <td>{proposal.clientName}</td>
                  <td>{proposal.companyName}</td>
                  <td>{proposal.title}</td>
                  <td>₹{proposal.value.toLocaleString('en-IN')}</td>
                  <td><span className="proposal-page-version">{proposal.version}</span></td>
                  <td>
                    <span className={`proposal-page-status ${getStatusClass(proposal.status)}`}>
                      {proposal.status}
                    </span>
                  </td>
                  <td>{proposal.preparedBy}</td>
                  <td>{proposal.lastUpdated}</td>
                  <td>
                    <div className="proposal-page-actions">
                      <button
                        className="proposal-page-action-btn"
                        onClick={() => handleView(proposal)}
                        title="View"
                      >
                        👁️
                      </button>
                      <button
                        className="proposal-page-action-btn"
                        onClick={() => handleEdit(proposal)}
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        className="proposal-page-action-btn"
                        onClick={() => handleDuplicate(proposal)}
                        title="Duplicate"
                      >
                        📋
                      </button>
                      <button
                        className="proposal-page-action-btn"
                        onClick={() => handleDownloadProposalPDF(proposal)}
                        title="Download PDF"
                      >
                        📄
                      </button>
                      <button
                        className="proposal-page-action-btn proposal-page-action-delete"
                        onClick={() => handleDelete(proposal.id)}
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" style={{ textAlign: 'center', padding: '40px', color: '#718096' }}>
                  No proposals found. Try adjusting your filters or create a new proposal.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="proposal-page-pagination">
        <div className="proposal-page-pagination-info">
          {sortedProposals.length > 0 ? (
            <>Showing {startIndex + 1} to {Math.min(startIndex + rowsPerPage, sortedProposals.length)} of {sortedProposals.length} entries</>
          ) : (
            <>No entries to display</>
          )}
        </div>
        <div className="proposal-page-pagination-controls">
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="proposal-page-rows-select"
          >
            <option value={10}>10 rows</option>
            <option value={25}>25 rows</option>
            <option value={50}>50 rows</option>
          </select>
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="proposal-page-pagination-btn"
          >
            Previous
          </button>
          <span className="proposal-page-pagination-current">
            Page {currentPage} of {totalPages || 1}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="proposal-page-pagination-btn"
          >
            Next
          </button>
        </div>
      </div>

      {/* View Modal */}
      {showViewModal && selectedProposal && (
        <div className="proposal-page-modal-overlay" onClick={() => setShowViewModal(false)}>
          <div className="proposal-page-modal" onClick={(e) => e.stopPropagation()}>
            <div className="proposal-page-modal-header">
              <h2>Proposal Details</h2>
              <button
                className="proposal-page-modal-close"
                onClick={() => setShowViewModal(false)}
              >
                ×
              </button>
            </div>

            <div className="proposal-page-modal-content">
              {/* Proposal Header */}
              <div className="proposal-page-card">
                <div className="proposal-page-card-header">
                  <div>
                    <h3>{selectedProposal.title} - {selectedProposal.version}</h3>
                    <p className="proposal-page-id">{selectedProposal.id}</p>
                  </div>
                  <span className={`proposal-page-status ${getStatusClass(selectedProposal.status)}`}>
                    {selectedProposal.status}
                  </span>
                </div>
                <div className="proposal-page-info-grid">
                  <div>
                    <strong>Created:</strong> {selectedProposal.createdDate}
                  </div>
                  <div>
                    <strong>Updated:</strong> {selectedProposal.lastUpdated}
                  </div>
                  <div>
                    <strong>Prepared By:</strong> {selectedProposal.preparedBy}
                  </div>
                  <div>
                    <strong>Value:</strong> ₹{selectedProposal.value.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Client Information */}
              <div className="proposal-page-card">
                <h3>Client Information</h3>
                <div className="proposal-page-info-grid">
                  <div>
                    <strong>Client Name:</strong> {selectedProposal.clientName}
                  </div>
                  <div>
                    <strong>Company:</strong> {selectedProposal.companyName}
                  </div>
                  <div>
                    <strong>Email:</strong> {selectedProposal.email}
                  </div>
                  <div>
                    <strong>Phone:</strong> {selectedProposal.phone}
                  </div>
                  <div className="proposal-page-full-width">
                    <strong>Address:</strong> {selectedProposal.address}
                  </div>
                </div>
              </div>

              {/* Proposal Content */}
              <div className="proposal-page-card">
                <h3>Proposal Content</h3>
                <div className="proposal-page-content-section">
                  <h4>Introduction</h4>
                  <p>{selectedProposal.introduction}</p>
                </div>
                <div className="proposal-page-content-section">
                  <h4>Scope of Work</h4>
                  <p>{selectedProposal.scopeOfWork}</p>
                </div>
                <div className="proposal-page-content-section">
                  <h4>Deliverables</h4>
                  <p>{selectedProposal.deliverables}</p>
                </div>
                <div className="proposal-page-content-section">
                  <h4>Pricing Breakdown</h4>
                  <pre>{selectedProposal.pricingBreakdown}</pre>
                </div>
                <div className="proposal-page-content-section">
                  <h4>Terms & Conditions</h4>
                  <p>{selectedProposal.terms}</p>
                </div>
              </div>

              {/* Attachments Section */}
              <div className="proposal-page-card">
                <h3>Attachments</h3>
                <div className="proposal-page-content-section">
                  <p style={{ color: '#718096', fontStyle: 'italic' }}>
                    No attachments uploaded yet. You can add attachments when editing this proposal.
                  </p>
                </div>
              </div>

              {/* Internal Notes */}
              {selectedProposal.notes && (
                <div className="proposal-page-card">
                  <h3>Internal Notes</h3>
                  <div className="proposal-page-content-section">
                    <p>{selectedProposal.notes}</p>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="proposal-page-modal-actions">
                <button
                  className="proposal-page-btn proposal-page-btn-secondary"
                  onClick={() => handleEdit(selectedProposal)}
                >
                  Edit Proposal
                </button>
                <button
                  className="proposal-page-btn proposal-page-btn-secondary"
                  onClick={() => handleDownloadProposalPDF(selectedProposal)}
                >
                  Download PDF
                </button>
                <button
                  className="proposal-page-btn proposal-page-btn-secondary"
                  onClick={() => {
                    handleDuplicate(selectedProposal);
                    setShowViewModal(false);
                  }}
                >
                  Duplicate
                </button>
                <button
                  className="proposal-page-btn proposal-page-btn-secondary"
                  onClick={handleShareEmail}
                >
                  Share via Email
                </button>
                <select
                  className="proposal-page-status-dropdown"
                  value={selectedProposal.status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                >
                  <option value="Draft">Draft</option>
                  <option value="Sent">Sent</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="On Hold">On Hold</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div className="proposal-page-modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="proposal-page-modal proposal-page-modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="proposal-page-modal-header">
              <h2>{isEditMode ? 'Edit Proposal' : 'Create New Proposal'}</h2>
              <button
                className="proposal-page-modal-close"
                onClick={() => setShowCreateModal(false)}
              >
                ×
              </button>
            </div>

            <div className="proposal-page-modal-content">
              <div className="proposal-page-form">
                <div className="proposal-page-form-row">
                  <div className="proposal-page-form-group">
                    <label>Proposal Title *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Enter proposal title"
                    />
                  </div>
                  <div className="proposal-page-form-group">
                    <label>Proposal Value (₹) *</label>
                    <input
                      type="number"
                      value={formData.value}
                      onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                      placeholder="Enter value"
                    />
                  </div>
                </div>

                <div className="proposal-page-form-row">
                  <div className="proposal-page-form-group">
                    <label>Client Name *</label>
                    <input
                      type="text"
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      placeholder="Enter client name"
                    />
                  </div>
                  <div className="proposal-page-form-group">
                    <label>Company Name *</label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="Enter company name"
                    />
                  </div>
                </div>

                <div className="proposal-page-form-row">
                  <div className="proposal-page-form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter email"
                    />
                  </div>
                  <div className="proposal-page-form-group">
                    <label>Phone *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                <div className="proposal-page-form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Enter address"
                  />
                </div>

                <div className="proposal-page-form-group">
                  <label>Introduction</label>
                  <textarea
                    value={formData.introduction}
                    onChange={(e) => setFormData({ ...formData, introduction: e.target.value })}
                    placeholder="Enter proposal introduction"
                    rows={3}
                  />
                </div>

                <div className="proposal-page-form-group">
                  <label>Scope of Work</label>
                  <textarea
                    value={formData.scopeOfWork}
                    onChange={(e) => setFormData({ ...formData, scopeOfWork: e.target.value })}
                    placeholder="Enter scope of work"
                    rows={3}
                  />
                </div>

                <div className="proposal-page-form-group">
                  <label>Deliverables</label>
                  <textarea
                    value={formData.deliverables}
                    onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
                    placeholder="Enter deliverables"
                    rows={3}
                  />
                </div>

                <div className="proposal-page-form-group">
                  <label>Pricing Breakdown</label>
                  <textarea
                    value={formData.pricingBreakdown}
                    onChange={(e) => setFormData({ ...formData, pricingBreakdown: e.target.value })}
                    placeholder="Enter pricing breakdown (e.g., Development: ₹10,00,000)"
                    rows={4}
                  />
                </div>

                <div className="proposal-page-form-group">
                  <label>Terms & Conditions</label>
                  <textarea
                    value={formData.terms}
                    onChange={(e) => setFormData({ ...formData, terms: e.target.value })}
                    placeholder="Enter terms and conditions"
                    rows={3}
                  />
                </div>

                <div className="proposal-page-form-row">
                  <div className="proposal-page-form-group">
                    <label>Prepared By</label>
                    <select
                      value={formData.preparedBy}
                      onChange={(e) => setFormData({ ...formData, preparedBy: e.target.value })}
                    >
                      <option value="">Select member</option>
                      <option value="Anita Sharma">Anita Sharma</option>
                      <option value="Vikram Singh">Vikram Singh</option>
                      <option value="Neha Gupta">Neha Gupta</option>
                    </select>
                  </div>
                  <div className="proposal-page-form-group">
                    <label>Upload Files</label>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.docx,.png,.jpg,.jpeg"
                      onChange={(e) => {
                        // File upload logic would go here
                        console.log('Files selected:', e.target.files);
                      }}
                      style={{ padding: '8px' }}
                    />
                  </div>
                </div>

                <div className="proposal-page-form-group">
                  <label>Internal Notes</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Add internal notes (not visible to client)"
                    rows={2}
                  />
                </div>
              </div>

              <div className="proposal-page-modal-actions">
                <button
                  className="proposal-page-btn proposal-page-btn-secondary"
                  onClick={() => handleSubmitProposal('Draft')}
                >
                  Save as Draft
                </button>
                <button
                  className="proposal-page-btn proposal-page-btn-secondary"
                  onClick={handlePreviewPDF}
                >
                  Preview PDF
                </button>
                <button
                  className="proposal-page-btn proposal-page-btn-primary"
                  onClick={() => handleSubmitProposal('Sent')}
                >
                  {isEditMode ? 'Update & Send' : 'Create & Send'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Version History Modal */}
      {showVersionModal && (
        <div className="proposal-page-modal-overlay" onClick={() => setShowVersionModal(false)}>
          <div className="proposal-page-modal" onClick={(e) => e.stopPropagation()}>
            <div className="proposal-page-modal-header">
              <h2>Version History</h2>
              <button
                className="proposal-page-modal-close"
                onClick={() => setShowVersionModal(false)}
              >
                ×
              </button>
            </div>

            <div className="proposal-page-modal-content">
              <p style={{ marginBottom: '20px', color: '#4a5568' }}>
                Track all versions and changes made to proposals over time.
              </p>
              <div className="proposal-page-version-list">
                <div className="proposal-page-version-item">
                  <div>
                    <strong>v3</strong> - Current Version
                    <p>Modified by Anita Sharma on 2024-12-08 at 03:45 PM</p>
                    <p style={{ fontSize: '12px', color: '#718096', marginTop: '4px' }}>
                      Updated pricing breakdown and terms
                    </p>
                  </div>
                  <button className="proposal-page-btn proposal-page-btn-secondary proposal-page-btn-sm">
                    View
                  </button>
                </div>
                <div className="proposal-page-version-item">
                  <div>
                    <strong>v2</strong>
                    <p>Modified by Anita Sharma on 2024-11-25 at 11:20 AM</p>
                    <p style={{ fontSize: '12px', color: '#718096', marginTop: '4px' }}>
                      Added deliverables section and revised scope
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="proposal-page-btn proposal-page-btn-secondary proposal-page-btn-sm">
                      View
                    </button>
                    <button
                      className="proposal-page-btn proposal-page-btn-secondary proposal-page-btn-sm"
                      onClick={() => alert('Restore v2 functionality - This would restore this version')}
                    >
                      Restore
                    </button>
                  </div>
                </div>
                <div className="proposal-page-version-item">
                  <div>
                    <strong>v1</strong> - Initial Version
                    <p>Created by Anita Sharma on 2024-11-15 at 09:30 AM</p>
                    <p style={{ fontSize: '12px', color: '#718096', marginTop: '4px' }}>
                      Initial proposal draft created
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="proposal-page-btn proposal-page-btn-secondary proposal-page-btn-sm">
                      View
                    </button>
                    <button
                      className="proposal-page-btn proposal-page-btn-secondary proposal-page-btn-sm"
                      onClick={() => alert('Restore v1 functionality - This would restore this version')}
                    >
                      Restore
                    </button>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '24px', padding: '16px', background: '#edf2f7', borderRadius: '6px' }}>
                <p style={{ fontSize: '13px', color: '#4a5568', margin: 0 }}>
                  <strong>Note:</strong> Version history is automatically tracked when proposals are edited.
                  You can view or restore any previous version at any time.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProposalsManagementPage