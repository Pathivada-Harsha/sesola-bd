import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Plus, X, Edit2, Eye, Check, XCircle, FileText, Upload, Calendar, DollarSign, TrendingUp, Clock, Package, CheckCircle, CreditCard, Link as LinkIcon, Trash2, AlertCircle } from 'lucide-react';
import '../pages-css/Bills-Recieved.css';

const BillsReceived = () => {
  const [bills, setBills] = useState([]);
  const [selectedBills, setSelectedBills] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    paymentStatus: 'all',
    vendor: 'all',
    poId: 'all',
    dateRange: 'all'
  });
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [showCreateEditModal, setShowCreateEditModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);

  // Mock data
  const mockBills = [
    {
      id: 'BILL-2024-001',
      vendor: 'Digital Systems Corp',
      linkedPOId: 'PO-2024-001',
      linkedQuotationId: 'QUO-2024-003',
      billDate: '2024-12-11',
      dueDate: '2024-12-25',
      amount: 1321600,
      paidAmount: 0,
      balanceAmount: 1321600,
      paymentStatus: 'Pending',
      uploadedBy: 'Amit Patel',
      uploadedOn: '2024-12-11',
      items: [
        { name: 'Laptop Dell XPS 15', qty: 10, price: 82000, tax: 18, lineTotal: 967600 },
        { name: 'Monitor 27" 4K', qty: 10, price: 30000, tax: 18, lineTotal: 354000 }
      ],
      subtotal: 1120000,
      taxAmount: 201600,
      documents: ['bill-001.pdf', 'delivery-note.pdf'],
      paymentHistory: [],
      notes: ['Bill received for delivered items']
    },
    {
      id: 'BILL-2024-002',
      vendor: 'Office Plus Solutions',
      linkedPOId: 'PO-2024-002',
      linkedQuotationId: 'QUO-2024-002',
      billDate: '2024-12-10',
      dueDate: '2024-12-24',
      amount: 397000,
      paidAmount: 200000,
      balanceAmount: 197000,
      paymentStatus: 'Partially Paid',
      uploadedBy: 'Priya Sharma',
      uploadedOn: '2024-12-10',
      items: [
        { name: 'Executive Desk', qty: 5, price: 25000, tax: 12, lineTotal: 140000 },
        { name: 'Ergonomic Chair', qty: 5, price: 45000, tax: 12, lineTotal: 252000 }
      ],
      subtotal: 350000,
      taxAmount: 42000,
      documents: ['bill-002.pdf'],
      paymentHistory: [
        { date: '2024-12-10', mode: 'Bank Transfer', refNumber: 'TXN123456', amount: 200000, paidBy: 'Priya Sharma' }
      ],
      notes: []
    },
    {
      id: 'BILL-2024-003',
      vendor: 'Global Supplies Inc',
      linkedPOId: 'PO-2024-004',
      linkedQuotationId: null,
      billDate: '2024-12-10',
      dueDate: '2024-12-20',
      amount: 20265,
      paidAmount: 20265,
      balanceAmount: 0,
      paymentStatus: 'Paid',
      uploadedBy: 'Meera Singh',
      uploadedOn: '2024-12-10',
      items: [
        { name: 'Whiteboard Markers', qty: 100, price: 80, tax: 18, lineTotal: 9440 },
        { name: 'Staplers', qty: 25, price: 350, tax: 18, lineTotal: 10325 }
      ],
      subtotal: 16750,
      taxAmount: 3015,
      documents: ['bill-003.pdf', 'payment-receipt.pdf'],
      paymentHistory: [
        { date: '2024-12-11', mode: 'UPI', refNumber: 'UPI987654321', amount: 20265, paidBy: 'Meera Singh' }
      ],
      notes: ['Full payment completed']
    },
    {
      id: 'BILL-2024-004',
      vendor: 'Premium Electronics',
      linkedPOId: 'PO-2024-003',
      linkedQuotationId: 'QUO-2024-006',
      billDate: '2024-12-09',
      dueDate: '2024-12-23',
      amount: 651100,
      paidAmount: 0,
      balanceAmount: 651100,
      paymentStatus: 'Pending',
      uploadedBy: 'Vikram Joshi',
      uploadedOn: '2024-12-09',
      items: [
        { name: 'Network Switch 48-port', qty: 3, price: 125000, tax: 18, lineTotal: 442500 },
        { name: 'UPS 10KVA', qty: 2, price: 85000, tax: 18, lineTotal: 200600 }
      ],
      subtotal: 545000,
      taxAmount: 98100,
      documents: ['bill-004.pdf', 'warranty-certificate.pdf'],
      paymentHistory: [],
      notes: ['Awaiting payment approval']
    },
    {
      id: 'BILL-2024-005',
      vendor: 'TechSupply Industries',
      linkedPOId: 'PO-2024-007',
      linkedQuotationId: 'QUO-2024-001',
      billDate: '2024-12-08',
      dueDate: '2024-12-22',
      amount: 756000,
      paidAmount: 350000,
      balanceAmount: 406000,
      paymentStatus: 'Partially Paid',
      uploadedBy: 'Rajesh Kumar',
      uploadedOn: '2024-12-08',
      items: [
        { name: 'Server Hardware', qty: 2, price: 320000, tax: 18, lineTotal: 755200 }
      ],
      subtotal: 640000,
      taxAmount: 115200,
      documents: ['bill-005.pdf'],
      paymentHistory: [
        { date: '2024-12-09', mode: 'Cheque', refNumber: 'CHQ456789', amount: 350000, paidBy: 'Rajesh Kumar' }
      ],
      notes: ['Balance payment pending']
    },
    {
      id: 'BILL-2024-006',
      vendor: 'Industrial Parts Co',
      linkedPOId: 'PO-2024-008',
      linkedQuotationId: null,
      billDate: '2024-12-07',
      dueDate: '2024-12-30',
      amount: 162300,
      paidAmount: 162300,
      balanceAmount: 0,
      paymentStatus: 'Paid',
      uploadedBy: 'Suresh Reddy',
      uploadedOn: '2024-12-07',
      items: [
        { name: 'Motor Assembly', qty: 3, price: 45000, tax: 18, lineTotal: 159300 }
      ],
      subtotal: 135000,
      taxAmount: 24300,
      documents: ['bill-006.pdf', 'test-certificate.pdf'],
      paymentHistory: [
        { date: '2024-12-07', mode: 'NEFT', refNumber: 'NEFT123987', amount: 162300, paidBy: 'Suresh Reddy' }
      ],
      notes: ['Fully paid on delivery']
    }
  ];

  useEffect(() => {
    setBills(mockBills);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Calculate KPIs
  const kpis = {
    total: bills.length,
    outstanding: bills.reduce((sum, bill) => sum + bill.balanceAmount, 0),
    thisMonth: bills.filter(bill => {
      const billDate = new Date(bill.billDate);
      const now = new Date();
      return billDate.getMonth() === now.getMonth() && billDate.getFullYear() === now.getFullYear();
    }).length,
    paid: bills.filter(bill => bill.paymentStatus === 'Paid').length,
    linkedToPO: Math.round((bills.filter(bill => bill.linkedPOId).length / bills.length) * 100)
  };

  // Filter bills
  const filteredBills = bills.filter(bill => {
    if (filters.search && !bill.id.toLowerCase().includes(filters.search.toLowerCase()) &&
        !bill.vendor.toLowerCase().includes(filters.search.toLowerCase()) &&
        (!bill.linkedPOId || !bill.linkedPOId.toLowerCase().includes(filters.search.toLowerCase()))) {
      return false;
    }
    if (filters.paymentStatus !== 'all' && bill.paymentStatus !== filters.paymentStatus) return false;
    return true;
  });

  // Handle checkbox selection
  const handleSelectBill = (billId) => {
    setSelectedBills(prev =>
      prev.includes(billId)
        ? prev.filter(id => id !== billId)
        : [...prev, billId]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedBills(filteredBills.map(bill => bill.id));
    } else {
      setSelectedBills([]);
    }
  };

  // View bill details
  const handleViewBill = (bill) => {
    setSelectedBill(bill);
    setShowDetailDrawer(true);
  };

  // Create new bill
  const handleCreateBill = () => {
    setEditMode(false);
    setFormData({
      vendor: '',
      linkedPOId: '',
      billNumber: '',
      billDate: new Date().toISOString().split('T')[0],
      dueDate: '',
      items: [{ name: '', qty: 1, price: 0, tax: 18 }],
      notes: ''
    });
    setShowCreateEditModal(true);
  };

  // Edit bill
  const handleEditBill = (bill) => {
    setEditMode(true);
    setFormData({ ...bill });
    setShowDetailDrawer(false);
    setShowCreateEditModal(true);
  };

  // Delete bill
  const handleDeleteBill = (billId) => {
    if (window.confirm('Are you sure you want to delete this bill?')) {
      setBills(prev => prev.filter(bill => bill.id !== billId));
      alert(`Bill ${billId} has been deleted`);
    }
  };

  // Add payment
  const handleAddPayment = (bill) => {
    setSelectedBill(bill);
    setPaymentData({
      billId: bill.id,
      amount: '',
      mode: 'Bank Transfer',
      refNumber: '',
      date: new Date().toISOString().split('T')[0]
    });
    setShowPaymentModal(true);
  };

  // Save payment
  const handleSavePayment = () => {
    if (!paymentData.amount || !paymentData.refNumber) {
      alert('Please fill in all payment details');
      return;
    }

    const paymentAmount = parseFloat(paymentData.amount);
    if (paymentAmount <= 0 || paymentAmount > selectedBill.balanceAmount) {
      alert('Invalid payment amount');
      return;
    }

    setBills(prev => prev.map(bill => {
      if (bill.id === paymentData.billId) {
        const newPaidAmount = bill.paidAmount + paymentAmount;
        const newBalanceAmount = bill.amount - newPaidAmount;
        const newPaymentStatus = newBalanceAmount === 0 ? 'Paid' : 'Partially Paid';
        
        return {
          ...bill,
          paidAmount: newPaidAmount,
          balanceAmount: newBalanceAmount,
          paymentStatus: newPaymentStatus,
          paymentHistory: [
            ...bill.paymentHistory,
            {
              date: paymentData.date,
              mode: paymentData.mode,
              refNumber: paymentData.refNumber,
              amount: paymentAmount,
              paidBy: 'Current User'
            }
          ]
        };
      }
      return bill;
    }));

    alert('Payment added successfully');
    setShowPaymentModal(false);
    setShowDetailDrawer(false);
  };

  // Mark as paid
  const handleMarkPaid = (billId) => {
    setBills(prev => prev.map(bill =>
      bill.id === billId ? {
        ...bill,
        paidAmount: bill.amount,
        balanceAmount: 0,
        paymentStatus: 'Paid',
        paymentHistory: [
          ...bill.paymentHistory,
          {
            date: new Date().toISOString().split('T')[0],
            mode: 'Manual Entry',
            refNumber: 'MANUAL-' + Date.now(),
            amount: bill.balanceAmount,
            paidBy: 'Current User'
          }
        ]
      } : bill
    ));
    alert(`Bill ${billId} marked as paid`);
  };

  // Get payment status badge class
  const getPaymentBadgeClass = (status) => {
    const statusClasses = {
      'Pending': 'procurement-bills-received-badge-pending',
      'Partially Paid': 'procurement-bills-received-badge-partial',
      'Paid': 'procurement-bills-received-badge-paid'
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

  // Add item row
  const handleAddItem = () => {
    if (formData) {
      setFormData({
        ...formData,
        items: [...formData.items, { name: '', qty: 1, price: 0, tax: 18 }]
      });
    }
  };

  // Remove item row
  const handleRemoveItem = (index) => {
    if (formData && formData.items.length > 1) {
      const newItems = formData.items.filter((_, i) => i !== index);
      setFormData({ ...formData, items: newItems });
    }
  };

  // Update item
  const handleUpdateItem = (index, field, value) => {
    if (formData) {
      const newItems = [...formData.items];
      newItems[index] = { ...newItems[index], [field]: value };
      setFormData({ ...formData, items: newItems });
    }
  };

  // Save bill
  const handleSaveBill = () => {
    if (!formData.vendor || !formData.billDate || formData.items.length === 0) {
      alert('Please fill in all required fields');
      return;
    }

    const subtotal = formData.items.reduce((sum, item) => sum + (item.qty * item.price), 0);
    const taxAmount = formData.items.reduce((sum, item) => {
      const lineSubtotal = item.qty * item.price;
      return sum + (lineSubtotal * item.tax / 100);
    }, 0);
    const totalAmount = subtotal + taxAmount;

    if (editMode) {
      setBills(prev => prev.map(bill =>
        bill.id === formData.id ? {
          ...formData,
          subtotal,
          taxAmount,
          amount: totalAmount,
          balanceAmount: totalAmount - bill.paidAmount
        } : bill
      ));
      alert('Bill updated successfully');
    } else {
      const newBill = {
        ...formData,
        id: `BILL-2024-${String(bills.length + 1).padStart(3, '0')}`,
        subtotal,
        taxAmount,
        amount: totalAmount,
        paidAmount: 0,
        balanceAmount: totalAmount,
        paymentStatus: 'Pending',
        uploadedBy: 'Current User',
        uploadedOn: new Date().toISOString().split('T')[0],
        documents: [],
        paymentHistory: []
      };
      setBills(prev => [...prev, newBill]);
      alert('Bill created successfully');
    }
    setShowCreateEditModal(false);
  };

  return (
    <div className="procurement-bills-received-container">
      {/* Header */}
      <div className="procurement-bills-received-header">
        <div className="procurement-bills-received-breadcrumb">
          Dashboard &gt; Procurement &gt; Bills Received
        </div>
        <h1 className="procurement-bills-received-title">
          Bills Received <span className="procurement-bills-received-count">({bills.length})</span>
        </h1>
      </div>

      {/* Action Bar */}
      <div className="procurement-bills-received-action-bar">
        <div className="procurement-bills-received-search-filters">
          <input
            type="text"
            placeholder="Search by Bill ID, Vendor, PO ID, Amount..."
            className="procurement-bills-received-search"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
          
          <select
            className="procurement-bills-received-filter"
            value={filters.paymentStatus}
            onChange={(e) => setFilters({ ...filters, paymentStatus: e.target.value })}
          >
            <option value="all">All Payment Status</option>
            <option value="Pending">Pending</option>
            <option value="Partially Paid">Partially Paid</option>
            <option value="Paid">Paid</option>
          </select>
        </div>

        <div className="procurement-bills-received-actions">
          <button className="procurement-bills-received-btn-secondary">Export CSV</button>
          <button className="procurement-bills-received-btn-secondary">Export PDF</button>
          <button className="procurement-bills-received-btn-primary" onClick={handleCreateBill}>
            + Add New Bill
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="procurement-bills-received-kpi-grid">
        <div className="procurement-bills-received-kpi-card">
          <div className="procurement-bills-received-kpi-icon">
            <FileText size={32} />
          </div>
          <div className="procurement-bills-received-kpi-content">
            <div className="procurement-bills-received-kpi-value">{kpis.total}</div>
            <div className="procurement-bills-received-kpi-label">Total Bills</div>
          </div>
        </div>

        <div className="procurement-bills-received-kpi-card">
          <div className="procurement-bills-received-kpi-icon">
            <DollarSign size={32} />
          </div>
          <div className="procurement-bills-received-kpi-content">
            <div className="procurement-bills-received-kpi-value">{formatCurrency(kpis.outstanding)}</div>
            <div className="procurement-bills-received-kpi-label">Outstanding Amount</div>
          </div>
        </div>

        <div className="procurement-bills-received-kpi-card">
          <div className="procurement-bills-received-kpi-icon">
            <Calendar size={32} />
          </div>
          <div className="procurement-bills-received-kpi-content">
            <div className="procurement-bills-received-kpi-value">{kpis.thisMonth}</div>
            <div className="procurement-bills-received-kpi-label">Bills This Month</div>
          </div>
        </div>

        <div className="procurement-bills-received-kpi-card">
          <div className="procurement-bills-received-kpi-icon">
            <CheckCircle size={32} />
          </div>
          <div className="procurement-bills-received-kpi-content">
            <div className="procurement-bills-received-kpi-value">{kpis.paid}</div>
            <div className="procurement-bills-received-kpi-label">Fully Paid Bills</div>
          </div>
        </div>

        <div className="procurement-bills-received-kpi-card">
          <div className="procurement-bills-received-kpi-icon">
            <LinkIcon size={32} />
          </div>
          <div className="procurement-bills-received-kpi-content">
            <div className="procurement-bills-received-kpi-value">{kpis.linkedToPO}%</div>
            <div className="procurement-bills-received-kpi-label">Bills Linked to POs</div>
          </div>
        </div>
      </div>

      {/* Bills Table */}
      <div className="procurement-bills-received-table-container">
        <table className="procurement-bills-received-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedBills.length === filteredBills.length && filteredBills.length > 0}
                />
              </th>
              <th>Bill ID</th>
              <th>Vendor Name</th>
              <th>Linked PO</th>
              <th>Bill Date</th>
              <th>Due Date</th>
              <th>Amount</th>
              <th>Paid Amount</th>
              <th>Balance</th>
              <th>Payment Status</th>
              <th>Uploaded By</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBills.map(bill => (
              <tr key={bill.id} className="procurement-bills-received-table-row">
                <td>
                  <input
                    type="checkbox"
                    checked={selectedBills.includes(bill.id)}
                    onChange={() => handleSelectBill(bill.id)}
                  />
                </td>
                <td className="procurement-bills-received-table-id">{bill.id}</td>
                <td className="procurement-bills-received-table-vendor">{bill.vendor}</td>
                <td>
                  {bill.linkedPOId ? (
                    <span className="procurement-bills-received-link">{bill.linkedPOId}</span>
                  ) : (
                    <span className="procurement-bills-received-no-link">—</span>
                  )}
                </td>
                <td>{formatDate(bill.billDate)}</td>
                <td>{formatDate(bill.dueDate)}</td>
                <td className="procurement-bills-received-table-amount">{formatCurrency(bill.amount)}</td>
                <td className="procurement-bills-received-table-paid">{formatCurrency(bill.paidAmount)}</td>
                <td className="procurement-bills-received-table-balance">
                  {formatCurrency(bill.balanceAmount)}
                </td>
                <td>
                  <span className={`procurement-bills-received-badge ${getPaymentBadgeClass(bill.paymentStatus)}`}>
                    {bill.paymentStatus}
                  </span>
                </td>
                <td>{bill.uploadedBy}</td>
                <td>
                  <div className="procurement-bills-received-actions-cell">
                    <button
                      className="procurement-bills-received-action-btn"
                      onClick={() => handleViewBill(bill)}
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                    {bill.paymentStatus !== 'Paid' && (
                      <>
                        <button
                          className="procurement-bills-received-action-btn"
                          onClick={() => handleEditBill(bill)}
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          className="procurement-bills-received-action-btn"
                          onClick={() => handleAddPayment(bill)}
                          title="Add Payment"
                        >
                          <CreditCard size={16} />
                        </button>
                        <button
                          className="procurement-bills-received-action-btn"
                          onClick={() => handleMarkPaid(bill.id)}
                          title="Mark Paid"
                        >
                          <Check size={16} />
                        </button>
                      </>
                    )}
                    <button className="procurement-bills-received-action-btn" title="Download">
                      <Download size={16} />
                    </button>
                    <button
                      className="procurement-bills-received-action-btn"
                      onClick={() => handleDeleteBill(bill.id)}
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Drawer */}
      {showDetailDrawer && selectedBill && (
        <div className="procurement-bills-received-drawer-overlay" onClick={() => setShowDetailDrawer(false)}>
          <div className="procurement-bills-received-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="procurement-bills-received-drawer-header">
              <div>
                <h2>{selectedBill.id}</h2>
                <p className="procurement-bills-received-drawer-vendor">{selectedBill.vendor}</p>
              </div>
              <button className="procurement-bills-received-drawer-close" onClick={() => setShowDetailDrawer(false)}>
                ✕
              </button>
            </div>

            <div className="procurement-bills-received-drawer-content">
              {/* Status and Dates */}
              <div className="procurement-bills-received-drawer-section">
                <div className="procurement-bills-received-drawer-badges">
                  <span className={`procurement-bills-received-badge ${getPaymentBadgeClass(selectedBill.paymentStatus)}`}>
                    {selectedBill.paymentStatus}
                  </span>
                  <span className="procurement-bills-received-drawer-date">
                    Due: {formatDate(selectedBill.dueDate)}
                  </span>
                </div>
              </div>

              {/* Bill Overview */}
              <div className="procurement-bills-received-drawer-section">
                <h3>Bill Overview</h3>
                <div className="procurement-bills-received-info-grid">
                  <div className="procurement-bills-received-info-item">
                    <label>Bill Date:</label>
                    <span>{formatDate(selectedBill.billDate)}</span>
                  </div>
                  <div className="procurement-bills-received-info-item">
                    <label>Due Date:</label>
                    <span>{formatDate(selectedBill.dueDate)}</span>
                  </div>
                  <div className="procurement-bills-received-info-item">
                    <label>Total Amount:</label>
                    <span className="procurement-bills-received-amount-highlight">
                      {formatCurrency(selectedBill.amount)}
                    </span>
                  </div>
                  <div className="procurement-bills-received-info-item">
                    <label>Balance Due:</label>
                    <span className="procurement-bills-received-balance-highlight">
                      {formatCurrency(selectedBill.balanceAmount)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Linked PO and Quotation */}
              <div className="procurement-bills-received-drawer-section">
                <h3>Traceability</h3>
                <div className="procurement-bills-received-traceability">
                  {selectedBill.linkedQuotationId && (
                    <div className="procurement-bills-received-trace-item">
                      <span className="procurement-bills-received-trace-label">Quotation:</span>
                      <span className="procurement-bills-received-link">{selectedBill.linkedQuotationId}</span>
                      <button className="procurement-bills-received-btn-link">View</button>
                    </div>
                  )}
                  {selectedBill.linkedPOId && (
                    <div className="procurement-bills-received-trace-item">
                      <span className="procurement-bills-received-trace-label">Purchase Order:</span>
                      <span className="procurement-bills-received-link">{selectedBill.linkedPOId}</span>
                      <button className="procurement-bills-received-btn-link">View</button>
                    </div>
                  )}
                </div>
              </div>

              {/* Line Items */}
              <div className="procurement-bills-received-drawer-section">
                <h3>Bill Line Items</h3>
                <table className="procurement-bills-received-items-table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Qty</th>
                      <th>Price</th>
                      <th>Tax %</th>
                      <th>Line Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedBill.items.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.name}</td>
                        <td>{item.qty}</td>
                        <td>{formatCurrency(item.price)}</td>
                        <td>{item.tax}%</td>
                        <td>{formatCurrency(item.lineTotal)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Bill Totals */}
              <div className="procurement-bills-received-drawer-section">
                <h3>Bill Totals</h3>
                <div className="procurement-bills-received-totals">
                  <div className="procurement-bills-received-total-row">
                    <span>Subtotal:</span>
                    <span>{formatCurrency(selectedBill.subtotal)}</span>
                  </div>
                  <div className="procurement-bills-received-total-row">
                    <span>Tax Amount:</span>
                    <span>{formatCurrency(selectedBill.taxAmount)}</span>
                  </div>
                  <div className="procurement-bills-received-total-row procurement-bills-received-grand-total">
                    <span><strong>Total Payable:</strong></span>
                    <span><strong>{formatCurrency(selectedBill.amount)}</strong></span>
                  </div>
                </div>
              </div>

              {/* Payment Section */}
              <div className="procurement-bills-received-drawer-section">
                <h3>Payment Information</h3>
                <div className="procurement-bills-received-payment-summary">
                  <div className="procurement-bills-received-payment-stat">
                    <label>Total Paid:</label>
                    <span className="procurement-bills-received-paid-amount">
                      {formatCurrency(selectedBill.paidAmount)}
                    </span>
                  </div>
                  <div className="procurement-bills-received-payment-stat">
                    <label>Remaining Balance:</label>
                    <span className="procurement-bills-received-balance-amount">
                      {formatCurrency(selectedBill.balanceAmount)}
                    </span>
                  </div>
                </div>

                {selectedBill.paymentHistory.length > 0 && (
                  <>
                    <h4>Payment History</h4>
                    <table className="procurement-bills-received-payment-table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Mode</th>
                          <th>Reference No.</th>
                          <th>Amount</th>
                          <th>Paid By</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedBill.paymentHistory.map((payment, idx) => (
                          <tr key={idx}>
                            <td>{formatDate(payment.date)}</td>
                            <td>{payment.mode}</td>
                            <td>{payment.refNumber}</td>
                            <td>{formatCurrency(payment.amount)}</td>
                            <td>{payment.paidBy}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                )}
              </div>

              {/* Documents */}
              {selectedBill.documents.length > 0 && (
                <div className="procurement-bills-received-drawer-section">
                  <h3>Documents</h3>
                  <div className="procurement-bills-received-attachments">
                    {selectedBill.documents.map((file, idx) => (
                      <div key={idx} className="procurement-bills-received-attachment-item">
                        <FileText size={16} /> {file}
                        <button className="procurement-bills-received-attachment-download">
                          <Download size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {selectedBill.notes.length > 0 && (
                <div className="procurement-bills-received-drawer-section">
                  <h3>Notes</h3>
                  <div className="procurement-bills-received-notes">
                    {selectedBill.notes.map((note, idx) => (
                      <div key={idx} className="procurement-bills-received-note-item">
                        • {note}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="procurement-bills-received-drawer-actions">
                {selectedBill.paymentStatus !== 'Paid' && (
                  <>
                    <button
                      className="procurement-bills-received-btn-primary"
                      onClick={() => {
                        handleAddPayment(selectedBill);
                        setShowDetailDrawer(false);
                      }}
                    >
                      Add Payment
                    </button>
                    <button
                      className="procurement-bills-received-btn-secondary"
                      onClick={() => handleEditBill(selectedBill)}
                    >
                      Edit Bill
                    </button>
                    <button
                      className="procurement-bills-received-btn-secondary"
                      onClick={() => {
                        handleMarkPaid(selectedBill.id);
                        setShowDetailDrawer(false);
                      }}
                    >
                      Mark Fully Paid
                    </button>
                  </>
                )}
                <button className="procurement-bills-received-btn-secondary">Download PDF</button>
                <button className="procurement-bills-received-btn-secondary">Add Note</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create/Edit Bill Modal */}
      {showCreateEditModal && formData && (
        <div className="procurement-bills-received-modal-overlay" onClick={() => setShowCreateEditModal(false)}>
          <div className="procurement-bills-received-create-modal" onClick={(e) => e.stopPropagation()}>
            <div className="procurement-bills-received-modal-header">
              <h2>{editMode ? 'Edit Bill' : 'Add New Bill'}</h2>
              <button className="procurement-bills-received-modal-close" onClick={() => setShowCreateEditModal(false)}>
                ✕
              </button>
            </div>

            <div className="procurement-bills-received-form">
              <div className="procurement-bills-received-form-row">
                <div className="procurement-bills-received-form-group">
                  <label>Vendor *</label>
                  <input
                    type="text"
                    value={formData.vendor}
                    onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
                    placeholder="Select or enter vendor name"
                  />
                </div>
                <div className="procurement-bills-received-form-group">
                  <label>Linked PO ID</label>
                  <input
                    type="text"
                    value={formData.linkedPOId || ''}
                    onChange={(e) => setFormData({ ...formData, linkedPOId: e.target.value })}
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div className="procurement-bills-received-form-row">
                <div className="procurement-bills-received-form-group">
                  <label>Bill Date *</label>
                  <input
                    type="date"
                    value={formData.billDate}
                    onChange={(e) => setFormData({ ...formData, billDate: e.target.value })}
                  />
                </div>
                <div className="procurement-bills-received-form-group">
                  <label>Due Date *</label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  />
                </div>
              </div>

              {/* Items Section */}
              <div className="procurement-bills-received-form-section">
                <div className="procurement-bills-received-section-header">
                  <h3>Line Items</h3>
                  <button className="procurement-bills-received-btn-add-item" onClick={handleAddItem}>
                    + Add Item
                  </button>
                </div>
                <div className="procurement-bills-received-items-form">
                  {formData.items.map((item, index) => (
                    <div key={index} className="procurement-bills-received-item-row">
                      <input
                        type="text"
                        placeholder="Item name"
                        value={item.name}
                        onChange={(e) => handleUpdateItem(index, 'name', e.target.value)}
                      />
                      <input
                        type="number"
                        placeholder="Qty"
                        value={item.qty}
                        onChange={(e) => handleUpdateItem(index, 'qty', parseInt(e.target.value) || 1)}
                        style={{ width: '80px' }}
                      />
                      <input
                        type="number"
                        placeholder="Price"
                        value={item.price}
                        onChange={(e) => handleUpdateItem(index, 'price', parseFloat(e.target.value) || 0)}
                        style={{ width: '120px' }}
                      />
                      <input
                        type="number"
                        placeholder="Tax %"
                        value={item.tax}
                        onChange={(e) => handleUpdateItem(index, 'tax', parseFloat(e.target.value) || 0)}
                        style={{ width: '80px' }}
                      />
                      {formData.items.length > 1 && (
                        <button
                          className="procurement-bills-received-btn-remove-item"
                          onClick={() => handleRemoveItem(index)}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="procurement-bills-received-form-group">
                <label>Notes</label>
                <textarea
                  rows="3"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Add any notes..."
                ></textarea>
              </div>
            </div>

            <div className="procurement-bills-received-modal-actions">
              <button className="procurement-bills-received-btn-primary" onClick={handleSaveBill}>
                {editMode ? 'Update Bill' : 'Save Bill'}
              </button>
              <button className="procurement-bills-received-btn-secondary" onClick={() => setShowCreateEditModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && paymentData && (
        <div className="procurement-bills-received-modal-overlay" onClick={() => setShowPaymentModal(false)}>
          <div className="procurement-bills-received-payment-modal" onClick={(e) => e.stopPropagation()}>
            <div className="procurement-bills-received-modal-header">
              <h2>Add Payment</h2>
              <button className="procurement-bills-received-modal-close" onClick={() => setShowPaymentModal(false)}>
                ✕
              </button>
            </div>

            <div className="procurement-bills-received-form">
              <div className="procurement-bills-received-payment-info">
                <div className="procurement-bills-received-info-item">
                  <label>Bill ID:</label>
                  <span>{selectedBill.id}</span>
                </div>
                <div className="procurement-bills-received-info-item">
                  <label>Total Balance Due:</label>
                  <span className="procurement-bills-received-balance-highlight">
                    {formatCurrency(selectedBill.balanceAmount)}
                  </span>
                </div>
              </div>

              <div className="procurement-bills-received-form-group">
                <label>Payment Amount *</label>
                <input
                  type="number"
                  value={paymentData.amount}
                  onChange={(e) => setPaymentData({ ...paymentData, amount: e.target.value })}
                  placeholder={`Max: ${selectedBill.balanceAmount}`}
                  max={selectedBill.balanceAmount}
                />
              </div>

              <div className="procurement-bills-received-form-row">
                <div className="procurement-bills-received-form-group">
                  <label>Payment Mode *</label>
                  <select
                    value={paymentData.mode}
                    onChange={(e) => setPaymentData({ ...paymentData, mode: e.target.value })}
                  >
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="UPI">UPI</option>
                    <option value="Cheque">Cheque</option>
                    <option value="NEFT">NEFT</option>
                    <option value="RTGS">RTGS</option>
                    <option value="Cash">Cash</option>
                  </select>
                </div>
                <div className="procurement-bills-received-form-group">
                  <label>Payment Date *</label>
                  <input
                    type="date"
                    value={paymentData.date}
                    onChange={(e) => setPaymentData({ ...paymentData, date: e.target.value })}
                  />
                </div>
              </div>

              <div className="procurement-bills-received-form-group">
                <label>Reference Number *</label>
                <input
                  type="text"
                  value={paymentData.refNumber}
                  onChange={(e) => setPaymentData({ ...paymentData, refNumber: e.target.value })}
                  placeholder="Transaction/Cheque/Reference Number"
                />
              </div>
            </div>

            <div className="procurement-bills-received-modal-actions">
              <button className="procurement-bills-received-btn-primary" onClick={handleSavePayment}>
                Record Payment
              </button>
              <button className="procurement-bills-received-btn-secondary" onClick={() => setShowPaymentModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillsReceived;