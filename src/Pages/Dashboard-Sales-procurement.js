import React, { useState } from 'react';
import '../pages-css/Dashboard-Sales-procurement.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('sales');

  // Sales Data
  const salesKPIs = [
    { label: 'Total Leads', value: '1,248', trend: '+12%', trendUp: true },
    { label: 'Leads This Month', value: '156', trend: '+8%', trendUp: true },
    { label: 'Lead-to-Proposal Rate', value: '34%', trend: '+3%', trendUp: true },
    { label: 'Est. Proposal Value', value: '₹45.2L', trend: '+15%', trendUp: true },
    { label: 'Total Sales Orders', value: '89', trend: '+5%', trendUp: true },
    { label: 'Invoice Revenue', value: '₹32.8L', trend: '+18%', trendUp: true },
    { label: 'Outstanding Payments', value: '₹8.4L', trend: '-2%', trendUp: false },
    { label: 'Upcoming Follow-Ups', value: '23', trend: '0%', trendUp: true }
  ];

  const leadStats = [
    { label: 'New Leads', count: 45, color: '#3b82f6' },
    { label: 'Contacted Leads', count: 67, color: '#8b5cf6' },
    { label: 'Follow-Up Leads', count: 34, color: '#f59e0b' },
    { label: 'Hot Leads', count: 18, color: '#ef4444' }
  ];

  const salesFunnel = [
    { stage: 'Leads', count: 1248, dropoff: 0 },
    { stage: 'Contacted', count: 892, dropoff: 28.5 },
    { stage: 'Proposals', count: 423, dropoff: 52.6 },
    { stage: 'Orders', count: 234, dropoff: 44.7 },
    { stage: 'Invoices', count: 198, dropoff: 15.4 },
    { stage: 'Paid', count: 167, dropoff: 15.7 }
  ];

  const salesOrders = [
    { id: 'SO-2401', customer: 'Acme Corp', value: '₹4.5L', delivery: 'In Progress', payment: 'Paid' },
    { id: 'SO-2402', customer: 'TechStart Inc', value: '₹2.8L', delivery: 'Delivered', payment: 'Pending' },
    { id: 'SO-2403', customer: 'Global Solutions', value: '₹6.2L', delivery: 'Pending', payment: 'Advance Paid' },
    { id: 'SO-2404', customer: 'Innovation Labs', value: '₹3.1L', delivery: 'In Progress', payment: 'Paid' },
    { id: 'SO-2405', customer: 'Digital Ventures', value: '₹5.0L', delivery: 'Delivered', payment: 'Paid' }
  ];

  const followUps = {
    today: 8,
    overdue: 5,
    next7Days: 10
  };

  const topCustomers = [
    { name: 'Acme Corp', revenue: '₹18.5L', orders: 24, lastContact: '2 days ago' },
    { name: 'TechStart Inc', revenue: '₹12.3L', orders: 18, lastContact: '1 week ago' },
    { name: 'Global Solutions', revenue: '₹9.8L', orders: 15, lastContact: '3 days ago' },
    { name: 'Innovation Labs', revenue: '₹7.2L', orders: 12, lastContact: '5 days ago' },
    { name: 'Digital Ventures', revenue: '₹6.5L', orders: 10, lastContact: '1 day ago' }
  ];

  const salesActivities = [
    { type: 'proposal', text: 'Proposal sent to Acme Corp - ₹4.5L', time: '2 hours ago' },
    { type: 'call', text: 'Sales call with TechStart Inc completed', time: '5 hours ago' },
    { type: 'visit', text: 'Site visit scheduled with Global Solutions', time: '1 day ago' },
    { type: 'invoice', text: 'Invoice #INV-2401 generated - ₹2.8L', time: '1 day ago' },
    { type: 'payment', text: 'Payment received from Innovation Labs - ₹3.1L', time: '2 days ago' },
    { type: 'call', text: 'Follow-up call scheduled with Digital Ventures', time: '3 days ago' }
  ];

  // Procurement Data
  const procurementKPIs = [
    { label: 'Total Vendors', value: '342', trend: '+5%', trendUp: true },
    { label: 'Quotations Pending', value: '28', trend: '-3%', trendUp: false },
    { label: 'Approved POs', value: '156', trend: '+12%', trendUp: true },
    { label: 'In-Transit POs', value: '45', trend: '+8%', trendUp: true },
    { label: 'Delivered POs', value: '423', trend: '+15%', trendUp: true },
    { label: 'Total Procurement Spend', value: '₹68.5L', trend: '+10%', trendUp: true },
    { label: 'Pending Vendor Bills', value: '₹12.3L', trend: '-5%', trendUp: false },
    { label: 'Avg Delivery Time', value: '12 days', trend: '-2 days', trendUp: false }
  ];

  const vendorQuotations = [
    { vendor: 'ABC Suppliers', id: 'VQ-1234', amount: '₹3.2L', validity: '15 Dec 2025', status: 'Pending' },
    { vendor: 'XYZ Industries', id: 'VQ-1235', amount: '₹1.8L', validity: '18 Dec 2025', status: 'Approved' },
    { vendor: 'Prime Materials', id: 'VQ-1236', amount: '₹4.5L', validity: '20 Dec 2025', status: 'Under Review' },
    { vendor: 'Elite Trading', id: 'VQ-1237', amount: '₹2.1L', validity: '22 Dec 2025', status: 'Pending' },
    { vendor: 'Global Supplies', id: 'VQ-1238', amount: '₹3.8L', validity: '25 Dec 2025', status: 'Approved' }
  ];

  const poStatus = [
    { status: 'Draft', count: 12, color: '#94a3b8' },
    { status: 'Approved', count: 156, color: '#3b82f6' },
    { status: 'Ordered', count: 89, color: '#8b5cf6' },
    { status: 'In-Transit', count: 45, color: '#f59e0b' },
    { status: 'Delivered', count: 423, color: '#10b981' },
    { status: 'Cancelled', count: 8, color: '#ef4444' }
  ];

  const vendorPerformance = [
    { name: 'ABC Suppliers', deliveryTime: '10 days', orders: 45, spend: '₹15.2L', rating: 4.5 },
    { name: 'XYZ Industries', deliveryTime: '12 days', orders: 38, spend: '₹12.8L', rating: 4.2 },
    { name: 'Prime Materials', deliveryTime: '14 days', orders: 32, spend: '₹10.5L', rating: 4.0 },
    { name: 'Elite Trading', deliveryTime: '11 days', orders: 28, spend: '₹8.7L', rating: 4.3 },
    { name: 'Global Supplies', deliveryTime: '9 days', orders: 35, spend: '₹11.2L', rating: 4.6 }
  ];

  const vendorBills = [
    { id: 'BILL-3401', vendor: 'ABC Suppliers', amount: '₹3.2L', status: 'Paid' },
    { id: 'BILL-3402', vendor: 'XYZ Industries', amount: '₹1.8L', status: 'Pending' },
    { id: 'BILL-3403', vendor: 'Prime Materials', amount: '₹4.5L', status: 'Pending' },
    { id: 'BILL-3404', vendor: 'Elite Trading', amount: '₹2.1L', status: 'Paid' },
    { id: 'BILL-3405', vendor: 'Global Supplies', amount: '₹3.8L', status: 'Paid' }
  ];

  const procurementActivities = [
    { type: 'po', text: 'PO-5678 approved for ABC Suppliers - ₹3.2L', time: '1 hour ago' },
    { type: 'quotation', text: 'Vendor quotation uploaded by XYZ Industries', time: '4 hours ago' },
    { type: 'delivery', text: 'Goods delivered for PO-5675', time: '1 day ago' },
    { type: 'bill', text: 'Bill recorded from Prime Materials - ₹4.5L', time: '1 day ago' },
    { type: 'payment', text: 'Payment processed to Elite Trading - ₹2.1L', time: '2 days ago' },
    { type: 'po', text: 'PO-5680 created for Global Supplies', time: '3 days ago' }
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <div className="dashboard-filters">
          <select className="dashboard-filter-select">
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>This Year</option>
          </select>
          <select className="dashboard-filter-select">
            <option>All Team Members</option>
            <option>Sales Team</option>
            <option>Procurement Team</option>
          </select>
          <select className="dashboard-filter-select">
            <option>All Regions</option>
            <option>North</option>
            <option>South</option>
          </select>
        </div>
      </div>

      <div className="dashboard-tabs">
        <button
          className={`dashboard-tab ${activeTab === 'sales' ? 'dashboard-tab-active' : ''}`}
          onClick={() => setActiveTab('sales')}
        >
          <span className="dashboard-tab-icon">📊</span>
          <span className="dashboard-tab-text">Sales</span>
        </button>
        <button
          className={`dashboard-tab ${activeTab === 'procurement' ? 'dashboard-tab-active' : ''}`}
          onClick={() => setActiveTab('procurement')}
        >
          <span className="dashboard-tab-icon">📦</span>
          <span className="dashboard-tab-text">Procurement</span>
        </button>
      </div>

      {activeTab === 'sales' && (
        <div className="dashboard-salestab-content">
          {/* Sales KPIs */}
          <div className="dashboard-salestab-kpi-grid">
            {salesKPIs.map((kpi, idx) => (
              <div key={idx} className="dashboard-salestab-kpi-card">
                <div className="dashboard-salestab-kpi-label">{kpi.label}</div>
                <div className="dashboard-salestab-kpi-value">{kpi.value}</div>
                <div className={`dashboard-salestab-kpi-trend ${kpi.trendUp ? 'trend-up' : 'trend-down'}`}>
                  {kpi.trendUp ? '↑' : '↓'} {kpi.trend}
                </div>
              </div>
            ))}
          </div>

          <div className="dashboard-salestab-two-column">
            {/* Leads Overview */}
            <div className="dashboard-salestab-card">
              <h2 className="dashboard-salestab-card-title">Leads Overview</h2>
              <div className="dashboard-salestab-leads-grid">
                {leadStats.map((lead, idx) => (
                  <div key={idx} className="dashboard-salestab-lead-stat">
                    <div className="dashboard-salestab-lead-count" style={{ color: lead.color }}>
                      {lead.count}
                    </div>
                    <div className="dashboard-salestab-lead-label">{lead.label}</div>
                  </div>
                ))}
              </div>
              <div className="dashboard-salestab-chart-placeholder">
                <div className="dashboard-salestab-line-chart">
                  {[32, 45, 38, 52, 48, 67, 58, 72, 65, 78, 85, 92, 88, 95].map((height, idx) => (
                    <div
                      key={idx}
                      className="dashboard-salestab-chart-bar"
                      style={{ height: `${height}%` }}
                    ></div>
                  ))}
                </div>
                <div className="dashboard-salestab-chart-label">Last 30 Days Lead Trends</div>
              </div>
            </div>

            {/* Follow-Up Reminders */}
            <div className="dashboard-salestab-card">
              <h2 className="dashboard-salestab-card-title">Follow-Up Reminders</h2>
              <div className="dashboard-salestab-followup-grid">
                <div className="dashboard-salestab-followup-item">
                  <div className="dashboard-salestab-followup-count today">{followUps.today}</div>
                  <div className="dashboard-salestab-followup-label">Today's Follow-Ups</div>
                </div>
                <div className="dashboard-salestab-followup-item">
                  <div className="dashboard-salestab-followup-count overdue">{followUps.overdue}</div>
                  <div className="dashboard-salestab-followup-label">Overdue Follow-Ups</div>
                </div>
                <div className="dashboard-salestab-followup-item">
                  <div className="dashboard-salestab-followup-count upcoming">{followUps.next7Days}</div>
                  <div className="dashboard-salestab-followup-label">Next 7 Days</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sales Funnel */}
          <div className="dashboard-salestab-card">
            <h2 className="dashboard-salestab-card-title">Sales Funnel</h2>
            <div className="dashboard-salestab-funnel">
              {salesFunnel.map((stage, idx) => (
                <React.Fragment key={idx}>
                  <div className="dashboard-salestab-funnel-stage">
                    <div className="dashboard-salestab-funnel-stage-name">{stage.stage}</div>
                    <div className="dashboard-salestab-funnel-stage-count">{stage.count}</div>
                    {stage.dropoff > 0 && (
                      <div className="dashboard-salestab-funnel-stage-dropoff">
                        -{stage.dropoff}%
                      </div>
                    )}
                  </div>
                  {idx < salesFunnel.length - 1 && (
                    <div className="dashboard-salestab-funnel-arrow">→</div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="dashboard-salestab-two-column">
            {/* Sales Orders Snapshot */}
            <div className="dashboard-salestab-card">
              <div className="dashboard-salestab-card-header">
                <h2 className="dashboard-salestab-card-title">Sales Orders</h2>
                <button className="dashboard-salestab-view-all-btn">View All</button>
              </div>
              <div className="dashboard-salestab-table-container">
                <table className="dashboard-salestab-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Value</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesOrders.map((order, idx) => (
                      <tr key={idx}>
                        <td><strong>{order.id}</strong></td>
                        <td>{order.customer}</td>
                        <td><strong>{order.value}</strong></td>
                        <td>
                          <span className={`dashboard-salestab-status status-${order.payment.toLowerCase().replace(' ', '-')}`}>
                            {order.payment}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top Customers */}
            <div className="dashboard-salestab-card">
              <h2 className="dashboard-salestab-card-title">Top Customers</h2>
              <div className="dashboard-salestab-table-container">
                <table className="dashboard-salestab-table">
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Revenue</th>
                      <th>Orders</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topCustomers.map((customer, idx) => (
                      <tr key={idx}>
                        <td>{customer.name}</td>
                        <td><strong>{customer.revenue}</strong></td>
                        <td>{customer.orders}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sales Activity Timeline */}
          <div className="dashboard-salestab-card">
            <h2 className="dashboard-salestab-card-title">Recent Activity</h2>
            <div className="dashboard-salestab-timeline">
              {salesActivities.map((activity, idx) => (
                <div key={idx} className="dashboard-salestab-timeline-item">
                  <div className={`dashboard-salestab-timeline-icon icon-${activity.type}`}>
                    {activity.type === 'proposal' && '📄'}
                    {activity.type === 'call' && '📞'}
                    {activity.type === 'visit' && '🏢'}
                    {activity.type === 'invoice' && '🧾'}
                    {activity.type === 'payment' && '💰'}
                  </div>
                  <div className="dashboard-salestab-timeline-content">
                    <div className="dashboard-salestab-timeline-text">{activity.text}</div>
                    <div className="dashboard-salestab-timeline-time">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'procurement' && (
        <div className="dashboard-procurementtab-content">
          {/* Procurement KPIs */}
          <div className="dashboard-procurementtab-kpi-grid">
            {procurementKPIs.map((kpi, idx) => (
              <div key={idx} className="dashboard-procurementtab-kpi-card">
                <div className="dashboard-procurementtab-kpi-label">{kpi.label}</div>
                <div className="dashboard-procurementtab-kpi-value">{kpi.value}</div>
                <div className={`dashboard-procurementtab-kpi-trend ${kpi.trendUp ? 'trend-up' : 'trend-down'}`}>
                  {kpi.trendUp ? '↑' : '↓'} {kpi.trend}
                </div>
              </div>
            ))}
          </div>

          <div className="dashboard-procurementtab-two-column">
            {/* Vendor Quotation Snapshot */}
            <div className="dashboard-procurementtab-card">
              <div className="dashboard-procurementtab-card-header">
                <h2 className="dashboard-procurementtab-card-title">Vendor Quotations</h2>
                <button className="dashboard-procurementtab-view-all-btn">View All</button>
              </div>
              <div className="dashboard-procurementtab-table-container">
                <table className="dashboard-procurementtab-table">
                  <thead>
                    <tr>
                      <th>Vendor</th>
                      <th>Amount</th>
                      <th>Validity</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendorQuotations.map((quote, idx) => (
                      <tr key={idx}>
                        <td>{quote.vendor}</td>
                        <td><strong>{quote.amount}</strong></td>
                        <td>{quote.validity}</td>
                        <td>
                          <span className={`dashboard-procurementtab-status status-${quote.status.toLowerCase().replace(' ', '-')}`}>
                            {quote.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Purchase Order Status Chart */}
            <div className="dashboard-procurementtab-card">
              <h2 className="dashboard-procurementtab-card-title">PO Status Distribution</h2>
              <div className="dashboard-procurementtab-chart-grid">
                {poStatus.map((po, idx) => (
                  <div key={idx} className="dashboard-procurementtab-chart-item">
                    <div
                      className="dashboard-procurementtab-chart-bar"
                      style={{
                        height: `${(po.count / 423) * 100}%`,
                        backgroundColor: po.color
                      }}
                    >
                      <span className="dashboard-procurementtab-chart-count">{po.count}</span>
                    </div>
                    <div className="dashboard-procurementtab-chart-label">{po.status}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Procurement Spend Over Time */}
          <div className="dashboard-procurementtab-card">
            <h2 className="dashboard-procurementtab-card-title">Procurement Spend Over Time</h2>
            <div className="dashboard-procurementtab-spend-chart">
              <div className="dashboard-procurementtab-spend-bars">
                {[45, 52, 48, 65, 58, 72, 68, 78, 75, 85, 82, 92].map((height, idx) => (
                  <div
                    key={idx}
                    className="dashboard-procurementtab-spend-bar"
                    style={{ height: `${height}%` }}
                  >
                    <span className="dashboard-procurementtab-spend-tooltip">
                      ₹{(height * 0.8).toFixed(1)}L
                    </span>
                  </div>
                ))}
              </div>
              <div className="dashboard-procurementtab-spend-labels">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, idx) => (
                  <span key={idx} className="dashboard-procurementtab-spend-month">{month}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="dashboard-procurementtab-two-column">
            {/* Vendor Performance Table */}
            <div className="dashboard-procurementtab-card">
              <h2 className="dashboard-procurementtab-card-title">Vendor Performance</h2>
              <div className="dashboard-procurementtab-table-container">
                <table className="dashboard-procurementtab-table">
                  <thead>
                    <tr>
                      <th>Vendor</th>
                      <th>Orders</th>
                      <th>Spend</th>
                      <th>Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendorPerformance.map((vendor, idx) => (
                      <tr key={idx}>
                        <td>{vendor.name}</td>
                        <td>{vendor.orders}</td>
                        <td><strong>{vendor.spend}</strong></td>
                        <td>
                          <div className="dashboard-procurementtab-rating">
                            {'⭐'.repeat(Math.floor(vendor.rating))}
                            <span className="dashboard-procurementtab-rating-value">{vendor.rating}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bills Received Snapshot */}
            <div className="dashboard-procurementtab-card">
              <div className="dashboard-procurementtab-card-header">
                <h2 className="dashboard-procurementtab-card-title">Bills Received</h2>
                <button className="dashboard-procurementtab-view-all-btn">View All</button>
              </div>
              <div className="dashboard-procurementtab-table-container">
                <table className="dashboard-procurementtab-table">
                  <thead>
                    <tr>
                      <th>Bill ID</th>
                      <th>Vendor</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendorBills.map((bill, idx) => (
                      <tr key={idx}>
                        <td><strong>{bill.id}</strong></td>
                        <td>{bill.vendor}</td>
                        <td><strong>{bill.amount}</strong></td>
                        <td>
                          <span className={`dashboard-procurementtab-status status-${bill.status.toLowerCase()}`}>
                            {bill.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Procurement Activity Timeline */}
          <div className="dashboard-procurementtab-card">
            <h2 className="dashboard-procurementtab-card-title">Recent Activity</h2>
            <div className="dashboard-procurementtab-timeline">
              {procurementActivities.map((activity, idx) => (
                <div key={idx} className="dashboard-procurementtab-timeline-item">
                  <div className={`dashboard-procurementtab-timeline-icon icon-${activity.type}`}>
                    {activity.type === 'po' && '📋'}
                    {activity.type === 'quotation' && '📝'}
                    {activity.type === 'delivery' && '🚚'}
                    {activity.type === 'bill' && '🧾'}
                    {activity.type === 'payment' && '💳'}
                  </div>
                  <div className="dashboard-procurementtab-timeline-content">
                    <div className="dashboard-procurementtab-timeline-text">{activity.text}</div>
                    <div className="dashboard-procurementtab-timeline-time">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;