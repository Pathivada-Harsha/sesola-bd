import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Plus, X, Edit2, Eye, Check, XCircle, FileText, Upload, Calendar, DollarSign, TrendingUp, Clock, Package, CheckCircle, Truck, AlertCircle, ShoppingCart } from 'lucide-react';
import '../pages-css/PurchaseOrders.css';
import GroupProjectFilter from "./../components/Dropdowns/GroupProjectFilter.js";
import useGroupProjectFilters from "./../components/Dropdowns/useGroupProjectFilters.js";


const PurchaseOrders = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [selectedPOs, setSelectedPOs] = useState([]);
  const { groupName, projectId, updateFilters } = useGroupProjectFilters();  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    vendor: 'all',
    category: 'all',
    dateRange: 'all'
  });
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedPO, setSelectedPO] = useState(null);
  const [showCreateEditModal, setShowCreateEditModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(null);

  // Mock data with delivery tracking
  const mockPurchaseOrders = [
    {
      id: 'PO-2024-001',
      linkedQuotationId: 'QUO-2024-003',
      vendor: 'Digital Systems Corp',
      vendorRating: 4.8,
      vendorContact: '+91 98765 43212',
      vendorGST: 'GST29ABCDE1234F1Z5',
      poDate: '2024-12-07',
      deliveryDate: '2024-12-20',
      category: 'IT Equipment',
      items: [
        { name: 'Laptop Dell XPS 15', description: 'Intel i7, 16GB RAM, 512GB SSD', qty: 10, unitPrice: 82000, tax: 18, lineTotal: 967600, delivered: 10 },
        { name: 'Monitor 27" 4K', description: 'Dell UltraSharp', qty: 10, unitPrice: 30000, tax: 18, lineTotal: 354000, delivered: 10 }
      ],
      subtotal: 1120000,
      taxAmount: 201600,
      shippingCost: 0,
      totalValue: 1321600,
      orderStatus: 'Delivered',
      deliveryStatus: {
        totalItems: 20,
        deliveredItems: 20,
        pendingItems: 0
      },
      paymentStatus: 'Pending',
      paymentTerms: '30 days net',
      deliveryAddress: 'Building A, Tech Park, Bangalore - 560001',
      deliveryTerms: '12 days from order date',
      trackingNumber: 'TRK1234567890',
      assignedOfficer: 'Amit Patel',
      createdBy: 'Amit Patel',
      documents: ['po-001.pdf', 'quotation-003.pdf'],
      notes: ['Urgent delivery required', 'Contact vendor for confirmation'],
      timeline: [
        { status: 'Created', date: '2024-12-07', time: '10:30 AM', user: 'Amit Patel' },
        { status: 'Approved', date: '2024-12-07', time: '02:15 PM', user: 'Rajesh Kumar' },
        { status: 'Ordered', date: '2024-12-08', time: '09:00 AM', user: 'Amit Patel' },
        { status: 'Delivered', date: '2024-12-12', time: '03:00 PM', user: 'System' }
      ]
    },
    {
      id: 'PO-2024-002',
      linkedQuotationId: 'QUO-2024-002',
      vendor: 'Office Plus Solutions',
      vendorRating: 4.2,
      vendorContact: '+91 98765 43211',
      vendorGST: 'GST27FGHIJ5678K2M6',
      poDate: '2024-12-06',
      deliveryDate: '2024-12-16',
      category: 'Office Furniture',
      items: [
        { name: 'Executive Desk', description: 'Wooden, L-shaped', qty: 5, unitPrice: 25000, tax: 12, lineTotal: 140000, delivered: 3 },
        { name: 'Ergonomic Chair', description: 'Herman Miller Aeron', qty: 5, unitPrice: 45000, tax: 12, lineTotal: 252000, delivered: 3 }
      ],
      subtotal: 350000,
      taxAmount: 42000,
      shippingCost: 5000,
      totalValue: 397000,
      orderStatus: 'In-Transit',
      deliveryStatus: {
        totalItems: 10,
        deliveredItems: 6,
        pendingItems: 4
      },
      paymentStatus: 'Partial',
      paymentTerms: '45 days net',
      deliveryAddress: 'Office Complex B, Mumbai - 400001',
      deliveryTerms: '10 days from order date',
      trackingNumber: 'TRK9876543210',
      assignedOfficer: 'Priya Sharma',
      createdBy: 'Priya Sharma',
      documents: ['po-002.pdf'],
      notes: ['Install on delivery'],
      timeline: [
        { status: 'Created', date: '2024-12-06', time: '11:00 AM', user: 'Priya Sharma' },
        { status: 'Approved', date: '2024-12-06', time: '03:30 PM', user: 'Rajesh Kumar' },
        { status: 'Ordered', date: '2024-12-07', time: '10:00 AM', user: 'Priya Sharma' },
        { status: 'In-Transit', date: '2024-12-09', time: '02:00 PM', user: 'System' }
      ]
    },
    {
      id: 'PO-2024-003',
      linkedQuotationId: 'QUO-2024-006',
      vendor: 'Premium Electronics',
      vendorRating: 4.6,
      vendorContact: '+91 98765 43215',
      vendorGST: 'GST19KLMNO9012P3Q7',
      poDate: '2024-12-08',
      deliveryDate: '2024-12-22',
      category: 'IT Equipment',
      items: [
        { name: 'Network Switch 48-port', description: 'Cisco Catalyst', qty: 3, unitPrice: 125000, tax: 18, lineTotal: 442500, delivered: 0 },
        { name: 'UPS 10KVA', description: 'APC Smart-UPS', qty: 2, unitPrice: 85000, tax: 18, lineTotal: 200600, delivered: 0 }
      ],
      subtotal: 545000,
      taxAmount: 98100,
      shippingCost: 8000,
      totalValue: 651100,
      orderStatus: 'Approved',
      deliveryStatus: {
        totalItems: 5,
        deliveredItems: 0,
        pendingItems: 5
      },
      paymentStatus: 'Pending',
      paymentTerms: '45 days net',
      deliveryAddress: 'Data Center, Hyderabad - 500032',
      deliveryTerms: '14 days from order date',
      trackingNumber: '',
      assignedOfficer: 'Vikram Joshi',
      createdBy: 'Vikram Joshi',
      documents: ['po-003.pdf', 'quotation-006.pdf', 'technical-specs.pdf'],
      notes: ['Requires technical team on-site for installation'],
      timeline: [
        { status: 'Created', date: '2024-12-08', time: '09:15 AM', user: 'Vikram Joshi' },
        { status: 'Approved', date: '2024-12-08', time: '04:00 PM', user: 'Rajesh Kumar' }
      ]
    },
    {
      id: 'PO-2024-004',
      linkedQuotationId: null,
      vendor: 'Global Supplies Inc',
      vendorRating: 4.0,
      vendorContact: '+91 98765 43220',
      vendorGST: 'GST24RSTUV3456W4X8',
      poDate: '2024-12-05',
      deliveryDate: '2024-12-19',
      category: 'Office Supplies',
      items: [
        { name: 'Whiteboard Markers', description: 'Assorted colors', qty: 100, unitPrice: 80, tax: 18, lineTotal: 9440, delivered: 100 },
        { name: 'Staplers', description: 'Heavy duty', qty: 25, unitPrice: 350, tax: 18, lineTotal: 10325, delivered: 25 }
      ],
      subtotal: 16750,
      taxAmount: 3015,
      shippingCost: 500,
      totalValue: 20265,
      orderStatus: 'Delivered',
      deliveryStatus: {
        totalItems: 125,
        deliveredItems: 125,
        pendingItems: 0
      },
      paymentStatus: 'Paid',
      paymentTerms: '30 days net',
      deliveryAddress: 'Corporate Office, Delhi - 110001',
      deliveryTerms: '7 days from order date',
      trackingNumber: 'TRK5555666777',
      assignedOfficer: 'Meera Singh',
      createdBy: 'Meera Singh',
      documents: ['po-004.pdf'],
      notes: [],
      timeline: [
        { status: 'Created', date: '2024-12-05', time: '10:00 AM', user: 'Meera Singh' },
        { status: 'Approved', date: '2024-12-05', time: '11:30 AM', user: 'Rajesh Kumar' },
        { status: 'Ordered', date: '2024-12-05', time: '02:00 PM', user: 'Meera Singh' },
        { status: 'In-Transit', date: '2024-12-06', time: '10:00 AM', user: 'System' },
        { status: 'Delivered', date: '2024-12-10', time: '03:30 PM', user: 'System' }
      ]
    },
    {
      id: 'PO-2024-005',
      linkedQuotationId: null,
      vendor: 'Industrial Parts Co',
      vendorRating: 3.8,
      vendorContact: '+91 98765 43225',
      vendorGST: 'GST33YZABC7890D5E9',
      poDate: '2024-12-10',
      deliveryDate: '2024-12-30',
      category: 'Manufacturing',
      items: [
        { name: 'Motor Assembly', description: '5HP Industrial Motor', qty: 3, unitPrice: 45000, tax: 18, lineTotal: 159300, delivered: 0 }
      ],
      subtotal: 135000,
      taxAmount: 24300,
      shippingCost: 3000,
      totalValue: 162300,
      orderStatus: 'Draft',
      deliveryStatus: {
        totalItems: 3,
        deliveredItems: 0,
        pendingItems: 3
      },
      paymentStatus: 'Not Initiated',
      paymentTerms: '60 days net',
      deliveryAddress: 'Manufacturing Unit, Pune - 411001',
      deliveryTerms: '20 days from order date',
      trackingNumber: '',
      assignedOfficer: 'Suresh Reddy',
      createdBy: 'Suresh Reddy',
      documents: [],
      notes: ['Awaiting final approval from management'],
      timeline: [
        { status: 'Created', date: '2024-12-10', time: '11:00 AM', user: 'Suresh Reddy' }
      ]
    },
    {
      id: 'PO-2024-006',
      linkedQuotationId: 'QUO-2024-001',
      vendor: 'TechSupply Industries',
      vendorRating: 4.5,
      vendorContact: '+91 98765 43210',
      vendorGST: 'GST29FGHIJ1234K6L0',
      poDate: '2024-12-09',
      deliveryDate: '2024-12-24',
      category: 'IT Equipment',
      items: [
        { name: 'Laptop Dell XPS 15', description: 'Intel i7, 16GB RAM, 512GB SSD', qty: 10, unitPrice: 85000, tax: 18, lineTotal: 1003000, delivered: 0 },
        { name: 'Monitor 27" 4K', description: 'LG UltraFine Display', qty: 10, unitPrice: 32000, tax: 18, lineTotal: 377600, delivered: 0 }
      ],
      subtotal: 1170000,
      taxAmount: 210600,
      shippingCost: 0,
      totalValue: 1380600,
      orderStatus: 'Cancelled',
      deliveryStatus: {
        totalItems: 20,
        deliveredItems: 0,
        pendingItems: 0
      },
      paymentStatus: 'Not Initiated',
      paymentTerms: '30 days net',
      deliveryAddress: 'Building C, Tech Park, Bangalore - 560001',
      deliveryTerms: '15 days from order date',
      trackingNumber: '',
      assignedOfficer: 'Rajesh Kumar',
      createdBy: 'Rajesh Kumar',
      documents: ['po-006.pdf'],
      notes: ['Cancelled due to budget constraints'],
      timeline: [
        { status: 'Created', date: '2024-12-09', time: '09:00 AM', user: 'Rajesh Kumar' },
        { status: 'Cancelled', date: '2024-12-09', time: '04:00 PM', user: 'Rajesh Kumar' }
      ]
    }
  ];

  useEffect(() => {
    setPurchaseOrders(mockPurchaseOrders);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Calculate KPIs
  const kpis = {
    total: purchaseOrders.length,
    approved: purchaseOrders.filter(po => po.orderStatus === 'Approved').length,
    inTransit: purchaseOrders.filter(po => po.orderStatus === 'In-Transit').length,
    delivered: purchaseOrders.filter(po => po.orderStatus === 'Delivered').length,
    totalValue: purchaseOrders.reduce((sum, po) => sum + po.totalValue, 0),
    pendingBills: purchaseOrders.filter(po => po.orderStatus === 'Delivered' && po.paymentStatus !== 'Paid').length
  };

  // Filter purchase orders
  const filteredPOs = purchaseOrders.filter(po => {
    if (filters.search && !po.id.toLowerCase().includes(filters.search.toLowerCase()) &&
      !po.vendor.toLowerCase().includes(filters.search.toLowerCase()) &&
      (!po.linkedQuotationId || !po.linkedQuotationId.toLowerCase().includes(filters.search.toLowerCase()))) {
      return false;
    }
    if (filters.status !== 'all' && po.orderStatus !== filters.status) return false;
    if (filters.category !== 'all' && po.category !== filters.category) return false;
    return true;
  });

  // Handle checkbox selection
  const handleSelectPO = (poId) => {
    setSelectedPOs(prev =>
      prev.includes(poId)
        ? prev.filter(id => id !== poId)
        : [...prev, poId]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedPOs(filteredPOs.map(po => po.id));
    } else {
      setSelectedPOs([]);
    }
  };

  // View PO details
  const handleViewPO = (po) => {
    setSelectedPO(po);
    setShowDetailDrawer(true);
  };

  // Create new PO
  const handleCreatePO = () => {
    setEditMode(false);
    setFormData({
      vendor: '',
      linkedQuotationId: '',
      deliveryDate: '',
      paymentTerms: '',
      deliveryAddress: '',
      deliveryTerms: '',
      items: [{ name: '', description: '', qty: 1, unitPrice: 0, tax: 18 }],
      notes: ''
    });
    setShowCreateEditModal(true);
  };

  // Edit PO
  const handleEditPO = (po) => {
    setEditMode(true);
    setFormData({ ...po });
    setShowDetailDrawer(false);
    setShowCreateEditModal(true);
  };

  // Status update handlers
  const handleApprovePO = (poId) => {
    setPurchaseOrders(prev => prev.map(po =>
      po.id === poId ? { ...po, orderStatus: 'Approved' } : po
    ));
    alert(`Purchase Order ${poId} has been approved`);
  };

  const handleMarkDelivered = (poId) => {
    setPurchaseOrders(prev => prev.map(po =>
      po.id === poId ? { ...po, orderStatus: 'Delivered' } : po
    ));
    alert(`Purchase Order ${poId} marked as delivered`);
  };

  const handleCancelPO = (poId) => {
    if (window.confirm('Are you sure you want to cancel this purchase order?')) {
      setPurchaseOrders(prev => prev.map(po =>
        po.id === poId ? { ...po, orderStatus: 'Cancelled' } : po
      ));
      alert(`Purchase Order ${poId} has been cancelled`);
    }
  };

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    const statusClasses = {
      'Draft': 'procurement-purchase-orders-badge-draft',
      'Approved': 'procurement-purchase-orders-badge-approved',
      'Ordered': 'procurement-purchase-orders-badge-ordered',
      'In-Transit': 'procurement-purchase-orders-badge-transit',
      'Delivered': 'procurement-purchase-orders-badge-delivered',
      'Cancelled': 'procurement-purchase-orders-badge-cancelled'
    };
    return statusClasses[status] || '';
  };

  const getPaymentBadgeClass = (status) => {
    const statusClasses = {
      'Not Initiated': 'procurement-purchase-orders-payment-not-initiated',
      'Pending': 'procurement-purchase-orders-payment-pending',
      'Partial': 'procurement-purchase-orders-payment-partial',
      'Paid': 'procurement-purchase-orders-payment-paid'
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
        items: [...formData.items, { name: '', description: '', qty: 1, unitPrice: 0, tax: 18 }]
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

  // Save PO
  const handleSavePO = () => {
    if (!formData.vendor || formData.items.length === 0) {
      alert('Please fill in all required fields');
      return;
    }

    const subtotal = formData.items.reduce((sum, item) => sum + (item.qty * item.unitPrice), 0);
    const taxAmount = formData.items.reduce((sum, item) => {
      const lineSubtotal = item.qty * item.unitPrice;
      return sum + (lineSubtotal * item.tax / 100);
    }, 0);
    const totalValue = subtotal + taxAmount + (formData.shippingCost || 0);

    // Calculate delivery status
    const totalItems = formData.items.reduce((sum, item) => sum + item.qty, 0);
    const deliveredItems = formData.items.reduce((sum, item) => sum + (item.delivered || 0), 0);
    const pendingItems = totalItems - deliveredItems;

    if (editMode) {
      setPurchaseOrders(prev => prev.map(po =>
        po.id === formData.id ? {
          ...formData,
          subtotal,
          taxAmount,
          totalValue,
          items: formData.items.map(item => ({
            ...item,
            delivered: item.delivered || 0,
            lineTotal: item.qty * item.unitPrice * (1 + item.tax / 100)
          })),
          deliveryStatus: {
            totalItems,
            deliveredItems,
            pendingItems
          }
        } : po
      ));
      alert('Purchase Order updated successfully');
    } else {
      const newPO = {
        ...formData,
        id: `PO-2024-${String(purchaseOrders.length + 1).padStart(3, '0')}`,
        poDate: new Date().toISOString().split('T')[0],
        subtotal,
        taxAmount,
        shippingCost: 0,
        totalValue: subtotal + taxAmount,
        orderStatus: 'Draft',
        paymentStatus: 'Not Initiated',
        createdBy: 'Current User',
        assignedOfficer: formData.assignedOfficer || 'Current User',
        category: formData.category || 'General',
        documents: [],
        items: formData.items.map(item => ({
          ...item,
          delivered: 0,
          lineTotal: item.qty * item.unitPrice * (1 + item.tax / 100)
        })),
        deliveryStatus: {
          totalItems,
          deliveredItems: 0,
          pendingItems: totalItems
        },
        timeline: [
          { status: 'Created', date: new Date().toISOString().split('T')[0], time: new Date().toLocaleTimeString('en-IN'), user: 'Current User' }
        ]
      };
      setPurchaseOrders(prev => [...prev, newPO]);
      alert('Purchase Order created successfully');
    }
    setShowCreateEditModal(false);
  };

  return (
    <div className="procurement-purchase-orders-container">
      {/* Header */}
      <div className="procurement-purchase-orders-header">
        <div className="procurement-purchase-orders-breadcrumb">
          Dashboard &gt; Procurement &gt; Purchase Orders
        </div>
        <div className="page-header-with-filter">
          <h1 className="procurement-purchase-orders-title">
            Purchase Orders <span className="procurement-purchase-orders-count">({purchaseOrders.length})</span>
          </h1>
          <GroupProjectFilter
            groupValue={groupName}
            projectValue={projectId}
            onChange={updateFilters}
          />


        </div>
      </div>

      {/* Action Bar */}
      <div className="procurement-purchase-orders-action-bar">
        <div className="procurement-purchase-orders-search-filters">
          <input
            type="text"
            placeholder="Search by PO ID, Vendor, Item, RFQ ID, Quotation ID..."
            className="procurement-purchase-orders-search"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />

          <select
            className="procurement-purchase-orders-filter"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="all">All Status</option>
            <option value="Draft">Draft</option>
            <option value="Approved">Approved</option>
            <option value="Ordered">Ordered</option>
            <option value="In-Transit">In-Transit</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <select
            className="procurement-purchase-orders-filter"
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          >
            <option value="all">All Categories</option>
            <option value="IT Equipment">IT Equipment</option>
            <option value="Office Furniture">Office Furniture</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Office Supplies">Office Supplies</option>
          </select>
        </div>

        <div className="procurement-purchase-orders-actions">
          <button className="procurement-purchase-orders-btn-secondary">Import Excel/PDF</button>
          <button className="procurement-purchase-orders-btn-secondary">Export CSV</button>
          <button className="procurement-purchase-orders-btn-primary" onClick={handleCreatePO}>
            + Create Purchase Order
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="procurement-purchase-orders-kpi-grid">
        <div className="procurement-purchase-orders-kpi-card">
          <div className="procurement-purchase-orders-kpi-icon">📋</div>
          <div className="procurement-purchase-orders-kpi-content">
            <div className="procurement-purchase-orders-kpi-value">{kpis.total}</div>
            <div className="procurement-purchase-orders-kpi-label">Total POs</div>
          </div>
        </div>

        <div className="procurement-purchase-orders-kpi-card">
          <div className="procurement-purchase-orders-kpi-icon">
            <CheckCircle size={32} />
          </div>
          <div className="procurement-purchase-orders-kpi-content">
            <div className="procurement-purchase-orders-kpi-value">{kpis.approved}</div>
            <div className="procurement-purchase-orders-kpi-label">Approved POs</div>
          </div>
        </div>

        <div className="procurement-purchase-orders-kpi-card">
          <div className="procurement-purchase-orders-kpi-icon">
            <Truck size={32} />
          </div>
          <div className="procurement-purchase-orders-kpi-content">
            <div className="procurement-purchase-orders-kpi-value">{kpis.inTransit}</div>
            <div className="procurement-purchase-orders-kpi-label">In-Transit</div>
          </div>
        </div>

        <div className="procurement-purchase-orders-kpi-card">
          <div className="procurement-purchase-orders-kpi-icon">
            <Package size={32} />
          </div>
          <div className="procurement-purchase-orders-kpi-content">
            <div className="procurement-purchase-orders-kpi-value">{kpis.delivered}</div>
            <div className="procurement-purchase-orders-kpi-label">Delivered</div>
          </div>
        </div>

        <div className="procurement-purchase-orders-kpi-card">
          <div className="procurement-purchase-orders-kpi-icon">
            <DollarSign size={32} />
          </div>
          <div className="procurement-purchase-orders-kpi-content">
            <div className="procurement-purchase-orders-kpi-value">{formatCurrency(kpis.totalValue)}</div>
            <div className="procurement-purchase-orders-kpi-label">Total PO Value</div>
          </div>
        </div>

        <div className="procurement-purchase-orders-kpi-card">
          <div className="procurement-purchase-orders-kpi-icon">
            <AlertCircle size={32} />
          </div>
          <div className="procurement-purchase-orders-kpi-content">
            <div className="procurement-purchase-orders-kpi-value">{kpis.pendingBills}</div>
            <div className="procurement-purchase-orders-kpi-label">Pending Bills</div>
          </div>
        </div>
      </div>

      {/* Purchase Orders Table */}
      <div className="procurement-purchase-orders-table-container">
        <table className="procurement-purchase-orders-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedPOs.length === filteredPOs.length && filteredPOs.length > 0}
                />
              </th>
              <th>PO ID</th>
              <th>Vendor Name</th>
              <th>Linked Quotation</th>
              <th>PO Date</th>
              <th>Delivery Date</th>
              <th>Category</th>
              <th>Total Value</th>
              <th>Delivered</th>
              <th>Pending</th>
              <th>Order Status</th>
              <th>Payment Status</th>
              <th>Assigned Officer</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPOs.map(po => (
              <tr key={po.id} className="procurement-purchase-orders-table-row">
                <td>
                  <input
                    type="checkbox"
                    checked={selectedPOs.includes(po.id)}
                    onChange={() => handleSelectPO(po.id)}
                  />
                </td>
                <td className="procurement-purchase-orders-table-id">{po.id}</td>
                <td className="procurement-purchase-orders-table-vendor">{po.vendor}</td>
                <td>
                  {po.linkedQuotationId ? (
                    <span className="procurement-purchase-orders-link">{po.linkedQuotationId}</span>
                  ) : (
                    <span className="procurement-purchase-orders-no-link">—</span>
                  )}
                </td>
                <td>{formatDate(po.poDate)}</td>
                <td>{formatDate(po.deliveryDate)}</td>
                <td>{po.category}</td>
                <td className="procurement-purchase-orders-table-value">{formatCurrency(po.totalValue)}</td>
                <td className="procurement-purchase-orders-delivered">
                  <CheckCircle size={16} className="procurement-purchase-orders-delivered-icon" />
                  {po.deliveryStatus?.deliveredItems || 0}
                </td>
                <td className="procurement-purchase-orders-pending">
                  <Clock size={16} className="procurement-purchase-orders-pending-icon" />
                  {po.deliveryStatus?.pendingItems || 0}
                </td>
                <td>
                  <span className={`procurement-purchase-orders-badge ${getStatusBadgeClass(po.orderStatus)}`}>
                    {po.orderStatus}
                  </span>
                </td>
                <td>
                  <span className={`procurement-purchase-orders-badge ${getPaymentBadgeClass(po.paymentStatus)}`}>
                    {po.paymentStatus}
                  </span>
                </td>
                <td>{po.assignedOfficer}</td>
                <td>
                  <div className="procurement-purchase-orders-actions-cell">
                    <button
                      className="procurement-purchase-orders-action-btn"
                      onClick={() => handleViewPO(po)}
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                    {po.orderStatus !== 'Cancelled' && (
                      <button
                        className="procurement-purchase-orders-action-btn"
                        onClick={() => handleEditPO(po)}
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                    )}
                    {po.orderStatus === 'Draft' && (
                      <button
                        className="procurement-purchase-orders-action-btn"
                        onClick={() => handleApprovePO(po.id)}
                        title="Approve"
                      >
                        <Check size={16} />
                      </button>
                    )}
                    {(po.orderStatus === 'Ordered' || po.orderStatus === 'In-Transit') && (
                      <button
                        className="procurement-purchase-orders-action-btn"
                        onClick={() => handleMarkDelivered(po.id)}
                        title="Mark Delivered"
                      >
                        <Package size={16} />
                      </button>
                    )}
                    {po.orderStatus !== 'Delivered' && po.orderStatus !== 'Cancelled' && (
                      <button
                        className="procurement-purchase-orders-action-btn"
                        onClick={() => handleCancelPO(po.id)}
                        title="Cancel"
                      >
                        <XCircle size={16} />
                      </button>
                    )}
                    <button className="procurement-purchase-orders-action-btn" title="Download PDF">
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
      {showDetailDrawer && selectedPO && (
        <div className="procurement-purchase-orders-drawer-overlay" onClick={() => setShowDetailDrawer(false)}>
          <div className="procurement-purchase-orders-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="procurement-purchase-orders-drawer-header">
              <div>
                <h2>{selectedPO.id}</h2>
                <p className="procurement-purchase-orders-drawer-vendor">{selectedPO.vendor}</p>
              </div>
              <button className="procurement-purchase-orders-drawer-close" onClick={() => setShowDetailDrawer(false)}>
                ✕
              </button>
            </div>

            <div className="procurement-purchase-orders-drawer-content">
              {/* Status Badges */}
              <div className="procurement-purchase-orders-drawer-section">
                <div className="procurement-purchase-orders-drawer-badges">
                  <span className={`procurement-purchase-orders-badge ${getStatusBadgeClass(selectedPO.orderStatus)}`}>
                    {selectedPO.orderStatus}
                  </span>
                  <span className={`procurement-purchase-orders-badge ${getPaymentBadgeClass(selectedPO.paymentStatus)}`}>
                    {selectedPO.paymentStatus}
                  </span>
                </div>
              </div>

              {/* Vendor Information */}
              <div className="procurement-purchase-orders-drawer-section">
                <h3>Vendor Information</h3>
                <div className="procurement-purchase-orders-info-grid">
                  <div className="procurement-purchase-orders-info-item">
                    <label>Vendor Name:</label>
                    <span>{selectedPO.vendor}</span>
                  </div>
                  <div className="procurement-purchase-orders-info-item">
                    <label>Rating:</label>
                    <span>⭐ {selectedPO.vendorRating}/5</span>
                  </div>
                  <div className="procurement-purchase-orders-info-item">
                    <label>Contact:</label>
                    <span>{selectedPO.vendorContact}</span>
                  </div>
                  <div className="procurement-purchase-orders-info-item">
                    <label>GST:</label>
                    <span>{selectedPO.vendorGST}</span>
                  </div>
                </div>
              </div>

              {/* Linked Quotation */}
              {selectedPO.linkedQuotationId && (
                <div className="procurement-purchase-orders-drawer-section">
                  <h3>Linked Quotation</h3>
                  <div className="procurement-purchase-orders-linked-item">
                    <span className="procurement-purchase-orders-link">{selectedPO.linkedQuotationId}</span>
                    <button className="procurement-purchase-orders-btn-link">View Quotation</button>
                  </div>
                </div>
              )}

              {/* Line Items */}
              <div className="procurement-purchase-orders-drawer-section">
                <h3>Itemized Line Items</h3>
                <table className="procurement-purchase-orders-items-table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Description</th>
                      <th>Qty Ordered</th>
                      <th>Qty Delivered</th>
                      <th>Unit Price</th>
                      <th>Tax %</th>
                      <th>Line Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedPO.items.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.qty}</td>
                        <td>
                          <span className={`procurement-purchase-orders-item-delivery ${item.delivered === item.qty ? 'fully-delivered' : item.delivered > 0 ? 'partial-delivered' : 'not-delivered'}`}>
                            {item.delivered}/{item.qty}
                            {item.delivered === item.qty && <CheckCircle size={14} style={{ marginLeft: '4px', verticalAlign: 'middle' }} />}
                            {item.delivered > 0 && item.delivered < item.qty && <Clock size={14} style={{ marginLeft: '4px', verticalAlign: 'middle' }} />}
                          </span>
                        </td>
                        <td>{formatCurrency(item.unitPrice)}</td>
                        <td>{item.tax}%</td>
                        <td>{formatCurrency(item.lineTotal)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* PO Totals */}
              <div className="procurement-purchase-orders-drawer-section">
                <h3>PO Totals</h3>
                <div className="procurement-purchase-orders-totals">
                  <div className="procurement-purchase-orders-total-row">
                    <span>Subtotal:</span>
                    <span>{formatCurrency(selectedPO.subtotal)}</span>
                  </div>
                  <div className="procurement-purchase-orders-total-row">
                    <span>Tax Amount:</span>
                    <span>{formatCurrency(selectedPO.taxAmount)}</span>
                  </div>
                  <div className="procurement-purchase-orders-total-row">
                    <span>Shipping/Packaging:</span>
                    <span>{formatCurrency(selectedPO.shippingCost)}</span>
                  </div>
                  <div className="procurement-purchase-orders-total-row procurement-purchase-orders-grand-total">
                    <span><strong>Grand Total:</strong></span>
                    <span><strong>{formatCurrency(selectedPO.totalValue)}</strong></span>
                  </div>
                </div>
              </div>

              {/* Delivery Information */}
              <div className="procurement-purchase-orders-drawer-section">
                <h3>Delivery Information</h3>

                {/* Delivery Status Summary */}
                {selectedPO.deliveryStatus && (
                  <div className="procurement-purchase-orders-delivery-summary">
                    <div className="procurement-purchase-orders-delivery-stat">
                      <div className="procurement-purchase-orders-delivery-stat-icon procurement-purchase-orders-stat-total">
                        <Package size={24} />
                      </div>
                      <div className="procurement-purchase-orders-delivery-stat-content">
                        <div className="procurement-purchase-orders-delivery-stat-value">
                          {selectedPO.deliveryStatus.totalItems}
                        </div>
                        <div className="procurement-purchase-orders-delivery-stat-label">Total Items</div>
                      </div>
                    </div>

                    <div className="procurement-purchase-orders-delivery-stat">
                      <div className="procurement-purchase-orders-delivery-stat-icon procurement-purchase-orders-stat-delivered">
                        <CheckCircle size={24} />
                      </div>
                      <div className="procurement-purchase-orders-delivery-stat-content">
                        <div className="procurement-purchase-orders-delivery-stat-value">
                          {selectedPO.deliveryStatus.deliveredItems}
                        </div>
                        <div className="procurement-purchase-orders-delivery-stat-label">Delivered</div>
                      </div>
                    </div>

                    <div className="procurement-purchase-orders-delivery-stat">
                      <div className="procurement-purchase-orders-delivery-stat-icon procurement-purchase-orders-stat-pending">
                        <Clock size={24} />
                      </div>
                      <div className="procurement-purchase-orders-delivery-stat-content">
                        <div className="procurement-purchase-orders-delivery-stat-value">
                          {selectedPO.deliveryStatus.pendingItems}
                        </div>
                        <div className="procurement-purchase-orders-delivery-stat-label">Pending</div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="procurement-purchase-orders-delivery-progress">
                      <div className="procurement-purchase-orders-progress-bar">
                        <div
                          className="procurement-purchase-orders-progress-fill"
                          style={{
                            width: `${(selectedPO.deliveryStatus.deliveredItems / selectedPO.deliveryStatus.totalItems * 100)}%`
                          }}
                        ></div>
                      </div>
                      <div className="procurement-purchase-orders-progress-text">
                        {Math.round((selectedPO.deliveryStatus.deliveredItems / selectedPO.deliveryStatus.totalItems * 100))}% Complete
                      </div>
                    </div>
                  </div>
                )}

                <div className="procurement-purchase-orders-info-grid">
                  <div className="procurement-purchase-orders-info-item">
                    <label>Delivery Address:</label>
                    <span>{selectedPO.deliveryAddress}</span>
                  </div>
                  <div className="procurement-purchase-orders-info-item">
                    <label>Delivery Terms:</label>
                    <span>{selectedPO.deliveryTerms}</span>
                  </div>
                  <div className="procurement-purchase-orders-info-item">
                    <label>Expected Delivery:</label>
                    <span>{formatDate(selectedPO.deliveryDate)}</span>
                  </div>
                  {selectedPO.trackingNumber && (
                    <div className="procurement-purchase-orders-info-item">
                      <label>Tracking Number:</label>
                      <span className="procurement-purchase-orders-link">{selectedPO.trackingNumber}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Timeline */}
              <div className="procurement-purchase-orders-drawer-section">
                <h3>PO Activity Timeline</h3>
                <div className="procurement-purchase-orders-timeline">
                  {selectedPO.timeline.map((event, idx) => (
                    <div key={idx} className="procurement-purchase-orders-timeline-item">
                      <div className="procurement-purchase-orders-timeline-marker"></div>
                      <div className="procurement-purchase-orders-timeline-content">
                        <div className="procurement-purchase-orders-timeline-status">{event.status}</div>
                        <div className="procurement-purchase-orders-timeline-meta">
                          {formatDate(event.date)} • {event.time} • {event.user}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documents */}
              {selectedPO.documents.length > 0 && (
                <div className="procurement-purchase-orders-drawer-section">
                  <h3>Documents</h3>
                  <div className="procurement-purchase-orders-attachments">
                    {selectedPO.documents.map((file, idx) => (
                      <div key={idx} className="procurement-purchase-orders-attachment-item">
                        📎 {file}
                        <button className="procurement-purchase-orders-attachment-download">
                          <Download size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {selectedPO.notes.length > 0 && (
                <div className="procurement-purchase-orders-drawer-section">
                  <h3>Notes</h3>
                  <div className="procurement-purchase-orders-notes">
                    {selectedPO.notes.map((note, idx) => (
                      <div key={idx} className="procurement-purchase-orders-note-item">
                        • {note}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="procurement-purchase-orders-drawer-actions">
                {selectedPO.orderStatus === 'Draft' && (
                  <>
                    <button
                      className="procurement-purchase-orders-btn-secondary"
                      onClick={() => handleEditPO(selectedPO)}
                    >
                      Edit PO
                    </button>
                    <button
                      className="procurement-purchase-orders-btn-primary"
                      onClick={() => {
                        handleApprovePO(selectedPO.id);
                        setShowDetailDrawer(false);
                      }}
                    >
                      Approve PO
                    </button>
                  </>
                )}
                {(selectedPO.orderStatus === 'Ordered' || selectedPO.orderStatus === 'In-Transit') && (
                  <button
                    className="procurement-purchase-orders-btn-primary"
                    onClick={() => {
                      handleMarkDelivered(selectedPO.id);
                      setShowDetailDrawer(false);
                    }}
                  >
                    Mark as Delivered
                  </button>
                )}
                {selectedPO.orderStatus !== 'Delivered' && selectedPO.orderStatus !== 'Cancelled' && (
                  <button
                    className="procurement-purchase-orders-btn-danger"
                    onClick={() => {
                      handleCancelPO(selectedPO.id);
                      setShowDetailDrawer(false);
                    }}
                  >
                    Cancel PO
                  </button>
                )}
                <button className="procurement-purchase-orders-btn-secondary">Generate PDF</button>
                <button className="procurement-purchase-orders-btn-secondary">Add Note</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create/Edit PO Modal */}
      {showCreateEditModal && formData && (
        <div className="procurement-purchase-orders-modal-overlay" onClick={() => setShowCreateEditModal(false)}>
          <div className="procurement-purchase-orders-create-modal" onClick={(e) => e.stopPropagation()}>
            <div className="procurement-purchase-orders-modal-header">
              <h2>{editMode ? 'Edit Purchase Order' : 'Create Purchase Order'}</h2>
              <button className="procurement-purchase-orders-modal-close" onClick={() => setShowCreateEditModal(false)}>
                ✕
              </button>
            </div>

            <div className="procurement-purchase-orders-form">
              {editMode && (
                <div className="procurement-purchase-orders-form-row">
                  <div className="procurement-purchase-orders-form-group">
                    <label>PO ID</label>
                    <input
                      type="text"
                      value={formData.id}
                      disabled
                      style={{ backgroundColor: '#f3f4f6', cursor: 'not-allowed' }}
                    />
                  </div>
                  <div className="procurement-purchase-orders-form-group">
                    <label>PO Date</label>
                    <input
                      type="date"
                      value={formData.poDate}
                      disabled
                      style={{ backgroundColor: '#f3f4f6', cursor: 'not-allowed' }}
                    />
                  </div>
                </div>
              )}

              <div className="procurement-purchase-orders-form-row">
                <div className="procurement-purchase-orders-form-group">
                  <label>Vendor *</label>
                  <input
                    type="text"
                    value={formData.vendor}
                    onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
                    placeholder="Select or enter vendor name"
                  />
                </div>
                <div className="procurement-purchase-orders-form-group">
                  <label>Linked Quotation ID</label>
                  <input
                    type="text"
                    value={formData.linkedQuotationId || ''}
                    onChange={(e) => setFormData({ ...formData, linkedQuotationId: e.target.value })}
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div className="procurement-purchase-orders-form-row">
                <div className="procurement-purchase-orders-form-group">
                  <label>Category *</label>
                  <select
                    value={formData.category || ''}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="">Select Category</option>
                    <option value="IT Equipment">IT Equipment</option>
                    <option value="Office Supplies">Office Supplies</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Raw Materials">Raw Materials</option>
                    <option value="Services">Services</option>
                  </select>
                </div>
                <div className="procurement-purchase-orders-form-group">
                  <label>Assigned Officer</label>
                  <input
                    type="text"
                    value={formData.assignedOfficer || ''}
                    onChange={(e) => setFormData({ ...formData, assignedOfficer: e.target.value })}
                    placeholder="Assign to..."
                  />
                </div>
              </div>

              <div className="procurement-purchase-orders-form-row">
                <div className="procurement-purchase-orders-form-group">
                  <label>Delivery Date *</label>
                  <input
                    type="date"
                    value={formData.deliveryDate}
                    onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                  />
                </div>
                <div className="procurement-purchase-orders-form-group">
                  <label>Payment Terms</label>
                  <input
                    type="text"
                    value={formData.paymentTerms}
                    onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
                    placeholder="e.g., 30 days net"
                  />
                </div>
              </div>

              {editMode && (
                <div className="procurement-purchase-orders-form-row">
                  <div className="procurement-purchase-orders-form-group">
                    <label>Order Status</label>
                    <select
                      value={formData.orderStatus}
                      onChange={(e) => setFormData({ ...formData, orderStatus: e.target.value })}
                    >
                      <option value="Draft">Draft</option>
                      <option value="Approved">Approved</option>
                      <option value="Ordered">Ordered</option>
                      <option value="In-Transit">In-Transit</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div className="procurement-purchase-orders-form-group">
                    <label>Payment Status</label>
                    <select
                      value={formData.paymentStatus}
                      onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value })}
                    >
                      <option value="Not Initiated">Not Initiated</option>
                      <option value="Pending">Pending</option>
                      <option value="Partial">Partial</option>
                      <option value="Paid">Paid</option>
                    </select>
                  </div>
                </div>
              )}

              {editMode && (
                <div className="procurement-purchase-orders-edit-delivery-summary">
                  <h4>Delivery Tracking Summary</h4>
                  <div className="procurement-purchase-orders-edit-delivery-stats">
                    <div className="procurement-purchase-orders-edit-stat">
                      <Package size={20} />
                      <div>
                        <div className="procurement-purchase-orders-edit-stat-value">
                          {formData.items.reduce((sum, item) => sum + item.qty, 0)}
                        </div>
                        <div className="procurement-purchase-orders-edit-stat-label">Total Items</div>
                      </div>
                    </div>
                    <div className="procurement-purchase-orders-edit-stat delivered">
                      <CheckCircle size={20} />
                      <div>
                        <div className="procurement-purchase-orders-edit-stat-value">
                          {formData.items.reduce((sum, item) => sum + (item.delivered || 0), 0)}
                        </div>
                        <div className="procurement-purchase-orders-edit-stat-label">Delivered</div>
                      </div>
                    </div>
                    <div className="procurement-purchase-orders-edit-stat pending">
                      <Clock size={20} />
                      <div>
                        <div className="procurement-purchase-orders-edit-stat-value">
                          {formData.items.reduce((sum, item) => sum + item.qty, 0) -
                            formData.items.reduce((sum, item) => sum + (item.delivered || 0), 0)}
                        </div>
                        <div className="procurement-purchase-orders-edit-stat-label">Pending</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="procurement-purchase-orders-form-group">
                <label>Delivery Address *</label>
                <input
                  type="text"
                  value={formData.deliveryAddress}
                  onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                  placeholder="Enter delivery address"
                />
              </div>

              <div className="procurement-purchase-orders-form-group">
                <label>Delivery Terms</label>
                <input
                  type="text"
                  value={formData.deliveryTerms}
                  onChange={(e) => setFormData({ ...formData, deliveryTerms: e.target.value })}
                  placeholder="e.g., 15 days from order date"
                />
              </div>

              {/* Items Section */}
              <div className="procurement-purchase-orders-form-section">
                <div className="procurement-purchase-orders-section-header">
                  <h3>Line Items</h3>
                  <button className="procurement-purchase-orders-btn-add-item" onClick={handleAddItem}>
                    + Add Item
                  </button>
                </div>
                <div className="procurement-purchase-orders-items-form">
                  <div className="procurement-purchase-orders-items-header">
                    <span style={{ flex: '2', minWidth: '150px' }}>Item Name</span>
                    <span style={{ flex: '2', minWidth: '150px' }}>Description</span>
                    <span style={{ width: '80px' }}>Qty Ordered</span>
                    {editMode && <span style={{ width: '80px' }}>Qty Delivered</span>}
                    <span style={{ width: '120px' }}>Unit Price</span>
                    <span style={{ width: '80px' }}>Tax %</span>
                    <span style={{ width: '40px' }}></span>
                  </div>
                  {formData.items.map((item, index) => (
                    <div key={index} className="procurement-purchase-orders-item-row">
                      <input
                        type="text"
                        placeholder="Item name"
                        value={item.name}
                        onChange={(e) => handleUpdateItem(index, 'name', e.target.value)}
                        style={{ flex: '2', minWidth: '150px' }}
                      />
                      <input
                        type="text"
                        placeholder="Description"
                        value={item.description}
                        onChange={(e) => handleUpdateItem(index, 'description', e.target.value)}
                        style={{ flex: '2', minWidth: '150px' }}
                      />
                      <input
                        type="number"
                        placeholder="Qty"
                        value={item.qty}
                        onChange={(e) => handleUpdateItem(index, 'qty', parseInt(e.target.value) || 1)}
                        style={{ width: '80px' }}
                      />
                      {editMode && (
                        <input
                          type="number"
                          placeholder="Delivered"
                          value={item.delivered || 0}
                          onChange={(e) => {
                            const deliveredValue = parseInt(e.target.value) || 0;
                            const maxDelivered = item.qty;
                            handleUpdateItem(index, 'delivered', Math.min(deliveredValue, maxDelivered));
                          }}
                          style={{ width: '80px' }}
                          min="0"
                          max={item.qty}
                        />
                      )}
                      <input
                        type="number"
                        placeholder="Unit Price"
                        value={item.unitPrice}
                        onChange={(e) => handleUpdateItem(index, 'unitPrice', parseFloat(e.target.value) || 0)}
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
                          className="procurement-purchase-orders-btn-remove-item"
                          onClick={() => handleRemoveItem(index)}
                          style={{ width: '40px' }}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="procurement-purchase-orders-form-group">
                <label>Notes</label>
                <textarea
                  rows="3"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Add any special instructions or notes..."
                ></textarea>
              </div>
            </div>

            <div className="procurement-purchase-orders-modal-actions">
              <button className="procurement-purchase-orders-btn-primary" onClick={handleSavePO}>
                {editMode ? 'Update PO' : 'Create PO'}
              </button>
              <button className="procurement-purchase-orders-btn-secondary">Save as Draft</button>
              <button className="procurement-purchase-orders-btn-secondary" onClick={() => setShowCreateEditModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseOrders;