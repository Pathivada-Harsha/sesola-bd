import React, { useState } from 'react';
import '../pages-css/Sales-Customer.css';

const CustomerDatabase = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedRows, setSelectedRows] = useState([]);

  // Sample customer data
  const customers = [
    {
      id: 'CUST-001',
      name: 'Rajesh Kumar',
      company: 'Sunrise Solar Pvt Ltd',
      group: 'Solar',
      contactPerson: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      email: 'rajesh@sunrisesolar.com',
      city: 'Mumbai',
      state: 'Maharashtra',
      status: 'Active',
      createdOn: '2024-01-15',
      gst: '27AAAAA0000A1Z5',
      address: '123 Solar Street, Andheri',
      pincode: '400053',
      website: 'www.sunrisesolar.com',
      industry: 'Solar Energy',
      designation: 'Managing Director',
      annualBudget: '₹50L - ₹1Cr',
      procurementCycle: 'Quarterly',
      leadSource: 'Website',
      probability: 'Hot',
      notes: 'Looking for 500kW solar installation'
    },
    {
      id: 'CUST-002',
      name: 'Priya Sharma',
      company: 'TechVision EPC',
      group: 'EPC',
      contactPerson: 'Priya Sharma',
      phone: '+91 98234 56789',
      email: 'priya@techvisionepc.com',
      city: 'Bangalore',
      state: 'Karnataka',
      status: 'Active',
      createdOn: '2024-02-10',
      gst: '29BBBBB0000B1Z5',
      address: '456 Tech Park, Whitefield',
      pincode: '560066',
      website: 'www.techvisionepc.com',
      industry: 'Engineering',
      designation: 'Project Manager',
      annualBudget: '₹1Cr - ₹5Cr',
      procurementCycle: 'Monthly',
      leadSource: 'Referral',
      probability: 'Warm',
      notes: 'Interested in turnkey EPC projects'
    },
    {
      id: 'CUST-003',
      name: 'Amit Patel',
      company: 'SmartCity CCMS',
      group: 'CCMS',
      contactPerson: 'Amit Patel',
      phone: '+91 98111 22333',
      email: 'amit@smartcityccms.com',
      city: 'Ahmedabad',
      state: 'Gujarat',
      status: 'Prospect',
      createdOn: '2024-03-05',
      gst: '24CCCCC0000C1Z5',
      address: '789 Smart Avenue, Satellite',
      pincode: '380015',
      website: 'www.smartcityccms.com',
      industry: 'Smart Infrastructure',
      designation: 'Technical Head',
      annualBudget: '₹25L - ₹50L',
      procurementCycle: 'Yearly',
      leadSource: 'Marketing',
      probability: 'Warm',
      notes: 'Evaluating CCMS solutions for municipal project'
    },
    {
      id: 'CUST-004',
      name: 'Sneha Reddy',
      company: 'IoT Solutions India',
      group: 'IoT',
      contactPerson: 'Sneha Reddy',
      phone: '+91 98444 55666',
      email: 'sneha@iotsolutions.in',
      city: 'Hyderabad',
      state: 'Telangana',
      status: 'Active',
      createdOn: '2024-01-20',
      gst: '36DDDDD0000D1Z5',
      address: '321 IoT Hub, HITEC City',
      pincode: '500081',
      website: 'www.iotsolutions.in',
      industry: 'IoT & Automation',
      designation: 'CEO',
      annualBudget: '₹10L - ₹25L',
      procurementCycle: 'Monthly',
      leadSource: 'Walk-In',
      probability: 'Hot',
      notes: 'Regular IoT sensor procurement'
    },
    {
      id: 'CUST-005',
      name: 'Vikram Singh',
      company: 'Green Energy Corp',
      group: 'Solar',
      contactPerson: 'Vikram Singh',
      phone: '+91 98777 88999',
      email: 'vikram@greenenergy.com',
      city: 'Delhi',
      state: 'Delhi',
      status: 'Active',
      createdOn: '2024-02-15',
      gst: '07EEEEE0000E1Z5',
      address: '555 Green Plaza, Connaught Place',
      pincode: '110001',
      website: 'www.greenenergy.com',
      industry: 'Renewable Energy',
      designation: 'Director',
      annualBudget: '₹2Cr - ₹5Cr',
      procurementCycle: 'Quarterly',
      leadSource: 'Referral',
      probability: 'Hot',
      notes: 'Multiple solar projects in pipeline'
    },
    {
      id: 'CUST-006',
      name: 'Anjali Verma',
      company: 'PowerGrid EPC',
      group: 'EPC',
      contactPerson: 'Anjali Verma',
      phone: '+91 98555 44333',
      email: 'anjali@powergridepc.com',
      city: 'Pune',
      state: 'Maharashtra',
      status: 'Inactive',
      createdOn: '2023-11-10',
      gst: '27FFFFF0000F1Z5',
      address: '888 Power Complex, Hinjewadi',
      pincode: '411057',
      website: 'www.powergridepc.com',
      industry: 'Power Distribution',
      designation: 'VP Operations',
      annualBudget: '₹50L - ₹1Cr',
      procurementCycle: 'Yearly',
      leadSource: 'Marketing',
      probability: 'Cold',
      notes: 'On hold due to budget constraints'
    },
    {
      id: 'CUST-007',
      name: 'Karthik Menon',
      company: 'Urban CCMS Ltd',
      group: 'CCMS',
      contactPerson: 'Karthik Menon',
      phone: '+91 98666 77888',
      email: 'karthik@urbanccms.com',
      city: 'Chennai',
      state: 'Tamil Nadu',
      status: 'Active',
      createdOn: '2024-03-20',
      gst: '33GGGGG0000G1Z5',
      address: '999 Urban Tower, Anna Nagar',
      pincode: '600040',
      website: 'www.urbanccms.com',
      industry: 'Urban Development',
      designation: 'Senior Manager',
      annualBudget: '₹1Cr - ₹2Cr',
      procurementCycle: 'Quarterly',
      leadSource: 'Website',
      probability: 'Warm',
      notes: 'Exploring street light automation'
    },
    {
      id: 'CUST-008',
      name: 'Neha Agarwal',
      company: 'SmartTech IoT',
      group: 'IoT',
      contactPerson: 'Neha Agarwal',
      phone: '+91 98333 22111',
      email: 'neha@smarttechiot.com',
      city: 'Jaipur',
      state: 'Rajasthan',
      status: 'Prospect',
      createdOn: '2024-03-25',
      gst: '08HHHHH0000H1Z5',
      address: '222 Smart City, Malviya Nagar',
      pincode: '302017',
      website: 'www.smarttechiot.com',
      industry: 'Technology',
      designation: 'Founder',
      annualBudget: '₹5L - ₹10L',
      procurementCycle: 'Monthly',
      leadSource: 'Referral',
      probability: 'Warm',
      notes: 'Startup looking for IoT components'
    },
    {
      id: 'CUST-009',
      name: 'Rahul Desai',
      company: 'SolarMax Industries',
      group: 'Solar',
      contactPerson: 'Rahul Desai',
      phone: '+91 98222 11000',
      email: 'rahul@solarmax.in',
      city: 'Surat',
      state: 'Gujarat',
      status: 'Active',
      createdOn: '2024-02-28',
      gst: '24IIIII0000I1Z5',
      address: '777 Industrial Area, Udhna',
      pincode: '394210',
      website: 'www.solarmax.in',
      industry: 'Manufacturing',
      designation: 'Plant Manager',
      annualBudget: '₹1Cr - ₹5Cr',
      procurementCycle: 'Quarterly',
      leadSource: 'Marketing',
      probability: 'Hot',
      notes: 'Factory rooftop solar project'
    },
    {
      id: 'CUST-010',
      name: 'Pooja Khanna',
      company: 'Metro EPC Solutions',
      group: 'EPC',
      contactPerson: 'Pooja Khanna',
      phone: '+91 98999 88777',
      email: 'pooja@metroepc.com',
      city: 'Kolkata',
      state: 'West Bengal',
      status: 'Active',
      createdOn: '2024-01-30',
      gst: '19JJJJJ0000J1Z5',
      address: '444 Metro Plaza, Salt Lake',
      pincode: '700091',
      website: 'www.metroepc.com',
      industry: 'Infrastructure',
      designation: 'Business Head',
      annualBudget: '₹5Cr+',
      procurementCycle: 'Monthly',
      leadSource: 'Walk-In',
      probability: 'Hot',
      notes: 'Major infrastructure projects'
    }
  ];

  const kpiData = {
    totalCustomers: customers.length,
    newThisMonth: 3,
    activeProjects: 15,
    followUpsPending: 8,
    groupDistribution: {
      Solar: 30,
      EPC: 30,
      CCMS: 20,
      IoT: 20
    }
  };

  const activityTimeline = [
    { type: 'added', text: 'Customer profile created', date: '2024-03-25 10:30 AM' },
    { type: 'note', text: 'Initial discussion completed', date: '2024-03-26 02:15 PM' },
    { type: 'proposal', text: 'Proposal sent - Solar Project', date: '2024-03-28 11:00 AM' },
    { type: 'followup', text: 'Follow-up call scheduled', date: '2024-04-02 09:00 AM' },
    { type: 'document', text: 'KYC documents uploaded', date: '2024-04-05 03:30 PM' }
  ];

  const projectHistory = [
    { id: 'PROP-2401', type: 'Proposal', value: '₹45,00,000', date: '2024-03-15', status: 'Sent' },
    { id: 'QUO-2402', type: 'Quotation', value: '₹42,50,000', date: '2024-03-20', status: 'Approved' },
    { id: 'SO-2403', type: 'Sales Order', value: '₹42,50,000', date: '2024-03-25', status: 'In Progress' }
  ];

  const followUpHistory = [
    { date: '2024-04-02', summary: 'Discussed project timeline', assignee: 'Ravi Kumar', status: 'Completed' },
    { date: '2024-04-10', summary: 'Site visit scheduled', assignee: 'Priya Singh', status: 'Pending' },
    { date: '2024-04-15', summary: 'Budget approval follow-up', assignee: 'Amit Shah', status: 'Upcoming' }
  ];

  const documents = [
    { name: 'GST Certificate.pdf', type: 'KYC', date: '2024-03-20', size: '245 KB' },
    { name: 'Company Profile.pdf', type: 'Document', date: '2024-03-22', size: '1.2 MB' },
    { name: 'Site Photos.zip', type: 'Attachment', date: '2024-03-25', size: '5.8 MB' }
  ];

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);
    
    const matchesGroup = selectedGroup === 'all' || customer.group === selectedGroup;
    const matchesStatus = selectedStatus === 'all' || customer.status === selectedStatus;
    
    return matchesSearch && matchesGroup && matchesStatus;
  });

  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer);
    setIsDrawerOpen(true);
  };

  const handleSelectRow = (customerId) => {
    if (selectedRows.includes(customerId)) {
      setSelectedRows(selectedRows.filter(id => id !== customerId));
    } else {
      setSelectedRows([...selectedRows, customerId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedRows.length === filteredCustomers.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredCustomers.map(c => c.id));
    }
  };

  const getGroupColor = (group) => {
    const colors = {
      CCMS: 'blue',
      Solar: 'yellow',
      EPC: 'green',
      IoT: 'purple',
      Others: 'grey'
    };
    return colors[group] || 'grey';
  };

  const getStatusColor = (status) => {
    const colors = {
      Active: 'green',
      Inactive: 'grey',
      Prospect: 'orange',
      Lead: 'blue'
    };
    return colors[status] || 'grey';
  };

  return (
    <div className="sales-customer-page-container">
      {/* Breadcrumb */}
      <div className="sales-customer-page-breadcrumb">
        <span>Dashboard</span>
        <span className="sales-customer-page-breadcrumb-separator">›</span>
        <span className="sales-customer-page-breadcrumb-active">Customers</span>
      </div>

      {/* Header */}
      <div className="sales-customer-page-header">
        <h1 className="sales-customer-page-title">Customer / Client Database</h1>
        <div className="sales-customer-page-header-actions">
          <button className="sales-customer-page-btn-secondary">
            <span className="sales-customer-page-icon">📥</span>
            Import Data
          </button>
          <button className="sales-customer-page-btn-secondary">
            <span className="sales-customer-page-icon">📤</span>
            Export CSV
          </button>
          <button 
            className="sales-customer-page-btn-primary"
            onClick={() => setIsAddFormOpen(true)}
          >
            <span className="sales-customer-page-icon">➕</span>
            Add New Customer
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="sales-customer-page-kpi-grid">
        <div className="sales-customer-page-kpi-card">
          <div className="sales-customer-page-kpi-icon blue">👥</div>
          <div className="sales-customer-page-kpi-content">
            <div className="sales-customer-page-kpi-value">{kpiData.totalCustomers}</div>
            <div className="sales-customer-page-kpi-label">Total Customers</div>
          </div>
        </div>
        <div className="sales-customer-page-kpi-card">
          <div className="sales-customer-page-kpi-icon green">✨</div>
          <div className="sales-customer-page-kpi-content">
            <div className="sales-customer-page-kpi-value">{kpiData.newThisMonth}</div>
            <div className="sales-customer-page-kpi-label">New This Month</div>
          </div>
        </div>
        <div className="sales-customer-page-kpi-card">
          <div className="sales-customer-page-kpi-icon purple">📊</div>
          <div className="sales-customer-page-kpi-content">
            <div className="sales-customer-page-kpi-value">{kpiData.activeProjects}</div>
            <div className="sales-customer-page-kpi-label">Active Projects</div>
          </div>
        </div>
        <div className="sales-customer-page-kpi-card">
          <div className="sales-customer-page-kpi-icon orange">📞</div>
          <div className="sales-customer-page-kpi-content">
            <div className="sales-customer-page-kpi-value">{kpiData.followUpsPending}</div>
            <div className="sales-customer-page-kpi-label">Follow-Ups Pending</div>
          </div>
        </div>
        <div className="sales-customer-page-kpi-card wide">
          <div className="sales-customer-page-kpi-label">Customer Groups Distribution</div>
          <div className="sales-customer-page-distribution">
            {Object.entries(kpiData.groupDistribution).map(([group, percent]) => (
              <div key={group} className="sales-customer-page-distribution-item">
                <span className={`sales-customer-page-badge badge-${getGroupColor(group)}`}>
                  {group}
                </span>
                <span className="sales-customer-page-distribution-percent">{percent}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="sales-customer-page-filters-section">
        <div className="sales-customer-page-search-box">
          <span className="sales-customer-page-search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by name, company, phone, email, GST..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="sales-customer-page-search-input"
          />
        </div>
        <div className="sales-customer-page-filters">
          <select 
            className="sales-customer-page-filter-select"
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
          >
            <option value="all">All Groups</option>
            <option value="CCMS">CCMS</option>
            <option value="Solar">Solar</option>
            <option value="EPC">EPC</option>
            <option value="IoT">IoT</option>
            <option value="Others">Others</option>
          </select>
          <select 
            className="sales-customer-page-filter-select"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Prospect">Prospect</option>
            <option value="Lead">Lead</option>
          </select>
          <select className="sales-customer-page-filter-select">
            <option>All Locations</option>
            <option>Maharashtra</option>
            <option>Karnataka</option>
            <option>Gujarat</option>
          </select>
          {selectedRows.length > 0 && (
            <button className="sales-customer-page-btn-bulk">
              Bulk Actions ({selectedRows.length})
            </button>
          )}
        </div>
      </div>

      {/* Customer Table */}
      <div className="sales-customer-page-table-card">
        <div className="sales-customer-page-table-header">
          <h3>All Customers ({filteredCustomers.length})</h3>
          <div className="sales-customer-page-table-actions">
            <select className="sales-customer-page-page-size">
              <option>10 per page</option>
              <option>25 per page</option>
              <option>50 per page</option>
            </select>
          </div>
        </div>
        <div className="sales-customer-page-table-container">
          <table className="sales-customer-page-table">
            <thead>
              <tr>
                <th>
                  <input 
                    type="checkbox"
                    checked={selectedRows.length === filteredCustomers.length}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Customer ID</th>
                <th>Customer Name</th>
                <th>Company Name</th>
                <th>Group</th>
                <th>Contact Person</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Location</th>
                <th>Status</th>
                <th>Created On</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="sales-customer-page-table-row">
                  <td>
                    <input 
                      type="checkbox"
                      checked={selectedRows.includes(customer.id)}
                      onChange={() => handleSelectRow(customer.id)}
                    />
                  </td>
                  <td><strong>{customer.id}</strong></td>
                  <td>{customer.name}</td>
                  <td>{customer.company}</td>
                  <td>
                    <span className={`sales-customer-page-badge badge-${getGroupColor(customer.group)}`}>
                      {customer.group}
                    </span>
                  </td>
                  <td>{customer.contactPerson}</td>
                  <td>{customer.phone}</td>
                  <td className="sales-customer-page-email">{customer.email}</td>
                  <td>{customer.city}, {customer.state}</td>
                  <td>
                    <span className={`sales-customer-page-status status-${getStatusColor(customer.status)}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td>{customer.createdOn}</td>
                  <td>
                    <div className="sales-customer-page-action-buttons">
                      <button 
                        className="sales-customer-page-action-btn"
                        onClick={() => handleViewCustomer(customer)}
                        title="View Details"
                      >
                        👁️
                      </button>
                      <button className="sales-customer-page-action-btn" title="Edit">✏️</button>
                      <button className="sales-customer-page-action-btn" title="Follow-up">📞</button>
                      <button className="sales-customer-page-action-btn" title="Documents">📎</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="sales-customer-page-table-footer">
          <div className="sales-customer-page-pagination-info">
            Showing {filteredCustomers.length} of {customers.length} customers
          </div>
          <div className="sales-customer-page-pagination">
            <button className="sales-customer-page-pagination-btn">Previous</button>
            <button className="sales-customer-page-pagination-btn active">1</button>
            <button className="sales-customer-page-pagination-btn">2</button>
            <button className="sales-customer-page-pagination-btn">Next</button>
          </div>
        </div>
      </div>

      {/* Customer Details Drawer */}
      {isDrawerOpen && selectedCustomer && (
        <div className="sales-customer-page-drawer-overlay" onClick={() => setIsDrawerOpen(false)}>
          <div className="sales-customer-page-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="sales-customer-page-drawer-header">
              <div className="sales-customer-page-drawer-title-section">
                <h2>{selectedCustomer.name}</h2>
                <p className="sales-customer-page-drawer-company">{selectedCustomer.company}</p>
                <div className="sales-customer-page-drawer-badges">
                  <span className={`sales-customer-page-badge badge-${getGroupColor(selectedCustomer.group)}`}>
                    {selectedCustomer.group}
                  </span>
                  <span className={`sales-customer-page-status status-${getStatusColor(selectedCustomer.status)}`}>
                    {selectedCustomer.status}
                  </span>
                </div>
              </div>
              <div className="sales-customer-page-drawer-actions">
                <button className="sales-customer-page-drawer-btn">Edit Customer</button>
                <button className="sales-customer-page-drawer-btn">Add Follow-Up</button>
                <button className="sales-customer-page-drawer-btn">Export Profile</button>
                <button 
                  className="sales-customer-page-drawer-close"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="sales-customer-page-drawer-content">
              {/* Basic Information */}
              <div className="sales-customer-page-drawer-section">
                <h3 className="sales-customer-page-drawer-section-title">Basic Information</h3>
                <div className="sales-customer-page-info-grid">
                  <div className="sales-customer-page-info-item">
                    <label>Customer ID</label>
                    <span>{selectedCustomer.id}</span>
                  </div>
                  <div className="sales-customer-page-info-item">
                    <label>Contact Person</label>
                    <span>{selectedCustomer.contactPerson}</span>
                  </div>
                  <div className="sales-customer-page-info-item">
                    <label>Designation</label>
                    <span>{selectedCustomer.designation}</span>
                  </div>
                  <div className="sales-customer-page-info-item">
                    <label>Email</label>
                    <span>{selectedCustomer.email}</span>
                  </div>
                  <div className="sales-customer-page-info-item">
                    <label>Phone</label>
                    <span>{selectedCustomer.phone}</span>
                  </div>
                  <div className="sales-customer-page-info-item">
                    <label>GST Number</label>
                    <span>{selectedCustomer.gst}</span>
                  </div>
                  <div className="sales-customer-page-info-item full-width">
                    <label>Address</label>
                    <span>{selectedCustomer.address}, {selectedCustomer.city}, {selectedCustomer.state} - {selectedCustomer.pincode}</span>
                  </div>
                  <div className="sales-customer-page-info-item">
                    <label>Website</label>
                    <span className="sales-customer-page-link">{selectedCustomer.website}</span>
                  </div>
                  <div className="sales-customer-page-info-item">
                    <label>Industry</label>
                    <span>{selectedCustomer.industry}</span>
                  </div>
                </div>
              </div>

              {/* Business Profile */}
              <div className="sales-customer-page-drawer-section">
                <h3 className="sales-customer-page-drawer-section-title">Business Profile</h3>
                <div className="sales-customer-page-info-grid">
                  <div className="sales-customer-page-info-item">
                    <label>Annual Budget</label>
                    <span>{selectedCustomer.annualBudget}</span>
                  </div>
                  <div className="sales-customer-page-info-item">
                    <label>Procurement Cycle</label>
                    <span>{selectedCustomer.procurementCycle}</span>
                  </div>
                  <div className="sales-customer-page-info-item">
                    <label>Lead Source</label>
                    <span>{selectedCustomer.leadSource}</span>
                  </div>
                  <div className="sales-customer-page-info-item">
                    <label>Probability</label>
                    <span className={`sales-customer-page-probability ${selectedCustomer.probability.toLowerCase()}`}>
                      {selectedCustomer.probability}
                    </span>
                  </div>
                  <div className="sales-customer-page-info-item full-width">
                    <label>Notes</label>
                    <span>{selectedCustomer.notes}</span>
                  </div>
                </div>
              </div>

              {/* Project History */}
              <div className="sales-customer-page-drawer-section">
                <h3 className="sales-customer-page-drawer-section-title">Project History</h3>
                <div className="sales-customer-page-project-list">
                  {projectHistory.map((project) => (
                    <div key={project.id} className="sales-customer-page-project-item">
                      <div className="sales-customer-page-project-info">
                        <strong>{project.id}</strong>
                        <span className="sales-customer-page-project-type">{project.type}</span>
                        <span>{project.date}</span>
                      </div>
                      <div className="sales-customer-page-project-details">
                        <span className="sales-customer-page-project-value">{project.value}</span>
                        <span className={`sales-customer-page-badge badge-${project.status === 'Approved' ? 'green' : 'blue'}`}>
                          {project.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Follow-Up History */}
              <div className="sales-customer-page-drawer-section">
                <h3 className="sales-customer-page-drawer-section-title">Follow-Up History</h3>
                <button className="sales-customer-page-add-btn">+ Add New Follow-Up</button>
                <div className="sales-customer-page-followup-list">
                  {followUpHistory.map((followup, idx) => (
                    <div key={idx} className="sales-customer-page-followup-item">
                      <div className="sales-customer-page-followup-date">{followup.date}</div>
                      <div className="sales-customer-page-followup-details">
                        <p>{followup.summary}</p>
                        <span className="sales-customer-page-followup-assignee">
                          Assigned to: {followup.assignee}
                        </span>
                      </div>
                      <span className={`sales-customer-page-status status-${followup.status === 'Completed' ? 'green' : followup.status === 'Pending' ? 'orange' : 'blue'}`}>
                        {followup.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documents */}
              <div className="sales-customer-page-drawer-section">
                <h3 className="sales-customer-page-drawer-section-title">Uploaded Documents</h3>
                <button className="sales-customer-page-add-btn">📎 Upload Document</button>
                <div className="sales-customer-page-document-list">
                  {documents.map((doc, idx) => (
                    <div key={idx} className="sales-customer-page-document-item">
                      <div className="sales-customer-page-document-icon">📄</div>
                      <div className="sales-customer-page-document-info">
                        <strong>{doc.name}</strong>
                        <span className="sales-customer-page-document-meta">
                          {doc.type} • {doc.size} • {doc.date}
                        </span>
                      </div>
                      <button className="sales-customer-page-document-download">⬇️</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity Timeline */}
              <div className="sales-customer-page-drawer-section">
                <h3 className="sales-customer-page-drawer-section-title">Activity Timeline</h3>
                <div className="sales-customer-page-timeline">
                  {activityTimeline.map((activity, idx) => (
                    <div key={idx} className="sales-customer-page-timeline-item">
                      <div className={`sales-customer-page-timeline-icon icon-${activity.type}`}>
                        {activity.type === 'added' && '✨'}
                        {activity.type === 'note' && '📝'}
                        {activity.type === 'proposal' && '📄'}
                        {activity.type === 'followup' && '📞'}
                        {activity.type === 'document' && '📎'}
                      </div>
                      <div className="sales-customer-page-timeline-content">
                        <p>{activity.text}</p>
                        <span className="sales-customer-page-timeline-date">{activity.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Customer Form Modal */}
      {isAddFormOpen && (
        <div className="sales-customer-page-modal-overlay" onClick={() => setIsAddFormOpen(false)}>
          <div className="sales-customer-page-modal" onClick={(e) => e.stopPropagation()}>
            <div className="sales-customer-page-modal-header">
              <h2>Add New Customer</h2>
              <button 
                className="sales-customer-page-modal-close"
                onClick={() => setIsAddFormOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="sales-customer-page-modal-content">
              <form className="sales-customer-page-form">
                <div className="sales-customer-page-form-row">
                  <div className="sales-customer-page-form-group">
                    <label>Customer Name *</label>
                    <input type="text" placeholder="Enter customer name" required />
                  </div>
                  <div className="sales-customer-page-form-group">
                    <label>Company Name *</label>
                    <input type="text" placeholder="Enter company name" required />
                  </div>
                </div>

                <div className="sales-customer-page-form-row">
                  <div className="sales-customer-page-form-group">
                    <label>Customer Group *</label>
                    <select required>
                      <option value="">Select group</option>
                      <option value="CCMS">CCMS</option>
                      <option value="Solar">Solar</option>
                      <option value="EPC">EPC</option>
                      <option value="IoT">IoT</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                  <div className="sales-customer-page-form-group">
                    <label>Customer Type *</label>
                    <select required>
                      <option value="">Select type</option>
                      <option value="Lead">Lead</option>
                      <option value="Prospect">Prospect</option>
                      <option value="Client">Client</option>
                    </select>
                  </div>
                </div>

                <div className="sales-customer-page-form-row">
                  <div className="sales-customer-page-form-group">
                    <label>Contact Person *</label>
                    <input type="text" placeholder="Contact person name" required />
                  </div>
                  <div className="sales-customer-page-form-group">
                    <label>Designation</label>
                    <input type="text" placeholder="e.g., Manager, Director" />
                  </div>
                </div>

                <div className="sales-customer-page-form-row">
                  <div className="sales-customer-page-form-group">
                    <label>Email *</label>
                    <input type="email" placeholder="email@company.com" required />
                  </div>
                  <div className="sales-customer-page-form-group">
                    <label>Phone *</label>
                    <input type="tel" placeholder="+91 98765 43210" required />
                  </div>
                </div>

                <div className="sales-customer-page-form-group">
                  <label>Address</label>
                  <input type="text" placeholder="Street address" />
                </div>

                <div className="sales-customer-page-form-row">
                  <div className="sales-customer-page-form-group">
                    <label>City *</label>
                    <input type="text" placeholder="City" required />
                  </div>
                  <div className="sales-customer-page-form-group">
                    <label>State *</label>
                    <input type="text" placeholder="State" required />
                  </div>
                  <div className="sales-customer-page-form-group">
                    <label>Pincode</label>
                    <input type="text" placeholder="000000" />
                  </div>
                </div>

                <div className="sales-customer-page-form-row">
                  <div className="sales-customer-page-form-group">
                    <label>GST Number</label>
                    <input type="text" placeholder="GST Number" />
                  </div>
                  <div className="sales-customer-page-form-group">
                    <label>Website</label>
                    <input type="url" placeholder="www.company.com" />
                  </div>
                </div>

                <div className="sales-customer-page-form-row">
                  <div className="sales-customer-page-form-group">
                    <label>Lead Source</label>
                    <select>
                      <option value="">Select source</option>
                      <option value="Website">Website</option>
                      <option value="Referral">Referral</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Walk-In">Walk-In</option>
                    </select>
                  </div>
                  <div className="sales-customer-page-form-group">
                    <label>Industry</label>
                    <input type="text" placeholder="e.g., Solar Energy" />
                  </div>
                </div>

                <div className="sales-customer-page-form-group">
                  <label>Notes</label>
                  <textarea 
                    rows="3" 
                    placeholder="Add any additional notes about the customer..."
                  ></textarea>
                </div>

                <div className="sales-customer-page-form-actions">
                  <button 
                    type="button" 
                    className="sales-customer-page-btn-secondary"
                    onClick={() => setIsAddFormOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="sales-customer-page-btn-secondary">
                    Save & Add Another
                  </button>
                  <button type="submit" className="sales-customer-page-btn-primary">
                    Save Customer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerDatabase;