// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Sidebar from './components/sidebar.js';
import Dashboard from './Pages/Dashboard.js';
import Dashboardtabs from "./Pages/Dashboard-Sales-procurement.js"
import Leads from "./Pages/Leads-Enquire.js";
import Proposals from "./Pages/Proposals.js";
import Quatations from "./Pages/Quatations.js";
import ProcurementQuatations from "./Pages/Procurement-Quatation-Recieved.js"
import Invoices from "./Pages/Invoices.js";
import Client_dashboard from "./Pages/Client-dashboard.js";
import Customer_dashboard from "./Pages/Sales-Customer.js";

import Follow_up from "./Pages/Follow-ups.js";
import Analytics from "./Pages/Analytics.js";
import Procurement from "./Pages/Procurement-Vendor-Management.js";
import Documents from "./Pages/Documents.js";
import Login from "./Pages/Login.js";
import Profile from "./Pages/Profile.js";
import SalesOrder from "./Pages/Sales-Order.js";
import PurchaseOrders from './Pages/PurchaseOrders.js';
import BillsRecieved from "./Pages/Bills-Recieved.js";
import Reports from "./Pages/Reports.js";
import SolarProfile from "./Pages/Solarproposaleditor.js"
import './App.css';

function AppWrapper() {
  const location = useLocation();

  // Hide navbar & sidebar on login page
  const hideShell = location.pathname === "/login" || location.pathname === "/";

  return <AppShell hideShell={hideShell} />;
}

function AppShell({ hideShell }) {
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile
  const [collapsed, setCollapsed] = useState(false); // desktop collapse state

  // restore collapsed state from localStorage (optional)
  useEffect(() => {
    const saved = localStorage.getItem("sidebarCollapsed");
    if (saved !== null) setCollapsed(JSON.parse(saved));
  }, []);

  // collapse/expand
  const toggleCollapse = () => {
    setCollapsed(prev => {
      const newVal = !prev;
      localStorage.setItem("sidebarCollapsed", JSON.stringify(newVal));
      return newVal;
    });
  };

  return (
    <div className={`app ${collapsed ? "sidebar-collapsed" : "sidebar-expanded"}`}>
      {!hideShell && (
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
      )}

      {!hideShell && (
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          collapsed={collapsed}
          onToggleCollapse={toggleCollapse}
        />
      )}

      <main className={`main-content ${hideShell ? "fullpage" : ""}`}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />

          <Route path="/dashboard" element={<Dashboardtabs />} />
          <Route path="/sales/leads" element={<Leads />} />
          <Route path="/sales/proposals" element={<Proposals />} />
          <Route path="/procurement/quotations" element={<Quatations />} />
          <Route path="/procurement/procurementquatations" element={<ProcurementQuatations />} />

          <Route path="/sales/invoices" element={<Invoices />} />
          <Route path="/sales/clients" element={<Customer_dashboard />} />
          <Route path="/sales/SalesOrder" element={<SalesOrder />} />
          <Route path="/sales/followups" element={<Follow_up />} />
          <Route path="/procurement/vendors" element={<Procurement />} />
          <Route path="/procurement/purchaseorders" element={<PurchaseOrders />} />
          <Route path="/procurement/billsrecieved" element={<BillsRecieved />} />

          <Route path="/documents" element={<Documents />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<div className="page-container"><h2>Admin Settings Page</h2></div>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/solarprofile" element={<SolarProfile />} />

        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
