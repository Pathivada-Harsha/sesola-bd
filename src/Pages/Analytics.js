import React, { useState } from 'react';
import '../pages-css/Analytics.css';

const AnalyticsDashboard = () => {
  const [dateRange, setDateRange] = useState('30days');
  const [selectedMember, setSelectedMember] = useState('all');
  const [selectedClient, setSelectedClient] = useState('all');

  // Sample data
  const kpiData = [
    { title: 'Total Leads This Month', value: '247', trend: '+12.5%', trendUp: true, icon: '📊' },
    { title: 'Conversion Rate', value: '24.8%', trend: '+3.2%', trendUp: true, icon: '📈' },
    { title: 'Total Proposal Value', value: '₹45.2L', trend: '+18.4%', trendUp: true, icon: '💼' },
    { title: 'Quotation Approval Rate', value: '67.3%', trend: '-2.1%', trendUp: false, icon: '✅' },
    { title: 'Total Invoice Revenue', value: '₹32.8L', trend: '+25.6%', trendUp: true, icon: '💰' },
    { title: 'Pending Follow-Ups', value: '43', trend: '-8.3%', trendUp: true, icon: '📞' },
    { title: 'Average Response Time', value: '2.4 hrs', trend: '-15.2%', trendUp: true, icon: '⏱️' },
    { title: 'Pipeline Value', value: '₹78.5L', trend: '+22.1%', trendUp: true, icon: '🎯' }
  ];

  const conversionFunnel = [
    { stage: 'Leads Received', count: 1250, percentage: 100 },
    { stage: 'Leads Engaged', count: 980, percentage: 78.4 },
    { stage: 'Proposals Sent', count: 650, percentage: 52.0 },
    { stage: 'Quotations Shared', count: 420, percentage: 33.6 },
    { stage: 'Invoices Issued', count: 280, percentage: 22.4 },
    { stage: 'Deals Closed', count: 185, percentage: 14.8 }
  ];

  const topClients = [
    { name: 'Acme Corporation', revenue: '₹12.5L', proposals: 8, invoices: 6, lastActivity: '2024-12-08' },
    { name: 'TechVision Ltd', revenue: '₹9.8L', proposals: 6, invoices: 5, lastActivity: '2024-12-07' },
    { name: 'Global Solutions', revenue: '₹7.2L', proposals: 5, invoices: 4, lastActivity: '2024-12-06' },
    { name: 'Innovate Systems', revenue: '₹6.5L', proposals: 7, invoices: 3, lastActivity: '2024-12-05' },
    { name: 'NextGen Tech', revenue: '₹5.9L', proposals: 4, invoices: 3, lastActivity: '2024-12-04' }
  ];

  const teamPerformance = [
    { name: 'Rajesh Kumar', leads: 85, proposals: 52, quotations: 38, deals: 24, closingRate: 28.2, avgFollowUp: '2.1 hrs' },
    { name: 'Priya Sharma', leads: 78, proposals: 48, quotations: 35, deals: 22, closingRate: 28.2, avgFollowUp: '1.9 hrs' },
    { name: 'Amit Patel', leads: 62, proposals: 38, quotations: 28, deals: 18, closingRate: 29.0, avgFollowUp: '2.3 hrs' },
    { name: 'Sneha Reddy', leads: 54, proposals: 32, quotations: 24, deals: 15, closingRate: 27.8, avgFollowUp: '2.5 hrs' }
  ];

  const monthlyRevenue = [
    { month: 'Jun', revenue: 18.5 },
    { month: 'Jul', revenue: 22.3 },
    { month: 'Aug', revenue: 25.8 },
    { month: 'Sep', revenue: 28.4 },
    { month: 'Oct', revenue: 30.2 },
    { month: 'Nov', revenue: 32.8 }
  ];

  const handleExport = () => {
    alert('Exporting analytics summary as PDF...');
  };

  return (
    <div className="analytics-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <div className="breadcrumb">Dashboard &gt; Analytics</div>
          <h1 className="page-title">Analytics & Insights</h1>
        </div>
        
        {/* Filters */}
        <div className="filter-bar">
          <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} className="filter-select">
            <option value="30days">Last 30 Days</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>
          
          <select value={selectedMember} onChange={(e) => setSelectedMember(e.target.value)} className="filter-select">
            <option value="all">All Team Members</option>
            <option value="rajesh">Rajesh Kumar</option>
            <option value="priya">Priya Sharma</option>
            <option value="amit">Amit Patel</option>
          </select>
          
          <select value={selectedClient} onChange={(e) => setSelectedClient(e.target.value)} className="filter-select">
            <option value="all">All Clients</option>
            <option value="acme">Acme Corporation</option>
            <option value="techvision">TechVision Ltd</option>
          </select>
          
          <button className="export-btn" onClick={handleExport}>
            📄 Export PDF
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-section">
        {kpiData.map((kpi, index) => (
          <div key={index} className="kpi-card">
            <div className="kpi-icon">{kpi.icon}</div>
            <div className="kpi-content">
              <h3 className="kpi-title">{kpi.title}</h3>
              <div className="kpi-value">{kpi.value}</div>
              <div className={`kpi-trend ${kpi.trendUp ? 'trend-up' : 'trend-down'}`}>
                <span className="trend-arrow">{kpi.trendUp ? '↑' : '↓'}</span>
                {kpi.trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Leads & Conversion Analytics */}
      <div className="section-title">Leads & Conversion Analytics</div>
      <div className="two-column-grid">
        {/* Leads Over Time */}
        <div className="chart-card">
          <h3 className="card-title">Leads Over Time</h3>
          <div className="line-chart">
            <svg viewBox="0 0 400 200" className="chart-svg">
              <polyline
                points="20,150 70,120 120,100 170,90 220,70 270,60 320,50 370,45"
                fill="none"
                stroke="#2563eb"
                strokeWidth="3"
              />
              <circle cx="20" cy="150" r="4" fill="#2563eb" />
              <circle cx="70" cy="120" r="4" fill="#2563eb" />
              <circle cx="120" cy="100" r="4" fill="#2563eb" />
              <circle cx="170" cy="90" r="4" fill="#2563eb" />
              <circle cx="220" cy="70" r="4" fill="#2563eb" />
              <circle cx="270" cy="60" r="4" fill="#2563eb" />
              <circle cx="320" cy="50" r="4" fill="#2563eb" />
              <circle cx="370" cy="45" r="4" fill="#2563eb" />
            </svg>
            <div className="chart-labels">
              <span>Week 1</span>
              <span>Week 2</span>
              <span>Week 3</span>
              <span>Week 4</span>
            </div>
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="chart-card">
          <h3 className="card-title">Conversion Funnel</h3>
          <div className="funnel-chart">
            {conversionFunnel.map((stage, index) => (
              <div key={index} className="funnel-stage">
                <div 
                  className="funnel-bar" 
                  style={{ width: `${stage.percentage}%` }}
                >
                  <span className="funnel-label">{stage.stage}</span>
                  <span className="funnel-count">{stage.count}</span>
                </div>
                <span className="funnel-percentage">{stage.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue & Financial Analytics */}
      <div className="section-title">Revenue & Financial Analytics</div>
      <div className="three-column-grid">
        {/* Revenue Trend */}
        <div className="chart-card span-2">
          <h3 className="card-title">Monthly Revenue Trend</h3>
          <div className="bar-chart">
            {monthlyRevenue.map((data, index) => (
              <div key={index} className="bar-container">
                <div className="bar" style={{ height: `${(data.revenue / 35) * 100}%` }}>
                  <span className="bar-value">₹{data.revenue}L</span>
                </div>
                <span className="bar-label">{data.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Outstanding Payments */}
        <div className="chart-card">
          <h3 className="card-title">Outstanding Payments</h3>
          <div className="donut-chart">
            <svg viewBox="0 0 200 200" className="donut-svg">
              <circle cx="100" cy="100" r="70" fill="none" stroke="#22c55e" strokeWidth="30" strokeDasharray="308 440" />
              <circle cx="100" cy="100" r="70" fill="none" stroke="#f59e0b" strokeWidth="30" strokeDasharray="88 440" strokeDashoffset="-308" />
              <circle cx="100" cy="100" r="70" fill="none" stroke="#ef4444" strokeWidth="30" strokeDasharray="44 440" strokeDashoffset="-396" />
            </svg>
            <div className="donut-legend">
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#22c55e' }}></span>
                <span>Paid (70%)</span>
              </div>
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#f59e0b' }}></span>
                <span>Pending (20%)</span>
              </div>
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#ef4444' }}></span>
                <span>Overdue (10%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Clients */}
      <div className="chart-card">
        <h3 className="card-title">Top Clients by Revenue</h3>
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Total Revenue</th>
                <th>Proposals</th>
                <th>Invoices</th>
                <th>Last Activity</th>
              </tr>
            </thead>
            <tbody>
              {topClients.map((client, index) => (
                <tr key={index}>
                  <td className="client-name">{client.name}</td>
                  <td className="revenue-cell">{client.revenue}</td>
                  <td>{client.proposals}</td>
                  <td>{client.invoices}</td>
                  <td>{client.lastActivity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* BD Team Performance */}
      <div className="section-title">BD Team Performance Analytics</div>
      <div className="chart-card">
        <h3 className="card-title">Team Member Performance Ranking</h3>
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>BD Employee</th>
                <th>Leads</th>
                <th>Proposals</th>
                <th>Quotations</th>
                <th>Deals Closed</th>
                <th>Closing Rate</th>
                <th>Avg Follow-Up</th>
              </tr>
            </thead>
            <tbody>
              {teamPerformance.map((member, index) => (
                <tr key={index}>
                  <td className="employee-name">{member.name}</td>
                  <td>{member.leads}</td>
                  <td>{member.proposals}</td>
                  <td>{member.quotations}</td>
                  <td className="deals-cell">{member.deals}</td>
                  <td>
                    <span className="rate-badge">{member.closingRate}%</span>
                  </td>
                  <td>{member.avgFollowUp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Proposal & Quotation Analytics */}
      <div className="section-title">Proposal & Quotation Analytics</div>
      <div className="three-column-grid">
        <div className="chart-card">
          <h3 className="card-title">Proposal Acceptance Rate</h3>
          <div className="pie-stats">
            <div className="stat-row">
              <span className="stat-color approved"></span>
              <span className="stat-label">Approved</span>
              <span className="stat-value">156 (62%)</span>
            </div>
            <div className="stat-row">
              <span className="stat-color pending"></span>
              <span className="stat-label">Pending</span>
              <span className="stat-value">68 (27%)</span>
            </div>
            <div className="stat-row">
              <span className="stat-color rejected"></span>
              <span className="stat-label">Rejected</span>
              <span className="stat-value">26 (11%)</span>
            </div>
          </div>
        </div>

        <div className="chart-card">
          <h3 className="card-title">Quotation Success Ratio</h3>
          <div className="pie-stats">
            <div className="stat-row">
              <span className="stat-label">Sent</span>
              <span className="stat-value">420</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Converted</span>
              <span className="stat-value">280 (66.7%)</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Avg Value</span>
              <span className="stat-value">₹1.2L</span>
            </div>
          </div>
        </div>

        <div className="chart-card">
          <h3 className="card-title">Follow-Up Timeliness</h3>
          <div className="pie-stats">
            <div className="stat-row">
              <span className="stat-color approved"></span>
              <span className="stat-label">On-Time</span>
              <span className="stat-value">342 (85%)</span>
            </div>
            <div className="stat-row">
              <span className="stat-color rejected"></span>
              <span className="stat-label">Delayed</span>
              <span className="stat-value">58 (15%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;