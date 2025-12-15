import React from 'react';
import '../pages-css/Dashboard.css';

function Dashboard() {
  const kpiCards = [
    { title: 'Total Leads', value: '248', trend: 'up', change: '+12%' },
    { title: 'Pending Follow-Ups', value: '32', trend: 'down', change: '-5%' },
    { title: 'Proposals Sent', value: '89', trend: 'up', change: '+8%' },
    { title: 'Approved Quotations', value: '56', trend: 'up', change: '+15%' },
    { title: 'Invoices Generated', value: '124', trend: 'up', change: '+10%' },
    { title: 'Pipeline Value', value: '$2.4M', trend: 'up', change: '+18%' },
  ];

  const followUps = [
    { client: 'Acme Corporation', date: '2024-12-10', status: 'High Priority', assignedTo: 'Sarah M.' },
    { client: 'TechStart Inc', date: '2024-12-11', status: 'Medium', assignedTo: 'Mike R.' },
    { client: 'Global Solutions', date: '2024-12-12', status: 'Low', assignedTo: 'Emma T.' },
  ];

  const proposals = [
    { id: 'PRO-2024-089', client: 'Acme Corporation', value: '$45,000', status: 'Sent', date: '2024-12-08' },
    { id: 'PRO-2024-090', client: 'TechStart Inc', value: '$32,500', status: 'Draft', date: '2024-12-09' },
    { id: 'PRO-2024-091', client: 'Global Solutions', value: '$78,000', status: 'Approved', date: '2024-12-07' },
  ];

  return (
    <div className="dashboard-home-container">
      <div className="dashboard-home-header">
        <div>
          <h2 className="dashboard-home-title">Dashboard</h2>
          <p className="dashboard-home-subtitle">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="dashboard-home-actions">
          <button className="dashboard-home-btn dashboard-home-btn-primary">+ Add Lead</button>
          <button className="dashboard-home-btn dashboard-home-btn-secondary">Create Proposal</button>
        </div>
      </div>

      <div className="dashboard-home-kpi-grid">
        {kpiCards.map((card, index) => (
          <div key={index} className="dashboard-home-kpi-card">
            <p className="dashboard-home-kpi-label">{card.title}</p>
            <h3 className="dashboard-home-kpi-value">{card.value}</h3>
            <div className="dashboard-home-kpi-trend">
              <span className={`dashboard-home-trend dashboard-home-trend-${card.trend}`}>{card.change}</span>
              <span className="dashboard-home-trend-label">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-home-table-card">
        <h3 className="dashboard-home-card-title">Follow-Up Reminders</h3>
        <div className="dashboard-home-table-wrapper">
          <table className="dashboard-home-data-table">
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Follow-up Date</th>
                <th>Status</th>
                <th>Assigned To</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {followUps.map((item, index) => (
                <tr key={index}>
                  <td className="dashboard-home-font-medium">{item.client}</td>
                  <td>{item.date}</td>
                  <td><span className={`dashboard-home-badge dashboard-home-badge-${item.status.toLowerCase().replace(' ', '-')}`}>{item.status}</span></td>
                  <td>{item.assignedTo}</td>
                  <td><button className="dashboard-home-link-button">Update</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="dashboard-home-table-card">
        <h3 className="dashboard-home-card-title">Active Proposals & Quotations</h3>
        <div className="dashboard-home-table-wrapper">
          <table className="dashboard-home-data-table">
            <thead>
              <tr>
                <th>Proposal ID</th>
                <th>Client Name</th>
                <th>Value</th>
                <th>Status</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {proposals.map((item, index) => (
                <tr key={index}>
                  <td className="dashboard-home-font-medium">{item.id}</td>
                  <td>{item.client}</td>
                  <td className="dashboard-home-font-semibold">{item.value}</td>
                  <td><span className={`dashboard-home-badge dashboard-home-badge-${item.status.toLowerCase()}`}>{item.status}</span></td>
                  <td>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="dashboard-home-bottom-grid">
        <div className="dashboard-home-chart-card">
          <h3 className="dashboard-home-card-title">Lead Activity Chart</h3>
          <div className="dashboard-home-chart-container">
            {[65, 80, 45, 90, 75, 85, 95].map((height, index) => (
              <div key={index} className="dashboard-home-chart-bar-wrapper">
                <div className="dashboard-home-chart-bar" style={{ height: `${height}%` }}></div>
                <span className="dashboard-home-chart-label">W{index + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-home-notifications-card">
          <h3 className="dashboard-home-card-title">Notifications</h3>
          <div className="dashboard-home-notifications-list">
            <div className="dashboard-home-notification-item dashboard-home-notification-yellow">
              <div className="dashboard-home-notification-content">
                <p className="dashboard-home-notification-title">3 Pending Approvals</p>
                <p className="dashboard-home-notification-text">Proposals awaiting review</p>
              </div>
            </div>
            <div className="dashboard-home-notification-item dashboard-home-notification-blue">
              <div className="dashboard-home-notification-content">
                <p className="dashboard-home-notification-title">5 Follow-ups Today</p>
                <p className="dashboard-home-notification-text">Schedule calls with clients</p>
              </div>
            </div>
            <div className="dashboard-home-notification-item dashboard-home-notification-red">
              <div className="dashboard-home-notification-content">
                <p className="dashboard-home-notification-title">2 Overdue Invoices</p>
                <p className="dashboard-home-notification-text">Payment follow-up required</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;