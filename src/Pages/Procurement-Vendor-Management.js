import React, { useState } from 'react';
import '../pages-css/Procurement-Vendor-Management.css';

import GroupProjectFilter from "./../components/Dropdowns/GroupProjectFilter.js";
import useGroupProjectFilters from "./../components/Dropdowns/useGroupProjectFilters.js";
const ProcurementManagement = () => {
  const [activeView, setActiveView] = useState('list');
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [vendorTypeFilter, setVendorTypeFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { groupName, subGroupName, projectId, updateFilters } = useGroupProjectFilters();

  const vendors = [
    {
      id: 1,
      name: 'SunPower Industries',
      category: 'Solar Modules',
      contactPerson: 'Rajesh Kumar',
      email: 'rajesh@sunpower.com',
      phone: '+91 98765 43210',
      rating: 4.5,
      lastPurchase: '₹12,50,000',
      status: 'Active',
      address: 'Plot 45, Industrial Area, Hyderabad',
      gst: '29ABCDE1234F1Z5',
      vendorType: 'Manufacturer',
      quotations: [
        { fileName: 'Solar_Panel_Q1_2024.pdf', price: '₹285/Wp', validity: '2024-12-31', uploadedOn: '2024-11-15', uploadedBy: 'Admin' },
        { fileName: 'Inverter_Quote.xlsx', price: '₹45,000', validity: '2024-12-15', uploadedOn: '2024-11-10', uploadedBy: 'Procurement Team' }
      ],
      purchases: [
        { id: 'PO-2024-001', item: 'Solar Panel 540W', qty: 100, rate: 285, total: 28500, date: '2024-11-20', status: 'Delivered' },
        { id: 'PO-2024-002', item: 'Junction Box', qty: 500, rate: 45, total: 22500, date: '2024-11-18', status: 'Ordered' }
      ]
    },
    {
      id: 2,
      name: 'BatteryTech Solutions',
      category: 'Batteries',
      contactPerson: 'Priya Sharma',
      email: 'priya@batterytech.com',
      phone: '+91 98765 43211',
      rating: 4.8,
      lastPurchase: '₹8,75,000',
      status: 'Active',
      address: '12/A, Electronics City, Bangalore',
      gst: '29FGHIJ5678K2L6',
      vendorType: 'Distributor',
      quotations: [
        { fileName: 'Lithium_Battery_Quote.pdf', price: '₹18,500/unit', validity: '2024-12-20', uploadedOn: '2024-11-12', uploadedBy: 'Admin' }
      ],
      purchases: [
        { id: 'PO-2024-003', item: 'Lithium Battery 150Ah', qty: 50, rate: 18500, total: 925000, date: '2024-11-15', status: 'Delivered' }
      ]
    },
    {
      id: 3,
      name: 'ElectroSupply Co',
      category: 'Electrical',
      contactPerson: 'Amit Patel',
      email: 'amit@electrosupply.com',
      phone: '+91 98765 43212',
      rating: 4.2,
      lastPurchase: '₹3,25,000',
      status: 'Active',
      address: 'Shop 78, Wholesale Market, Delhi',
      gst: '29KLMNO9012P3Q7',
      vendorType: 'Distributor',
      quotations: [],
      purchases: [
        { id: 'PO-2024-004', item: 'MC4 Connectors', qty: 1000, rate: 25, total: 25000, date: '2024-11-10', status: 'Delivered' }
      ]
    },
    {
      id: 4,
      name: 'Invertek Systems',
      category: 'Inverters',
      contactPerson: 'Sneha Reddy',
      email: 'sneha@invertek.com',
      phone: '+91 98765 43213',
      rating: 4.6,
      lastPurchase: '₹15,00,000',
      status: 'Active',
      address: '23, Tech Park, Pune',
      gst: '29RSTUV3456W4X8',
      vendorType: 'Manufacturer',
      quotations: [
        { fileName: 'Hybrid_Inverter_2024.pdf', price: '₹75,000', validity: '2025-01-15', uploadedOn: '2024-11-20', uploadedBy: 'Admin' }
      ],
      purchases: []
    },
    {
      id: 5,
      name: 'StructurePro Engineering',
      category: 'Structural',
      contactPerson: 'Vikram Singh',
      email: 'vikram@structurepro.com',
      phone: '+91 98765 43214',
      rating: 3.9,
      lastPurchase: '₹6,50,000',
      status: 'Inactive',
      address: 'Building 12, Industrial Estate, Mumbai',
      gst: '29YZABC7890D5E9',
      vendorType: 'Service Provider',
      quotations: [],
      purchases: [
        { id: 'PO-2024-005', item: 'Steel Structure', qty: 200, rate: 350, total: 70000, date: '2024-10-25', status: 'Delivered' }
      ]
    }
  ];

  const kpiData = [
    { title: 'Total Vendors', value: '247', icon: '🏢', color: '#2563eb' },
    { title: 'Approved Vendors', value: '198', icon: '✅', color: '#22c55e' },
    { title: 'Average Rating', value: '4.3/5', icon: '⭐', color: '#f59e0b' },
    { title: 'Total Purchase Value', value: '₹2.4Cr', icon: '💰', color: '#8b5cf6' },
    { title: 'Pending Quotations', value: '23', icon: '📋', color: '#ef4444' },
    { title: 'Last Updated', value: '2 hrs ago', icon: '🕒', color: '#06b6d4' }
  ];

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || vendor.category === categoryFilter;
    const matchesType = vendorTypeFilter === 'all' || vendor.vendorType === vendorTypeFilter;
    const matchesRating = ratingFilter === 'all' || Math.floor(vendor.rating) === parseInt(ratingFilter);

    return matchesSearch && matchesCategory && matchesType && matchesRating;
  });

  const handleViewVendor = (vendor) => {
    setSelectedVendor(vendor);
    setActiveView('vendorProfile');
  };

  const getRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    return '⭐'.repeat(fullStars) + (hasHalfStar ? '½' : '');
  };

  const handleSaveVendor = () => {
    alert('Vendor saved successfully!');
    setActiveView('list');
  };

  const handleSavePurchase = () => {
    alert('Purchase entry saved successfully!');
    setActiveView('list');
  };

  return (
    <div className="procurement-page">


      <div className="main-container">


        <main className="content-area">
          <div className="breadcrumb">Dashboard &gt; Procurement</div>
          <div className="page-header-with-filter">
            <h1 className="page-title">Procurement & Vendor Management</h1>

            <GroupProjectFilter
              groupValue={groupName}
              subGroupValue={subGroupName}
              projectValue={projectId}
              onChange={updateFilters}
            />
          </div>
          {activeView === 'list' && (
            <>
              <div className="action-bar">
                <div className="search-filters">
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search vendors, materials, quotations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />

                  <select className="filter-select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                    <option value="all">All Categories</option>
                    <option value="Solar Modules">Solar Modules</option>
                    <option value="Batteries">Batteries</option>
                    <option value="Inverters">Inverters</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Structural">Structural</option>
                  </select>

                  <select className="filter-select" value={vendorTypeFilter} onChange={(e) => setVendorTypeFilter(e.target.value)}>
                    <option value="all">All Types</option>
                    <option value="Manufacturer">Manufacturer</option>
                    <option value="Distributor">Distributor</option>
                    <option value="Service Provider">Service Provider</option>
                  </select>

                  <select className="filter-select" value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)}>
                    <option value="all">All Ratings</option>
                    <option value="5">5 Stars</option>
                    <option value="4">4+ Stars</option>
                    <option value="3">3+ Stars</option>
                  </select>
                </div>

                <div className="quick-actions">
                  <button className="btn btn-primary" onClick={() => setActiveView('addVendor')}>
                    ➕ Add Vendor
                  </button>
                  <button className="btn btn-secondary">
                    📤 Upload Quotation
                  </button>
                  <button className="btn btn-secondary" onClick={() => setActiveView('addPurchase')}>
                    🛍️ Add Purchase
                  </button>
                </div>
              </div>

              <div className="kpi-grid">
                {kpiData.map((kpi, index) => (
                  <div key={index} className="kpi-card" style={{ borderTopColor: kpi.color }}>
                    <div className="kpi-icon">{kpi.icon}</div>
                    <div className="kpi-content">
                      <h3 className="kpi-title">{kpi.title}</h3>
                      <div className="kpi-value">{kpi.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="table-card">
                <div className="table-header">
                  <h2>Vendor List</h2>
                  <span className="table-count">{filteredVendors.length} vendors found</span>
                </div>

                <div className="table-wrapper">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Vendor Name</th>
                        <th>Category</th>
                        <th>Contact Person</th>
                        <th>Email / Phone</th>
                        <th>Rating</th>
                        <th>Last Purchase</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredVendors.map((vendor) => (
                        <tr key={vendor.id}>
                          <td className="vendor-name">{vendor.name}</td>
                          <td>
                            <span className="category-badge">{vendor.category}</span>
                          </td>
                          <td>{vendor.contactPerson}</td>
                          <td className="contact-cell">
                            <div>{vendor.email}</div>
                            <div className="phone-text">{vendor.phone}</div>
                          </td>
                          <td>
                            <div className="rating-cell">
                              <span className="rating-stars">{getRatingStars(vendor.rating)}</span>
                              <span className="rating-value">{vendor.rating}</span>
                            </div>
                          </td>
                          <td className="purchase-value">{vendor.lastPurchase}</td>
                          <td>
                            <span className={`status-badge ${vendor.status.toLowerCase()}`}>
                              {vendor.status}
                            </span>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button className="btn-icon" onClick={() => handleViewVendor(vendor)} title="View">
                                👁️
                              </button>
                              <button className="btn-icon" title="Edit">✏️</button>
                              <button className="btn-icon" title="Upload">📤</button>
                              <button className="btn-icon delete" title="Delete">🗑️</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="table-footer">
                  <span>Showing 1-5 of {filteredVendors.length} vendors</span>
                  <div className="pagination">
                    <button className="page-btn">Previous</button>
                    <button className="page-btn active">1</button>
                    <button className="page-btn">2</button>
                    <button className="page-btn">3</button>
                    <button className="page-btn">Next</button>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeView === 'vendorProfile' && selectedVendor && (
            <div className="vendor-profile">
              <button className="btn-back" onClick={() => setActiveView('list')}>
                ← Back to List
              </button>

              <div className="profile-header">
                <div className="profile-info">
                  <h2>{selectedVendor.name}</h2>
                  <span className="vendor-type">{selectedVendor.vendorType}</span>
                  <div className="rating-display">
                    {getRatingStars(selectedVendor.rating)} {selectedVendor.rating}
                  </div>
                </div>
                <div className="profile-actions">
                  <button className="btn btn-secondary">✏️ Edit</button>
                  <button className="btn btn-primary">📤 Upload Quotation</button>
                </div>
              </div>

              <div className="profile-grid">
                <div className="profile-card">
                  <h3>Vendor Information</h3>
                  <div className="info-row">
                    <span className="info-label">Category:</span>
                    <span className="info-value">{selectedVendor.category}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Contact Person:</span>
                    <span className="info-value">{selectedVendor.contactPerson}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Email:</span>
                    <span className="info-value">{selectedVendor.email}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Phone:</span>
                    <span className="info-value">{selectedVendor.phone}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Address:</span>
                    <span className="info-value">{selectedVendor.address}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">GST No:</span>
                    <span className="info-value">{selectedVendor.gst}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Status:</span>
                    <span className={`status-badge ${selectedVendor.status.toLowerCase()}`}>
                      {selectedVendor.status}
                    </span>
                  </div>
                </div>

                <div className="profile-card">
                  <h3>Vendor Quotations</h3>
                  {selectedVendor.quotations.length > 0 ? (
                    <table className="mini-table">
                      <thead>
                        <tr>
                          <th>File Name</th>
                          <th>Price</th>
                          <th>Validity</th>
                          <th>Uploaded On</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedVendor.quotations.map((quote, index) => (
                          <tr key={index}>
                            <td>{quote.fileName}</td>
                            <td className="price-cell">{quote.price}</td>
                            <td>{quote.validity}</td>
                            <td>{quote.uploadedOn}</td>
                            <td>
                              <button className="btn-download">⬇️</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="empty-state">No quotations uploaded yet</p>
                  )}
                </div>
              </div>

              <div className="profile-card full-width">
                <h3>Purchase History</h3>
                {selectedVendor.purchases.length > 0 ? (
                  <table className="mini-table">
                    <thead>
                      <tr>
                        <th>Purchase ID</th>
                        <th>Material / Item</th>
                        <th>Qty</th>
                        <th>Rate</th>
                        <th>Total</th>
                        <th>Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedVendor.purchases.map((purchase, index) => (
                        <tr key={index}>
                          <td className="purchase-id">{purchase.id}</td>
                          <td>{purchase.item}</td>
                          <td>{purchase.qty}</td>
                          <td>₹{purchase.rate}</td>
                          <td className="price-cell">₹{purchase.total.toLocaleString()}</td>
                          <td>{purchase.date}</td>
                          <td>
                            <span className={`status-badge ${purchase.status.toLowerCase()}`}>
                              {purchase.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="empty-state">No purchase history available</p>
                )}
              </div>

              <div className="profile-card full-width">
                <h3>Analytics</h3>
                <div className="analytics-grid">
                  <div className="analytics-item">
                    <span className="analytics-label">Average Delivery Time</span>
                    <span className="analytics-value">5.2 days</span>
                  </div>
                  <div className="analytics-item">
                    <span className="analytics-label">Total Orders</span>
                    <span className="analytics-value">{selectedVendor.purchases.length}</span>
                  </div>
                  <div className="analytics-item">
                    <span className="analytics-label">On-Time Delivery</span>
                    <span className="analytics-value">92%</span>
                  </div>
                  <div className="analytics-item">
                    <span className="analytics-label">Price Competitiveness</span>
                    <span className="analytics-value">Excellent</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeView === 'addVendor' && (
            <div className="form-container">
              <button className="btn-back" onClick={() => setActiveView('list')}>
                ← Back to List
              </button>

              <div className="form-card">
                <h2>Add New Vendor</h2>
                <div className="vendor-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Vendor Name *</label>
                      <input type="text" placeholder="Enter vendor name" />
                    </div>
                    <div className="form-group">
                      <label>Category *</label>
                      <select>
                        <option>Select category</option>
                        <option>Solar Modules</option>
                        <option>Batteries</option>
                        <option>Inverters</option>
                        <option>Electrical</option>
                        <option>Structural</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Contact Person *</label>
                      <input type="text" placeholder="Enter contact person name" />
                    </div>
                    <div className="form-group">
                      <label>Vendor Type *</label>
                      <select>
                        <option>Select type</option>
                        <option>Manufacturer</option>
                        <option>Distributor</option>
                        <option>Service Provider</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Phone *</label>
                      <input type="tel" placeholder="+91 XXXXX XXXXX" />
                    </div>
                    <div className="form-group">
                      <label>Email *</label>
                      <input type="email" placeholder="vendor@example.com" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Address *</label>
                    <textarea rows="3" placeholder="Enter complete address"></textarea>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>GST No.</label>
                      <input type="text" placeholder="29ABCDE1234F1Z5" />
                    </div>
                    <div className="form-group">
                      <label>Rating</label>
                      <select>
                        <option>Select rating</option>
                        <option>5 - Excellent</option>
                        <option>4 - Good</option>
                        <option>3 - Average</option>
                        <option>2 - Below Average</option>
                        <option>1 - Poor</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Notes</label>
                    <textarea rows="3" placeholder="Additional notes about the vendor"></textarea>
                  </div>

                  <div className="form-group">
                    <label>Upload Documents</label>
                    <div className="file-upload">
                      <input type="file" id="vendor-docs" multiple />
                      <label htmlFor="vendor-docs" className="file-upload-label">
                        📎 Click to upload or drag & drop
                      </label>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="button" className="btn btn-secondary" onClick={() => setActiveView('list')}>
                      Cancel
                    </button>
                    <button type="button" className="btn btn-primary" onClick={handleSaveVendor}>
                      Save Vendor
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeView === 'addPurchase' && (
            <div className="form-container">
              <button className="btn-back" onClick={() => setActiveView('list')}>
                ← Back to List
              </button>

              <div className="form-card">
                <h2>Add Purchase Entry</h2>
                <div className="vendor-form">
                  <div className="form-group">
                    <label>Select Vendor *</label>
                    <select>
                      <option>Select vendor</option>
                      {vendors.map(v => (
                        <option key={v.id} value={v.id}>{v.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Material / Item Name *</label>
                      <input type="text" placeholder="Enter material or item name" />
                    </div>
                    <div className="form-group">
                      <label>Quantity *</label>
                      <input type="number" placeholder="Enter quantity" />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Unit Price (₹) *</label>
                      <input type="number" placeholder="Enter unit price" />
                    </div>
                    <div className="form-group">
                      <label>GST % *</label>
                      <select>
                        <option>Select GST</option>
                        <option>18%</option>
                        <option>12%</option>
                        <option>5%</option>
                        <option>0%</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Total Amount (Auto Calculated)</label>
                    <input type="text" value="₹0.00" readOnly className="readonly-input" />
                  </div>

                  <div className="form-group">
                    <label>Upload Purchase Order (Optional)</label>
                    <div className="file-upload">
                      <input type="file" id="purchase-order" />
                      <label htmlFor="purchase-order" className="file-upload-label">
                        📎 Click to upload PDF or image
                      </label>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Notes</label>
                    <textarea rows="3" placeholder="Additional notes about this purchase"></textarea>
                  </div>

                  <div className="form-actions">
                    <button type="button" className="btn btn-secondary" onClick={() => setActiveView('list')}>
                      Cancel
                    </button>
                    <button type="button" className="btn btn-primary" onClick={handleSavePurchase}>
                      Save Purchase Entry
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProcurementManagement;