import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Plus, X, Edit2, Eye, Check, XCircle, FileText, Upload, Calendar, DollarSign, TrendingUp, Clock, Package, CheckCircle, Star, AlertCircle, ShoppingCart } from 'lucide-react';
import '../pages-css/Procurement-Quatation-Recieved.css';

const QuotationsReceived = () => {
  const [quotations, setQuotations] = useState([]);
  const [selectedQuotations, setSelectedQuotations] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    category: 'all',
    vendor: 'all',
    dateRange: 'all',
    expiringSoon: false
  });
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const [showComparisonMode, setShowComparisonMode] = useState(false);
  const [showCreatePOModal, setShowCreatePOModal] = useState(false);
  const [poData, setPOData] = useState(null);
  const [showUploadQuotationModal, setShowUploadQuotationModal] = useState(false);
  const [quotationFormData, setQuotationFormData] = useState(null);

  // Mock data
  const mockQuotations = [
    {
      id: 'QUO-2024-001',
      rfqId: 'RFQ-2024-045',
      vendor: 'TechSupply Industries',
      vendorRating: 4.5,
      vendorContact: '+91 98765 43210',
      category: 'IT Equipment',
      items: [
        { name: 'Laptop Dell XPS 15', description: 'Intel i7, 16GB RAM, 512GB SSD', qty: 10, unitPrice: 85000, tax: 18, lineTotal: 1003000 },
        { name: 'Monitor 27" 4K', description: 'LG UltraFine Display', qty: 10, unitPrice: 32000, tax: 18, lineTotal: 377600 }
      ],
      quotationValue: 1380600,
      validTill: '2024-12-20',
      status: 'New',
      uploadedOn: '2024-12-05',
      uploadedBy: 'Rajesh Kumar',
      attachments: ['quotation-001.pdf', 'product-specs.pdf'],
      deliveryTime: '15 days',
      paymentTerms: '30 days net',
      warranty: '3 years',
      notes: []
    },
    {
      id: 'QUO-2024-002',
      rfqId: 'RFQ-2024-046',
      vendor: 'Office Plus Solutions',
      vendorRating: 4.2,
      vendorContact: '+91 98765 43211',
      category: 'Office Furniture',
      items: [
        { name: 'Executive Desk', description: 'Wooden, L-shaped', qty: 5, unitPrice: 25000, tax: 12, lineTotal: 140000 },
        { name: 'Ergonomic Chair', description: 'Herman Miller Aeron', qty: 5, unitPrice: 45000, tax: 12, lineTotal: 252000 }
      ],
      quotationValue: 392000,
      validTill: '2024-12-15',
      status: 'Shortlisted',
      uploadedOn: '2024-12-03',
      uploadedBy: 'Priya Sharma',
      attachments: ['quotation-002.pdf'],
      deliveryTime: '10 days',
      paymentTerms: '45 days net',
      warranty: '2 years',
      notes: ['Good vendor history', 'Competitive pricing']
    },
    {
      id: 'QUO-2024-003',
      rfqId: 'RFQ-2024-045',
      vendor: 'Digital Systems Corp',
      vendorRating: 4.8,
      vendorContact: '+91 98765 43212',
      category: 'IT Equipment',
      items: [
        { name: 'Laptop Dell XPS 15', description: 'Intel i7, 16GB RAM, 512GB SSD', qty: 10, unitPrice: 82000, tax: 18, lineTotal: 967600 },
        { name: 'Monitor 27" 4K', description: 'Dell UltraSharp', qty: 10, unitPrice: 30000, tax: 18, lineTotal: 354000 }
      ],
      quotationValue: 1321600,
      validTill: '2024-12-18',
      status: 'Approved',
      uploadedOn: '2024-12-04',
      uploadedBy: 'Amit Patel',
      attachments: ['quotation-003.pdf', 'warranty-terms.pdf'],
      deliveryTime: '12 days',
      paymentTerms: '30 days net',
      warranty: '3 years on-site',
      notes: ['Best pricing', 'Excellent delivery track record']
    },
    {
      id: 'QUO-2024-004',
      rfqId: 'RFQ-2024-047',
      vendor: 'Industrial Supplies Ltd',
      vendorRating: 3.9,
      vendorContact: '+91 98765 43213',
      category: 'Manufacturing',
      items: [
        { name: 'CNC Machine Parts', description: 'High precision components', qty: 50, unitPrice: 5000, tax: 18, lineTotal: 295000 }
      ],
      quotationValue: 295000,
      validTill: '2024-12-10',
      status: 'Expires Soon',
      uploadedOn: '2024-11-28',
      uploadedBy: 'Suresh Reddy',
      attachments: ['quotation-004.pdf'],
      deliveryTime: '20 days',
      paymentTerms: '60 days net',
      warranty: '1 year',
      notes: []
    },
    {
      id: 'QUO-2024-005',
      rfqId: 'RFQ-2024-048',
      vendor: 'Global Trade Partners',
      vendorRating: 3.5,
      vendorContact: '+91 98765 43214',
      category: 'Office Supplies',
      items: [
        { name: 'Printer Toner Cartridges', description: 'HP Compatible', qty: 100, unitPrice: 1200, tax: 18, lineTotal: 141600 },
        { name: 'A4 Paper Reams', description: 'Premium quality', qty: 200, unitPrice: 250, tax: 12, lineTotal: 56000 }
      ],
      quotationValue: 197600,
      validTill: '2024-12-08',
      status: 'Expired',
      uploadedOn: '2024-11-20',
      uploadedBy: 'Meera Singh',
      attachments: ['quotation-005.pdf'],
      deliveryTime: '7 days',
      paymentTerms: '30 days net',
      warranty: 'N/A',
      notes: []
    },
    {
      id: 'QUO-2024-006',
      rfqId: 'RFQ-2024-049',
      vendor: 'Premium Electronics',
      vendorRating: 4.6,
      vendorContact: '+91 98765 43215',
      category: 'IT Equipment',
      items: [
        { name: 'Network Switch 48-port', description: 'Cisco Catalyst', qty: 3, unitPrice: 125000, tax: 18, lineTotal: 442500 },
        { name: 'UPS 10KVA', description: 'APC Smart-UPS', qty: 2, unitPrice: 85000, tax: 18, lineTotal: 200600 }
      ],
      quotationValue: 643100,
      validTill: '2024-12-25',
      status: 'Under Review',
      uploadedOn: '2024-12-06',
      uploadedBy: 'Vikram Joshi',
      attachments: ['quotation-006.pdf', 'technical-specs.pdf'],
      deliveryTime: '14 days',
      paymentTerms: '45 days net',
      warranty: '5 years',
      notes: ['Premium quality', 'Needs management approval']
    },
    {
      id: 'QUO-2024-007',
      rfqId: 'RFQ-2024-050',
      vendor: 'Building Materials Co',
      vendorRating: 4.0,
      vendorContact: '+91 98765 43216',
      category: 'Construction',
      items: [
        { name: 'Steel Beams', description: 'Grade A steel', qty: 100, unitPrice: 8500, tax: 18, lineTotal: 1003000 }
      ],
      quotationValue: 1003000,
      validTill: '2024-12-22',
      status: 'Rejected',
      uploadedOn: '2024-12-01',
      uploadedBy: 'Ravi Kumar',
      attachments: ['quotation-007.pdf'],
      deliveryTime: '30 days',
      paymentTerms: '90 days net',
      warranty: '10 years',
      notes: ['Pricing too high', 'Delivery time not acceptable']
    }
  ];

  useEffect(() => {
    setQuotations(mockQuotations);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Calculate KPIs
  const kpis = {
    total: quotations.length,
    expiring: quotations.filter(q => q.status === 'Expires Soon').length,
    shortlisted: quotations.filter(q => q.status === 'Shortlisted').length,
    approved: quotations.filter(q => q.status === 'Approved').length,
    avgValue: quotations.length > 0 ? Math.round(quotations.reduce((sum, q) => sum + q.quotationValue, 0) / quotations.length) : 0
  };

  // Filter quotations
  const filteredQuotations = quotations.filter(q => {
    if (filters.search && !q.id.toLowerCase().includes(filters.search.toLowerCase()) &&
        !q.vendor.toLowerCase().includes(filters.search.toLowerCase()) &&
        !q.rfqId.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.status !== 'all' && q.status !== filters.status) return false;
    if (filters.category !== 'all' && q.category !== filters.category) return false;
    if (filters.expiringSoon && q.status !== 'Expires Soon') return false;
    return true;
  });

  // Handle checkbox selection
  const handleSelectQuotation = (quotationId) => {
    setSelectedQuotations(prev =>
      prev.includes(quotationId)
        ? prev.filter(id => id !== quotationId)
        : [...prev, quotationId]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedQuotations(filteredQuotations.map(q => q.id));
    } else {
      setSelectedQuotations([]);
    }
  };

  // View quotation details
  const handleViewQuotation = (quotation) => {
    setSelectedQuotation(quotation);
    setShowDetailDrawer(true);
  };

  // Status update handlers
  const handleShortlist = (quotationId) => {
    setQuotations(prev => prev.map(q =>
      q.id === quotationId ? { ...q, status: 'Shortlisted' } : q
    ));
    alert(`Quotation ${quotationId} has been shortlisted`);
  };

  const handleApprove = (quotationId) => {
    setQuotations(prev => prev.map(q =>
      q.id === quotationId ? { ...q, status: 'Approved' } : q
    ));
    alert(`Quotation ${quotationId} has been approved`);
  };

  const handleReject = (quotationId) => {
    if (window.confirm('Are you sure you want to reject this quotation?')) {
      setQuotations(prev => prev.map(q =>
        q.id === quotationId ? { ...q, status: 'Rejected' } : q
      ));
      alert(`Quotation ${quotationId} has been rejected`);
    }
  };

  // Create PO from quotation
  const handleCreatePO = (quotation) => {
    setPOData({
      vendor: quotation.vendor,
      linkedQuotationId: quotation.id,
      items: quotation.items,
      subtotal: quotation.quotationValue,
      deliveryTerms: quotation.deliveryTime,
      paymentTerms: quotation.paymentTerms,
      validTill: quotation.validTill
    });
    setShowCreatePOModal(true);
  };

  // Upload new quotation
  const handleUploadQuotation = () => {
    setQuotationFormData({
      vendor: '',
      rfqId: '',
      category: 'IT Equipment',
      validTill: '',
      deliveryTime: '',
      paymentTerms: '',
      warranty: '',
      items: [{ name: '', description: '', qty: 1, unitPrice: 0, tax: 18 }],
      notes: ''
    });
    setShowUploadQuotationModal(true);
  };

  // Add item to quotation
  const handleAddQuotationItem = () => {
    if (quotationFormData) {
      setQuotationFormData({
        ...quotationFormData,
        items: [...quotationFormData.items, { name: '', description: '', qty: 1, unitPrice: 0, tax: 18 }]
      });
    }
  };

  // Remove item from quotation
  const handleRemoveQuotationItem = (index) => {
    if (quotationFormData && quotationFormData.items.length > 1) {
      const newItems = quotationFormData.items.filter((_, i) => i !== index);
      setQuotationFormData({ ...quotationFormData, items: newItems });
    }
  };

  // Update quotation item
  const handleUpdateQuotationItem = (index, field, value) => {
    if (quotationFormData) {
      const newItems = [...quotationFormData.items];
      newItems[index] = { ...newItems[index], [field]: value };
      setQuotationFormData({ ...quotationFormData, items: newItems });
    }
  };

  // Save new quotation
  const handleSaveQuotation = () => {
    if (!quotationFormData.vendor || !quotationFormData.rfqId || !quotationFormData.validTill || quotationFormData.items.length === 0) {
      alert('Please fill in all required fields');
      return;
    }

    const calculatedItems = quotationFormData.items.map(item => {
      const subtotal = item.qty * item.unitPrice;
      const taxAmount = subtotal * (item.tax / 100);
      return {
        ...item,
        lineTotal: subtotal + taxAmount
      };
    });

    const quotationValue = calculatedItems.reduce((sum, item) => sum + item.lineTotal, 0);

    const newQuotation = {
      id: `QUO-2024-${String(quotations.length + 1).padStart(3, '0')}`,
      rfqId: quotationFormData.rfqId,
      vendor: quotationFormData.vendor,
      vendorRating: 4.0,
      vendorContact: '+91 00000 00000',
      category: quotationFormData.category,
      items: calculatedItems,
      quotationValue: quotationValue,
      validTill: quotationFormData.validTill,
      status: 'New',
      uploadedOn: new Date().toISOString().split('T')[0],
      uploadedBy: 'Current User',
      attachments: [],
      deliveryTime: quotationFormData.deliveryTime,
      paymentTerms: quotationFormData.paymentTerms,
      warranty: quotationFormData.warranty,
      notes: quotationFormData.notes ? [quotationFormData.notes] : []
    };

    setQuotations(prev => [...prev, newQuotation]);
    alert('Quotation uploaded successfully!');
    setShowUploadQuotationModal(false);
  };

  // Calculate quotation totals for display
  const calculateQuotationTotal = () => {
    if (!quotationFormData) return { subtotal: 0, taxAmount: 0, total: 0 };
    
    const subtotal = quotationFormData.items.reduce((sum, item) => sum + (item.qty * item.unitPrice), 0);
    const itemsWithTotals = quotationFormData.items.map(item => {
      const lineSubtotal = item.qty * item.unitPrice;
      const lineTax = lineSubtotal * (item.tax / 100);
      return { ...item, lineTotal: lineSubtotal + lineTax };
    });
    const taxAmount = quotationFormData.items.reduce((sum, item) => {
      const lineSubtotal = item.qty * item.unitPrice;
      return sum + (lineSubtotal * item.tax / 100);
    }, 0);
    const total = subtotal + taxAmount;
    
    return { subtotal, taxAmount, total, itemsWithTotals };
  };

  // Comparison mode
  const handleCompareQuotations = () => {
    if (selectedQuotations.length < 2) {
      alert('Please select at least 2 quotations to compare');
      return;
    }
    if (selectedQuotations.length > 4) {
      alert('You can compare maximum 4 quotations at a time');
      return;
    }
    setShowComparisonMode(true);
  };


  // Get status badge class
  const getStatusBadgeClass = (status) => {
    const statusClasses = {
      'New': 'procurement-quotation-received-badge-new',
      'Under Review': 'procurement-quotation-received-badge-review',
      'Shortlisted': 'procurement-quotation-received-badge-shortlisted',
      'Approved': 'procurement-quotation-received-badge-approved',
      'Rejected': 'procurement-quotation-received-badge-rejected',
      'Expires Soon': 'procurement-quotation-received-badge-expiring',
      'Expired': 'procurement-quotation-received-badge-expired'
    };
    return statusClasses[status] || '';
  };

  // Format currency
  const formatCurrency = (amount) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  // Format date
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // Check if quotation is expired
  // eslint-disable-next-line no-unused-vars
  const isExpired = (validTill) => {
    return new Date(validTill) < new Date();
  };

  // Check if expiring soon
  const isExpiringSoon = (validTill) => {
    const today = new Date();
    const valid = new Date(validTill);
    const diffDays = Math.ceil((valid - today) / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays > 0;
  };

  return (
    <div className="procurement-quotation-received-container">
      {/* Header */}
      <div className="procurement-quotation-received-header">
        <div className="procurement-quotation-received-breadcrumb">
          Dashboard &gt; Procurement &gt; Quotations Received
        </div>
        <h1 className="procurement-quotation-received-title">
          Quotations Received <span className="procurement-quotation-received-count">({quotations.length})</span>
        </h1>
      </div>

      {/* Action Bar */}
      <div className="procurement-quotation-received-action-bar">
        <div className="procurement-quotation-received-search-filters">
          <input
            type="text"
            placeholder="Search by Quotation ID, Vendor, Item, RFQ ID..."
            className="procurement-quotation-received-search"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
          
          <select
            className="procurement-quotation-received-filter"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="all">All Status</option>
            <option value="New">New</option>
            <option value="Under Review">Under Review</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>

          <select
            className="procurement-quotation-received-filter"
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          >
            <option value="all">All Categories</option>
            <option value="IT Equipment">IT Equipment</option>
            <option value="Office Furniture">Office Furniture</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Office Supplies">Office Supplies</option>
            <option value="Construction">Construction</option>
          </select>

          <label className="procurement-quotation-received-checkbox-filter">
            <input
              type="checkbox"
              checked={filters.expiringSoon}
              onChange={(e) => setFilters({ ...filters, expiringSoon: e.target.checked })}
            />
            Expiring Soon (7 days)
          </label>
        </div>

        <div className="procurement-quotation-received-actions">
          <button className="procurement-quotation-received-btn-secondary" onClick={handleCompareQuotations}>
            Compare Selected
          </button>
          <button className="procurement-quotation-received-btn-secondary">Import PDF/Excel</button>
          <button className="procurement-quotation-received-btn-secondary">Export CSV</button>
          <button className="procurement-quotation-received-btn-primary" onClick={handleUploadQuotation}>
            + Upload Quotation
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="procurement-quotation-received-kpi-grid">
        <div className="procurement-quotation-received-kpi-card">
          <div className="procurement-quotation-received-kpi-icon">
            <FileText size={32} />
          </div>
          <div className="procurement-quotation-received-kpi-content">
            <div className="procurement-quotation-received-kpi-value">{kpis.total}</div>
            <div className="procurement-quotation-received-kpi-label">Total Quotations</div>
          </div>
        </div>

        <div className="procurement-quotation-received-kpi-card">
          <div className="procurement-quotation-received-kpi-icon">
            <AlertCircle size={32} />
          </div>
          <div className="procurement-quotation-received-kpi-content">
            <div className="procurement-quotation-received-kpi-value">{kpis.expiring}</div>
            <div className="procurement-quotation-received-kpi-label">Expiring in 7 Days</div>
          </div>
        </div>

        <div className="procurement-quotation-received-kpi-card">
          <div className="procurement-quotation-received-kpi-icon">
            <Star size={32} />
          </div>
          <div className="procurement-quotation-received-kpi-content">
            <div className="procurement-quotation-received-kpi-value">{kpis.shortlisted}</div>
            <div className="procurement-quotation-received-kpi-label">Shortlisted</div>
          </div>
        </div>

        <div className="procurement-quotation-received-kpi-card">
          <div className="procurement-quotation-received-kpi-icon">
            <CheckCircle size={32} />
          </div>
          <div className="procurement-quotation-received-kpi-content">
            <div className="procurement-quotation-received-kpi-value">{kpis.approved}</div>
            <div className="procurement-quotation-received-kpi-label">Approved</div>
          </div>
        </div>

        <div className="procurement-quotation-received-kpi-card">
          <div className="procurement-quotation-received-kpi-icon">
            <DollarSign size={32} />
          </div>
          <div className="procurement-quotation-received-kpi-content">
            <div className="procurement-quotation-received-kpi-value">{formatCurrency(kpis.avgValue)}</div>
            <div className="procurement-quotation-received-kpi-label">Average Value</div>
          </div>
        </div>
      </div>

      {/* Quotations Table */}
      <div className="procurement-quotation-received-table-container">
        <table className="procurement-quotation-received-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedQuotations.length === filteredQuotations.length && filteredQuotations.length > 0}
                />
              </th>
              <th>Quotation ID</th>
              <th>RFQ ID</th>
              <th>Vendor Name</th>
              <th>Category</th>
              <th>Quotation Value</th>
              <th>Valid Till</th>
              <th>Status</th>
              <th>Uploaded On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuotations.map(quotation => (
              <tr key={quotation.id} className="procurement-quotation-received-table-row">
                <td>
                  <input
                    type="checkbox"
                    checked={selectedQuotations.includes(quotation.id)}
                    onChange={() => handleSelectQuotation(quotation.id)}
                  />
                </td>
                <td className="procurement-quotation-received-table-id">{quotation.id}</td>
                <td>{quotation.rfqId}</td>
                <td className="procurement-quotation-received-table-vendor">{quotation.vendor}</td>
                <td>{quotation.category}</td>
                <td className="procurement-quotation-received-table-value">{formatCurrency(quotation.quotationValue)}</td>
                <td className={isExpiringSoon(quotation.validTill) ? 'procurement-quotation-received-expiring' : ''}>
                  {formatDate(quotation.validTill)}
                  {isExpiringSoon(quotation.validTill) && (
                    <span className="procurement-quotation-received-warning-icon">
                      <AlertCircle size={16} />
                    </span>
                  )}
                </td>
                <td>
                  <span className={`procurement-quotation-received-badge ${getStatusBadgeClass(quotation.status)}`}>
                    {quotation.status}
                  </span>
                </td>
                <td>{formatDate(quotation.uploadedOn)}</td>
                <td>
                  <div className="procurement-quotation-received-actions-cell">
                    <button
                      className="procurement-quotation-received-action-btn"
                      onClick={() => handleViewQuotation(quotation)}
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                    {quotation.status !== 'Approved' && quotation.status !== 'Rejected' && quotation.status !== 'Expired' && (
                      <>
                        <button
                          className="procurement-quotation-received-action-btn"
                          onClick={() => handleShortlist(quotation.id)}
                          title="Shortlist"
                        >
                          <Star size={16} />
                        </button>
                        <button
                          className="procurement-quotation-received-action-btn"
                          onClick={() => handleApprove(quotation.id)}
                          title="Approve"
                        >
                          <Check size={16} />
                        </button>
                        <button
                          className="procurement-quotation-received-action-btn"
                          onClick={() => handleReject(quotation.id)}
                          title="Reject"
                        >
                          <X size={16} />
                        </button>
                      </>
                    )}
                    {quotation.status === 'Approved' && (
                      <button
                        className="procurement-quotation-received-action-btn procurement-quotation-received-create-po-btn"
                        onClick={() => handleCreatePO(quotation)}
                        title="Create PO"
                      >
                        <ShoppingCart size={16} />
                      </button>
                    )}
                    <button className="procurement-quotation-received-action-btn" title="Download">
                      <Download size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Drawer */}
      {showDetailDrawer && selectedQuotation && (
        <div className="procurement-quotation-received-drawer-overlay" onClick={() => setShowDetailDrawer(false)}>
          <div className="procurement-quotation-received-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="procurement-quotation-received-drawer-header">
              <div>
                <h2>{selectedQuotation.id}</h2>
                <p className="procurement-quotation-received-drawer-vendor">{selectedQuotation.vendor}</p>
              </div>
              <button className="procurement-quotation-received-drawer-close" onClick={() => setShowDetailDrawer(false)}>
                ✕
              </button>
            </div>

            <div className="procurement-quotation-received-drawer-content">
              {/* Status and Validity */}
              <div className="procurement-quotation-received-drawer-section">
                <div className="procurement-quotation-received-drawer-badges">
                  <span className={`procurement-quotation-received-badge ${getStatusBadgeClass(selectedQuotation.status)}`}>
                    {selectedQuotation.status}
                  </span>
                  <span className="procurement-quotation-received-drawer-validity">
                    Valid Till: {formatDate(selectedQuotation.validTill)}
                  </span>
                </div>
              </div>

              {/* Vendor Information */}
              <div className="procurement-quotation-received-drawer-section">
                <h3>Vendor Information</h3>
                <div className="procurement-quotation-received-info-grid">
                  <div className="procurement-quotation-received-info-item">
                    <label>Rating:</label>
                    <span className="procurement-quotation-received-vendor-rating">
                      <Star size={16} fill="#f59e0b" stroke="#f59e0b" /> {selectedQuotation.vendorRating}/5
                    </span>
                  </div>
                  <div className="procurement-quotation-received-info-item">
                    <label>Contact:</label>
                    <span>{selectedQuotation.vendorContact}</span>
                  </div>
                  <div className="procurement-quotation-received-info-item">
                    <label>Delivery Time:</label>
                    <span>{selectedQuotation.deliveryTime}</span>
                  </div>
                  <div className="procurement-quotation-received-info-item">
                    <label>Payment Terms:</label>
                    <span>{selectedQuotation.paymentTerms}</span>
                  </div>
                  <div className="procurement-quotation-received-info-item">
                    <label>Warranty:</label>
                    <span>{selectedQuotation.warranty}</span>
                  </div>
                  <div className="procurement-quotation-received-info-item">
                    <label>Linked RFQ:</label>
                    <span className="procurement-quotation-received-link">{selectedQuotation.rfqId}</span>
                  </div>
                </div>
              </div>

              {/* Line Items */}
              <div className="procurement-quotation-received-drawer-section">
                <h3>Itemized Quotation</h3>
                <table className="procurement-quotation-received-items-table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Description</th>
                      <th>Qty</th>
                      <th>Unit Price</th>
                      <th>Tax %</th>
                      <th>Line Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedQuotation.items.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.qty}</td>
                        <td>{formatCurrency(item.unitPrice)}</td>
                        <td>{item.tax}%</td>
                        <td>{formatCurrency(item.lineTotal)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="5" className="procurement-quotation-received-items-total-label">
                        <strong>Total Quotation Value:</strong>
                      </td>
                      <td className="procurement-quotation-received-items-total-value">
                        <strong>{formatCurrency(selectedQuotation.quotationValue)}</strong>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Attachments */}
              <div className="procurement-quotation-received-drawer-section">
                <h3>Attachments</h3>
                <div className="procurement-quotation-received-attachments">
                  {selectedQuotation.attachments.map((file, idx) => (
                    <div key={idx} className="procurement-quotation-received-attachment-item">
                      📎 {file}
                      <button className="procurement-quotation-received-attachment-download">
                        <Download size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              {selectedQuotation.notes.length > 0 && (
                <div className="procurement-quotation-received-drawer-section">
                  <h3>Internal Notes</h3>
                  <div className="procurement-quotation-received-notes">
                    {selectedQuotation.notes.map((note, idx) => (
                      <div key={idx} className="procurement-quotation-received-note-item">
                        • {note}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="procurement-quotation-received-drawer-actions">
                {selectedQuotation.status === 'Approved' && (
                  <button
                    className="procurement-quotation-received-btn-primary"
                    onClick={() => {
                      handleCreatePO(selectedQuotation);
                      setShowDetailDrawer(false);
                    }}
                  >
                    Create Purchase Order
                  </button>
                )}
                {selectedQuotation.status !== 'Approved' && selectedQuotation.status !== 'Rejected' && selectedQuotation.status !== 'Expired' && (
                  <>
                    <button
                      className="procurement-quotation-received-btn-secondary"
                      onClick={() => {
                        handleShortlist(selectedQuotation.id);
                        setShowDetailDrawer(false);
                      }}
                    >
                      Shortlist
                    </button>
                    <button
                      className="procurement-quotation-received-btn-secondary"
                      onClick={() => {
                        handleApprove(selectedQuotation.id);
                        setShowDetailDrawer(false);
                      }}
                    >
                      Approve
                    </button>
                    <button
                      className="procurement-quotation-received-btn-danger"
                      onClick={() => {
                        handleReject(selectedQuotation.id);
                        setShowDetailDrawer(false);
                      }}
                    >
                      Reject
                    </button>
                  </>
                )}
                <button className="procurement-quotation-received-btn-secondary">Download PDF</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comparison Modal */}
      {showComparisonMode && (
        <div className="procurement-quotation-received-modal-overlay" onClick={() => setShowComparisonMode(false)}>
          <div className="procurement-quotation-received-comparison-modal" onClick={(e) => e.stopPropagation()}>
            <div className="procurement-quotation-received-modal-header">
              <h2>Compare Quotations</h2>
              <button className="procurement-quotation-received-modal-close" onClick={() => setShowComparisonMode(false)}>
                ✕
              </button>
            </div>
            <div className="procurement-quotation-received-comparison-content">
              <table className="procurement-quotation-received-comparison-table">
                <thead>
                  <tr>
                    <th>Criteria</th>
                    {selectedQuotations.map(qId => {
                      const q = quotations.find(quot => quot.id === qId);
                      return <th key={qId}>{q.vendor}</th>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Quotation ID</strong></td>
                    {selectedQuotations.map(qId => {
                      const q = quotations.find(quot => quot.id === qId);
                      return <td key={qId}>{q.id}</td>;
                    })}
                  </tr>
                  <tr>
                    <td><strong>Total Value</strong></td>
                    {selectedQuotations.map(qId => {
                      const q = quotations.find(quot => quot.id === qId);
                      const minValue = Math.min(...selectedQuotations.map(id => quotations.find(quot => quot.id === id).quotationValue));
                      return (
                        <td key={qId} className={q.quotationValue === minValue ? 'procurement-quotation-received-best-value' : ''}>
                          {formatCurrency(q.quotationValue)}
                          {q.quotationValue === minValue && ' 🏆'}
                        </td>
                      );
                    })}
                  </tr>
                  <tr>
                    <td><strong>Delivery Time</strong></td>
                    {selectedQuotations.map(qId => {
                      const q = quotations.find(quot => quot.id === qId);
                      return <td key={qId}>{q.deliveryTime}</td>;
                    })}
                  </tr>
                  <tr>
                    <td><strong>Payment Terms</strong></td>
                    {selectedQuotations.map(qId => {
                      const q = quotations.find(quot => quot.id === qId);
                      return <td key={qId}>{q.paymentTerms}</td>;
                    })}
                  </tr>
                  <tr>
                    <td><strong>Warranty</strong></td>
                    {selectedQuotations.map(qId => {
                      const q = quotations.find(quot => quot.id === qId);
                      return <td key={qId}>{q.warranty}</td>;
                    })}
                  </tr>
                  <tr>
                    <td><strong>Vendor Rating</strong></td>
                    {selectedQuotations.map(qId => {
                      const q = quotations.find(quot => quot.id === qId);
                      const maxRating = Math.max(...selectedQuotations.map(id => quotations.find(quot => quot.id === id).vendorRating));
                      return (
                        <td key={qId} className={q.vendorRating === maxRating ? 'procurement-quotation-received-best-value' : ''}>
                          <Star size={16} fill="#f59e0b" stroke="#f59e0b" /> {q.vendorRating}/5
                          {q.vendorRating === maxRating && ' 🏆'}
                        </td>
                      );
                    })}
                  </tr>
                  <tr>
                    <td><strong>Valid Till</strong></td>
                    {selectedQuotations.map(qId => {
                      const q = quotations.find(quot => quot.id === qId);
                      return <td key={qId}>{formatDate(q.validTill)}</td>;
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="procurement-quotation-received-modal-actions">
              <button className="procurement-quotation-received-btn-primary">Shortlist Selected</button>
              <button className="procurement-quotation-received-btn-primary">Approve Selected</button>
              <button className="procurement-quotation-received-btn-secondary" onClick={() => setShowComparisonMode(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create PO Modal */}
      {showCreatePOModal && poData && (
        <div className="procurement-quotation-received-modal-overlay" onClick={() => setShowCreatePOModal(false)}>
          <div className="procurement-quotation-received-po-modal" onClick={(e) => e.stopPropagation()}>
            <div className="procurement-quotation-received-modal-header">
              <h2>Create Purchase Order</h2>
              <button className="procurement-quotation-received-modal-close" onClick={() => setShowCreatePOModal(false)}>
                ✕
              </button>
            </div>
            <div className="procurement-quotation-received-po-form">
              <div className="procurement-quotation-received-form-group">
                <label>Vendor</label>
                <input type="text" value={poData.vendor} readOnly />
              </div>
              <div className="procurement-quotation-received-form-group">
                <label>Linked Quotation ID</label>
                <input type="text" value={poData.linkedQuotationId} readOnly />
              </div>
              <div className="procurement-quotation-received-form-group">
                <label>Delivery Date</label>
                <input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
              </div>
              <div className="procurement-quotation-received-form-group">
                <label>Payment Terms</label>
                <input type="text" defaultValue={poData.paymentTerms} />
              </div>
              <div className="procurement-quotation-received-form-group">
                <label>Delivery Terms</label>
                <input type="text" defaultValue={poData.deliveryTerms} />
              </div>
              <div className="procurement-quotation-received-form-group">
                <label>PO Value</label>
                <input type="text" value={formatCurrency(poData.subtotal)} readOnly />
              </div>
              <div className="procurement-quotation-received-form-group">
                <label>Notes</label>
                <textarea rows="3" placeholder="Add any special instructions..."></textarea>
              </div>
            </div>
            <div className="procurement-quotation-received-modal-actions">
              <button className="procurement-quotation-received-btn-primary" onClick={() => {
                alert('Purchase Order created successfully! Redirecting to PO page...');
                setShowCreatePOModal(false);
              }}>
                Create PO
              </button>
              <button className="procurement-quotation-received-btn-secondary">Save as Draft</button>
              <button className="procurement-quotation-received-btn-secondary" onClick={() => setShowCreatePOModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Quotation Modal */}
      {showUploadQuotationModal && quotationFormData && (
        <div className="procurement-quotation-received-modal-overlay" onClick={() => setShowUploadQuotationModal(false)}>
          <div className="procurement-quotation-received-upload-modal" onClick={(e) => e.stopPropagation()}>
            <div className="procurement-quotation-received-modal-header">
              <h2>Upload New Quotation</h2>
              <button className="procurement-quotation-received-modal-close" onClick={() => setShowUploadQuotationModal(false)}>
                ✕
              </button>
            </div>

            <div className="procurement-quotation-received-upload-form">
              {/* Basic Information */}
              <div className="procurement-quotation-received-form-section">
                <h3>Basic Information</h3>
                <div className="procurement-quotation-received-form-row">
                  <div className="procurement-quotation-received-form-group">
                    <label>RFQ ID *</label>
                    <input
                      type="text"
                      value={quotationFormData.rfqId}
                      onChange={(e) => setQuotationFormData({ ...quotationFormData, rfqId: e.target.value })}
                      placeholder="e.g., RFQ-2024-001"
                    />
                  </div>
                  <div className="procurement-quotation-received-form-group">
                    <label>Vendor Name *</label>
                    <input
                      type="text"
                      value={quotationFormData.vendor}
                      onChange={(e) => setQuotationFormData({ ...quotationFormData, vendor: e.target.value })}
                      placeholder="Enter vendor name"
                    />
                  </div>
                </div>

                <div className="procurement-quotation-received-form-row">
                  <div className="procurement-quotation-received-form-group">
                    <label>Category *</label>
                    <select
                      value={quotationFormData.category}
                      onChange={(e) => setQuotationFormData({ ...quotationFormData, category: e.target.value })}
                    >
                      <option value="IT Equipment">IT Equipment</option>
                      <option value="Office Furniture">Office Furniture</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Office Supplies">Office Supplies</option>
                      <option value="Construction">Construction</option>
                    </select>
                  </div>
                  <div className="procurement-quotation-received-form-group">
                    <label>Valid Till *</label>
                    <input
                      type="date"
                      value={quotationFormData.validTill}
                      onChange={(e) => setQuotationFormData({ ...quotationFormData, validTill: e.target.value })}
                    />
                  </div>
                </div>

                <div className="procurement-quotation-received-form-row">
                  <div className="procurement-quotation-received-form-group">
                    <label>Vendor Contact</label>
                    <input
                      type="text"
                      value={quotationFormData.vendorContact}
                      onChange={(e) => setQuotationFormData({ ...quotationFormData, vendorContact: e.target.value })}
                      placeholder="e.g., +91 98765 43210"
                    />
                  </div>
                  <div className="procurement-quotation-received-form-group">
                    <label>Vendor Rating</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      value={quotationFormData.vendorRating}
                      onChange={(e) => setQuotationFormData({ ...quotationFormData, vendorRating: parseFloat(e.target.value) })}
                    />
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="procurement-quotation-received-form-section">
                <h3>Terms & Conditions</h3>
                <div className="procurement-quotation-received-form-row">
                  <div className="procurement-quotation-received-form-group">
                    <label>Delivery Time</label>
                    <input
                      type="text"
                      value={quotationFormData.deliveryTime}
                      onChange={(e) => setQuotationFormData({ ...quotationFormData, deliveryTime: e.target.value })}
                      placeholder="e.g., 15 days"
                    />
                  </div>
                  <div className="procurement-quotation-received-form-group">
                    <label>Payment Terms</label>
                    <input
                      type="text"
                      value={quotationFormData.paymentTerms}
                      onChange={(e) => setQuotationFormData({ ...quotationFormData, paymentTerms: e.target.value })}
                      placeholder="e.g., 30 days net"
                    />
                  </div>
                </div>

                <div className="procurement-quotation-received-form-group">
                  <label>Warranty</label>
                  <input
                    type="text"
                    value={quotationFormData.warranty}
                    onChange={(e) => setQuotationFormData({ ...quotationFormData, warranty: e.target.value })}
                    placeholder="e.g., 3 years"
                  />
                </div>
              </div>

              {/* Line Items */}
              <div className="procurement-quotation-received-form-section">
                <div className="procurement-quotation-received-section-header">
                  <h3>Quotation Items *</h3>
                  <button className="procurement-quotation-received-btn-add-item" onClick={handleAddQuotationItem}>
                    + Add Item
                  </button>
                </div>
                <div className="procurement-quotation-received-items-form">
                  {quotationFormData.items.map((item, index) => (
                    <div key={index} className="procurement-quotation-received-item-row">
                      <input
                        type="text"
                        placeholder="Item name *"
                        value={item.name}
                        onChange={(e) => handleUpdateQuotationItem(index, 'name', e.target.value)}
                        style={{ flex: 2 }}
                      />
                      <input
                        type="text"
                        placeholder="Description"
                        value={item.description}
                        onChange={(e) => handleUpdateQuotationItem(index, 'description', e.target.value)}
                        style={{ flex: 2 }}
                      />
                      <input
                        type="number"
                        placeholder="Qty"
                        value={item.qty}
                        onChange={(e) => handleUpdateQuotationItem(index, 'qty', parseInt(e.target.value) || 1)}
                        style={{ width: '80px' }}
                      />
                      <input
                        type="number"
                        placeholder="Unit Price"
                        value={item.unitPrice}
                        onChange={(e) => handleUpdateQuotationItem(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                        style={{ width: '120px' }}
                      />
                      <input
                        type="number"
                        placeholder="Tax %"
                        value={item.tax}
                        onChange={(e) => handleUpdateQuotationItem(index, 'tax', parseFloat(e.target.value) || 0)}
                        style={{ width: '80px' }}
                      />
                      {quotationFormData.items.length > 1 && (
                        <button
                          className="procurement-quotation-received-btn-remove-item"
                          onClick={() => handleRemoveQuotationItem(index)}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Quotation Summary */}
                <div className="procurement-quotation-received-quote-summary">
                  <div className="procurement-quotation-received-summary-row">
                    <span>Subtotal:</span>
                    <span>{formatCurrency(calculateQuotationTotal().subtotal)}</span>
                  </div>
                  <div className="procurement-quotation-received-summary-row">
                    <span>Tax Amount:</span>
                    <span>{formatCurrency(calculateQuotationTotal().taxAmount)}</span>
                  </div>
                  <div className="procurement-quotation-received-summary-row procurement-quotation-received-summary-total">
                    <span><strong>Total Quotation Value:</strong></span>
                    <span><strong>{formatCurrency(calculateQuotationTotal().total)}</strong></span>
                  </div>
                </div>
              </div>

              {/* Upload Documents */}
              <div className="procurement-quotation-received-form-section">
                <h3>Upload Documents</h3>
                <div className="procurement-quotation-received-form-group">
                  <label>Quotation PDF / Supporting Documents</label>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                    className="procurement-quotation-received-file-input"
                  />
                  <p className="procurement-quotation-received-file-hint">
                    Accepted formats: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG
                  </p>
                </div>
              </div>

              {/* Notes */}
              <div className="procurement-quotation-received-form-section">
                <div className="procurement-quotation-received-form-group">
                  <label>Internal Notes</label>
                  <textarea
                    rows="3"
                    value={quotationFormData.notes}
                    onChange={(e) => setQuotationFormData({ ...quotationFormData, notes: e.target.value })}
                    placeholder="Add any internal notes or comments..."
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="procurement-quotation-received-modal-actions">
              <button className="procurement-quotation-received-btn-primary" onClick={handleSaveQuotation}>
                Upload Quotation
              </button>
              <button className="procurement-quotation-received-btn-secondary" onClick={() => setShowUploadQuotationModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuotationsReceived;