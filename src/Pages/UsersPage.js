import React, { useState, useEffect } from 'react';
import '../pages-css/UsersPage.css';


const UsersPage = () => {
  // State management
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [showEditPermissionsModal, setShowEditPermissionsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedRolePermissions, setSelectedRolePermissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [activeTab, setActiveTab] = useState('users'); // 'users' or 'roles'

  // Form state for new user
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    full_name: '',
    phone: '',
    password: '',
    role_id: '',
    is_active: true
  });

  // Mock data - Replace with actual API calls
  useEffect(() => {
    fetchUsers();
    fetchRoles();
    fetchPermissions();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const mockUsers = [
        {
          id: 1,
          username: 'superadmin',
          email: 'superadmin@istlabs.in',
          full_name: 'Super Administrator',
          phone: '+91-9876543210',
          is_active: true,
          role_id: 1,
          role_name: 'SuperAdmin',
          permission_count: 69,
          created_at: '2024-01-15'
        },
        {
          id: 2,
          username: 'admin',
          email: 'admin@istlabs.in',
          full_name: 'System Admin',
          phone: '+91-9876543211',
          is_active: true,
          role_id: 2,
          role_name: 'Admin',
          permission_count: 68,
          created_at: '2024-01-16'
        },
        {
          id: 3,
          username: 'rajesh.kumar',
          email: 'rajesh.kumar@istlabs.in',
          full_name: 'Rajesh Kumar',
          phone: '+91-9876543212',
          is_active: true,
          role_id: 3,
          role_name: 'Sales Manager',
          permission_count: 40,
          created_at: '2024-02-01'
        },
        {
          id: 4,
          username: 'priya.sharma',
          email: 'priya.sharma@istlabs.in',
          full_name: 'Priya Sharma',
          phone: '+91-9876543213',
          is_active: true,
          role_id: 4,
          role_name: 'BD Executive',
          permission_count: 24,
          created_at: '2024-02-05'
        },
        {
          id: 5,
          username: 'amit.singh',
          email: 'amit.singh@istlabs.in',
          full_name: 'Amit Singh',
          phone: '+91-9876543214',
          is_active: true,
          role_id: 5,
          role_name: 'Procurement Manager',
          permission_count: 36,
          created_at: '2024-02-10'
        },
        {
          id: 6,
          username: 'neha.gupta',
          email: 'neha.gupta@istlabs.in',
          full_name: 'Neha Gupta',
          phone: '+91-9876543215',
          is_active: true,
          role_id: 6,
          role_name: 'Procurement Executive',
          permission_count: 21,
          created_at: '2024-02-15'
        }
      ];
      setUsers(mockUsers);
      setLoading(false);
    }, 500);
  };

  const fetchRoles = async () => {
    // Simulate API call
    const mockRoles = [
      { id: 1, name: 'SuperAdmin', description: 'Full system access with configuration rights', permission_count: 69 },
      { id: 2, name: 'Admin', description: 'Administrative access to all modules', permission_count: 68 },
      { id: 3, name: 'Sales Manager', description: 'Manages sales operations and team', permission_count: 40 },
      { id: 4, name: 'BD Executive', description: 'Business Development - handles leads, proposals, quotations', permission_count: 24 },
      { id: 5, name: 'Procurement Manager', description: 'Manages procurement operations and vendors', permission_count: 36 },
      { id: 6, name: 'Procurement Executive', description: 'Handles purchase orders, bills, and vendor coordination', permission_count: 21 }
    ];
    setRoles(mockRoles);
  };

  const fetchPermissions = async () => {
    // Simulate API call - All available permissions
    const mockPermissions = [
      // User Management
      { id: 1, name: 'users.view', description: 'View users', module: 'User Management' },
      { id: 2, name: 'users.create', description: 'Create new users', module: 'User Management' },
      { id: 3, name: 'users.edit', description: 'Edit user details', module: 'User Management' },
      { id: 4, name: 'users.delete', description: 'Delete users', module: 'User Management' },
      { id: 5, name: 'roles.manage', description: 'Manage roles and permissions', module: 'User Management' },
      
      // Customer Management
      { id: 6, name: 'customers.view', description: 'View customers', module: 'Customer Management' },
      { id: 7, name: 'customers.create', description: 'Create customers', module: 'Customer Management' },
      { id: 8, name: 'customers.edit', description: 'Edit customer details', module: 'Customer Management' },
      { id: 9, name: 'customers.delete', description: 'Delete customers', module: 'Customer Management' },
      
      // Vendor Management
      { id: 10, name: 'vendors.view', description: 'View vendors', module: 'Vendor Management' },
      { id: 11, name: 'vendors.create', description: 'Create vendors', module: 'Vendor Management' },
      { id: 12, name: 'vendors.edit', description: 'Edit vendor details', module: 'Vendor Management' },
      { id: 13, name: 'vendors.delete', description: 'Delete vendors', module: 'Vendor Management' },
      
      // Lead Management
      { id: 14, name: 'leads.view', description: 'View leads', module: 'Lead Management' },
      { id: 15, name: 'leads.create', description: 'Create leads', module: 'Lead Management' },
      { id: 16, name: 'leads.edit', description: 'Edit leads', module: 'Lead Management' },
      { id: 17, name: 'leads.delete', description: 'Delete leads', module: 'Lead Management' },
      { id: 18, name: 'leads.assign', description: 'Assign leads to team members', module: 'Lead Management' },
      
      // Proposal Management
      { id: 19, name: 'proposals.view', description: 'View proposals', module: 'Proposal Management' },
      { id: 20, name: 'proposals.create', description: 'Create proposals', module: 'Proposal Management' },
      { id: 21, name: 'proposals.edit', description: 'Edit proposals', module: 'Proposal Management' },
      { id: 22, name: 'proposals.delete', description: 'Delete proposals', module: 'Proposal Management' },
      { id: 23, name: 'proposals.approve', description: 'Approve proposals', module: 'Proposal Management' },
      
      // Sales Quotations
      { id: 24, name: 'quotations.sales.view', description: 'View sales quotations', module: 'Sales Quotations' },
      { id: 25, name: 'quotations.sales.create', description: 'Create sales quotations', module: 'Sales Quotations' },
      { id: 26, name: 'quotations.sales.edit', description: 'Edit sales quotations', module: 'Sales Quotations' },
      { id: 27, name: 'quotations.sales.delete', description: 'Delete sales quotations', module: 'Sales Quotations' },
      { id: 28, name: 'quotations.sales.approve', description: 'Approve sales quotations', module: 'Sales Quotations' },
      
      // Sales Orders
      { id: 29, name: 'sales_orders.view', description: 'View sales orders', module: 'Sales Orders' },
      { id: 30, name: 'sales_orders.create', description: 'Create sales orders', module: 'Sales Orders' },
      { id: 31, name: 'sales_orders.edit', description: 'Edit sales orders', module: 'Sales Orders' },
      { id: 32, name: 'sales_orders.delete', description: 'Delete sales orders', module: 'Sales Orders' },
      { id: 33, name: 'sales_orders.approve', description: 'Approve sales orders', module: 'Sales Orders' },
      
      // Invoices
      { id: 34, name: 'invoices.view', description: 'View invoices', module: 'Invoices' },
      { id: 35, name: 'invoices.create', description: 'Create invoices', module: 'Invoices' },
      { id: 36, name: 'invoices.edit', description: 'Edit invoices', module: 'Invoices' },
      { id: 37, name: 'invoices.delete', description: 'Delete invoices', module: 'Invoices' },
      { id: 38, name: 'invoices.send', description: 'Send invoices to customers', module: 'Invoices' },
      
      // Procurement Quotations
      { id: 39, name: 'quotations.procurement.view', description: 'View procurement quotations', module: 'Procurement Quotations' },
      { id: 40, name: 'quotations.procurement.create', description: 'Create procurement quotations', module: 'Procurement Quotations' },
      { id: 41, name: 'quotations.procurement.edit', description: 'Edit procurement quotations', module: 'Procurement Quotations' },
      { id: 42, name: 'quotations.procurement.delete', description: 'Delete procurement quotations', module: 'Procurement Quotations' },
      { id: 43, name: 'quotations.procurement.approve', description: 'Approve procurement quotations', module: 'Procurement Quotations' },
      
      // Purchase Orders
      { id: 44, name: 'purchase_orders.view', description: 'View purchase orders', module: 'Purchase Orders' },
      { id: 45, name: 'purchase_orders.create', description: 'Create purchase orders', module: 'Purchase Orders' },
      { id: 46, name: 'purchase_orders.edit', description: 'Edit purchase orders', module: 'Purchase Orders' },
      { id: 47, name: 'purchase_orders.delete', description: 'Delete purchase orders', module: 'Purchase Orders' },
      { id: 48, name: 'purchase_orders.approve', description: 'Approve purchase orders', module: 'Purchase Orders' },
      
      // Bills
      { id: 49, name: 'bills.view', description: 'View bills', module: 'Bills' },
      { id: 50, name: 'bills.create', description: 'Create/upload bills', module: 'Bills' },
      { id: 51, name: 'bills.edit', description: 'Edit bills', module: 'Bills' },
      { id: 52, name: 'bills.delete', description: 'Delete bills', module: 'Bills' },
      { id: 53, name: 'bills.approve', description: 'Approve bills for payment', module: 'Bills' },
      
      // Payments
      { id: 54, name: 'payments.view', description: 'View payments', module: 'Payments' },
      { id: 55, name: 'payments.record', description: 'Record payments', module: 'Payments' },
      { id: 56, name: 'payments.approve', description: 'Approve payments', module: 'Payments' },
      
      // Reports
      { id: 57, name: 'reports.sales', description: 'View sales reports', module: 'Reports' },
      { id: 58, name: 'reports.procurement', description: 'View procurement reports', module: 'Reports' },
      { id: 59, name: 'reports.financial', description: 'View financial reports', module: 'Reports' },
      { id: 60, name: 'reports.analytics', description: 'View analytics dashboard', module: 'Reports' },
      
      // Followups
      { id: 61, name: 'followups.view', description: 'View followups', module: 'Followups' },
      { id: 62, name: 'followups.create', description: 'Create followups', module: 'Followups' },
      { id: 63, name: 'followups.edit', description: 'Edit followups', module: 'Followups' },
      { id: 64, name: 'followups.delete', description: 'Delete followups', module: 'Followups' },
      
      // System
      { id: 65, name: 'settings.view', description: 'View system settings', module: 'System' },
      { id: 66, name: 'settings.edit', description: 'Edit system settings', module: 'System' },
      { id: 67, name: 'activity_logs.view', description: 'View activity logs', module: 'System' },
      { id: 68, name: 'attachments.upload', description: 'Upload attachments', module: 'System' },
      { id: 69, name: 'attachments.delete', description: 'Delete attachments', module: 'System' }
    ];
    setPermissions(mockPermissions);
  };

  const fetchRolePermissions = async (roleId) => {
    // Simulate API call to get permissions for a specific role
    const rolePermissionsMap = {
      1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69],
      2: [1, 2, 3, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 67, 68, 69],
      3: [1, 6, 7, 8, 9, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 54, 57, 59, 60, 61, 62, 63, 64, 67, 68, 69],
      4: [6, 7, 8, 14, 15, 16, 19, 20, 21, 24, 25, 26, 29, 30, 34, 57, 60, 61, 62, 63, 68],
      5: [1, 10, 11, 12, 13, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 58, 59, 60, 61, 62, 63, 64, 67, 68, 69],
      6: [10, 11, 12, 39, 40, 41, 44, 45, 46, 49, 50, 51, 54, 58, 60, 61, 62, 63, 68]
    };
    return rolePermissionsMap[roleId] || [];
  };

  // Handlers
  const handleAddUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newUserId = users.length + 1;
      const role = roles.find(r => r.id === parseInt(newUser.role_id));
      
      const userToAdd = {
        id: newUserId,
        ...newUser,
        role_name: role?.name || '',
        permission_count: role?.permission_count || 0,
        created_at: new Date().toISOString().split('T')[0]
      };
      
      setUsers([...users, userToAdd]);
      setShowAddUserModal(false);
      setNewUser({
        username: '',
        email: '',
        full_name: '',
        phone: '',
        password: '',
        role_id: '',
        is_active: true
      });
      setLoading(false);
      alert('User created successfully!');
    }, 500);
  };

  const handleEditUser = (user) => {
    setSelectedUser({...user});
    setShowEditUserModal(true);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const role = roles.find(r => r.id === parseInt(selectedUser.role_id));
      const updatedUser = {
        ...selectedUser,
        role_name: role?.name || '',
        permission_count: role?.permission_count || 0
      };
      
      setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
      setShowEditUserModal(false);
      setSelectedUser(null);
      setLoading(false);
      alert('User updated successfully!');
    }, 500);
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setUsers(users.filter(u => u.id !== userId));
        setLoading(false);
        alert('User deleted successfully!');
      }, 500);
    }
  };

  const handleToggleUserStatus = async (userId) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setUsers(users.map(u => 
        u.id === userId ? {...u, is_active: !u.is_active} : u
      ));
      setLoading(false);
    }, 300);
  };

  const handleViewPermissions = async (role) => {
    setSelectedRole(role);
    const permissionIds = await fetchRolePermissions(role.id);
    const rolePermissions = permissions.filter(p => permissionIds.includes(p.id));
    setSelectedRole({...role, permissions: rolePermissions});
    setShowPermissionsModal(true);
  };

  const handleEditPermissions = async (role) => {
    setSelectedRole(role);
    const permissionIds = await fetchRolePermissions(role.id);
    setSelectedRolePermissions(permissionIds);
    setShowEditPermissionsModal(true);
  };

  const handleTogglePermission = (permissionId) => {
    if (selectedRolePermissions.includes(permissionId)) {
      setSelectedRolePermissions(selectedRolePermissions.filter(id => id !== permissionId));
    } else {
      setSelectedRolePermissions([...selectedRolePermissions, permissionId]);
    }
  };

  const handleSavePermissions = async () => {
    setLoading(true);
    // Simulate API call to save role permissions
    setTimeout(() => {
      // Update the role's permission count
      const updatedRoles = roles.map(r => 
        r.id === selectedRole.id 
          ? {...r, permission_count: selectedRolePermissions.length}
          : r
      );
      setRoles(updatedRoles);
      
      // Update users with this role
      const updatedUsers = users.map(u => 
        u.role_id === selectedRole.id
          ? {...u, permission_count: selectedRolePermissions.length}
          : u
      );
      setUsers(updatedUsers);
      
      setShowEditPermissionsModal(false);
      setSelectedRole(null);
      setSelectedRolePermissions([]);
      setLoading(false);
      alert('Permissions updated successfully!');
    }, 500);
  };

  const handleSelectAllInModule = (module) => {
    const modulePermissions = permissions.filter(p => p.module === module);
    const modulePermissionIds = modulePermissions.map(p => p.id);
    const allSelected = modulePermissionIds.every(id => selectedRolePermissions.includes(id));
    
    if (allSelected) {
      // Deselect all in module
      setSelectedRolePermissions(selectedRolePermissions.filter(id => !modulePermissionIds.includes(id)));
    } else {
      // Select all in module
      const newPermissions = [...new Set([...selectedRolePermissions, ...modulePermissionIds])];
      setSelectedRolePermissions(newPermissions);
    }
  };

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = filterRole === 'all' || user.role_id === parseInt(filterRole);
    
    return matchesSearch && matchesRole;
  });

  // Group permissions by module
  const groupPermissionsByModule = (perms) => {
    const grouped = {};
    perms.forEach(perm => {
      if (!grouped[perm.module]) {
        grouped[perm.module] = [];
      }
      grouped[perm.module].push(perm);
    });
    return grouped;
  };

  const groupedPermissions = groupPermissionsByModule(permissions);

  return (
    <div className="users-page-container">
      {/* Header */}
      <div className="users-page-header">
        <div className="users-page-header-left">
          <h1 className="users-page-title">User Management</h1>
          <p className="users-page-subtitle">Manage users, roles, and permissions</p>
        </div>
        <button 
          className="users-page-btn users-page-btn-primary"
          onClick={() => setShowAddUserModal(true)}
        >
          <span className="users-page-icon">+</span>
          Add New User
        </button>
      </div>

      {/* Tabs */}
      <div className="users-page-tabs">
        <button 
          className={`users-page-tab ${activeTab === 'users' ? 'users-page-tab-active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Users ({users.length})
        </button>
        <button 
          className={`users-page-tab ${activeTab === 'roles' ? 'users-page-tab-active' : ''}`}
          onClick={() => setActiveTab('roles')}
        >
          Roles & Permissions ({roles.length})
        </button>
      </div>

      {activeTab === 'users' ? (
        <>
          {/* Filters */}
          <div className="users-page-filters">
            <div className="users-page-search-box">
              <input
                type="text"
                className="users-page-search-input"
                placeholder="Search by name, email, or username..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="users-page-search-icon">🔍</span>
            </div>
            
            <select 
              className="users-page-filter-select"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <option value="all">All Roles</option>
              {roles.map(role => (
                <option key={role.id} value={role.id}>{role.name}</option>
              ))}
            </select>
          </div>

          {/* Statistics */}
          <div className="users-page-stats">
            <div className="users-page-stat-card">
              <div className="users-page-stat-number">{users.length}</div>
              <div className="users-page-stat-label">Total Users</div>
            </div>
            <div className="users-page-stat-card">
              <div className="users-page-stat-number">{users.filter(u => u.is_active).length}</div>
              <div className="users-page-stat-label">Active Users</div>
            </div>
            <div className="users-page-stat-card">
              <div className="users-page-stat-number">{roles.length}</div>
              <div className="users-page-stat-label">Roles</div>
            </div>
            <div className="users-page-stat-card">
              <div className="users-page-stat-number">{permissions.length}</div>
              <div className="users-page-stat-label">Permissions</div>
            </div>
          </div>

          {/* Users Table */}
          <div className="users-page-table-container">
            {loading ? (
              <div className="users-page-loading">Loading...</div>
            ) : (
              <table className="users-page-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th>Permissions</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user.id} className={!user.is_active ? 'users-page-row-inactive' : ''}>
                      <td>
                        <div className="users-page-user-info">
                          <div className="users-page-user-avatar">
                            {user.full_name.charAt(0)}
                          </div>
                          <div>
                            <div className="users-page-user-name">{user.full_name}</div>
                            <div className="users-page-user-username">@{user.username}</div>
                          </div>
                        </div>
                      </td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>
                        <span className={`users-page-badge users-page-badge-role-${user.role_id}`}>
                          {user.role_name}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="users-page-btn-link"
                          onClick={() => handleViewPermissions(roles.find(r => r.id === user.role_id))}
                        >
                          {user.permission_count} permissions
                        </button>
                      </td>
                      <td>
                        <label className="users-page-toggle">
                          <input
                            type="checkbox"
                            checked={user.is_active}
                            onChange={() => handleToggleUserStatus(user.id)}
                          />
                          <span className="users-page-toggle-slider"></span>
                        </label>
                      </td>
                      <td>{user.created_at}</td>
                      <td>
                        <div className="users-page-actions">
                          <button 
                            className="users-page-btn-icon"
                            onClick={() => handleEditUser(user)}
                            title="Edit User"
                          >
                            ✏️
                          </button>
                          <button 
                            className="users-page-btn-icon users-page-btn-danger"
                            onClick={() => handleDeleteUser(user.id)}
                            title="Delete User"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            
            {!loading && filteredUsers.length === 0 && (
              <div className="users-page-empty-state">
                <p>No users found</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          {/* Roles Table */}
          <div className="users-page-roles-grid">
            {roles.map(role => (
              <div key={role.id} className="users-page-role-card">
                <div className="users-page-role-header">
                  <div>
                    <h3 className="users-page-role-name">{role.name}</h3>
                    <p className="users-page-role-description">{role.description}</p>
                  </div>
                  <span className={`users-page-badge users-page-badge-role-${role.id}`}>
                    {role.permission_count} perms
                  </span>
                </div>
                
                <div className="users-page-role-stats">
                  <div className="users-page-role-stat">
                    <span className="users-page-role-stat-label">Users:</span>
                    <span className="users-page-role-stat-value">
                      {users.filter(u => u.role_id === role.id).length}
                    </span>
                  </div>
                  <div className="users-page-role-stat">
                    <span className="users-page-role-stat-label">Permissions:</span>
                    <span className="users-page-role-stat-value">{role.permission_count}</span>
                  </div>
                </div>
                
                <div className="users-page-role-actions">
                  <button 
                    className="users-page-btn users-page-btn-secondary users-page-btn-sm"
                    onClick={() => handleViewPermissions(role)}
                  >
                    View Permissions
                  </button>
                  <button 
                    className="users-page-btn users-page-btn-primary users-page-btn-sm"
                    onClick={() => handleEditPermissions(role)}
                  >
                    Edit Permissions
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="users-page-modal-overlay" onClick={() => setShowAddUserModal(false)}>
          <div className="users-page-modal" onClick={(e) => e.stopPropagation()}>
            <div className="users-page-modal-header">
              <h2>Add New User</h2>
              <button 
                className="users-page-modal-close"
                onClick={() => setShowAddUserModal(false)}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleAddUser}>
              <div className="users-page-modal-body">
                <div className="users-page-form-row">
                  <div className="users-page-form-group">
                    <label>Username *</label>
                    <input
                      type="text"
                      required
                      value={newUser.username}
                      onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                      placeholder="john.doe"
                    />
                  </div>
                  
                  <div className="users-page-form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      required
                      value={newUser.full_name}
                      onChange={(e) => setNewUser({...newUser, full_name: e.target.value})}
                      placeholder="John Doe"
                    />
                  </div>
                </div>
                
                <div className="users-page-form-row">
                  <div className="users-page-form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      required
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                      placeholder="john.doe@istlabs.in"
                    />
                  </div>
                  
                  <div className="users-page-form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      value={newUser.phone}
                      onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                      placeholder="+91-9876543210"
                    />
                  </div>
                </div>
                
                <div className="users-page-form-row">
                  <div className="users-page-form-group">
                    <label>Password *</label>
                    <input
                      type="password"
                      required
                      value={newUser.password}
                      onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                      placeholder="••••••••"
                    />
                  </div>
                  
                  <div className="users-page-form-group">
                    <label>Role *</label>
                    <select
                      required
                      value={newUser.role_id}
                      onChange={(e) => setNewUser({...newUser, role_id: e.target.value})}
                    >
                      <option value="">Select Role</option>
                      {roles.map(role => (
                        <option key={role.id} value={role.id}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="users-page-form-group">
                  <label className="users-page-checkbox-label">
                    <input
                      type="checkbox"
                      checked={newUser.is_active}
                      onChange={(e) => setNewUser({...newUser, is_active: e.target.checked})}
                    />
                    <span>Active User</span>
                  </label>
                </div>
              </div>
              
              <div className="users-page-modal-footer">
                <button 
                  type="button"
                  className="users-page-btn users-page-btn-secondary"
                  onClick={() => setShowAddUserModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="users-page-btn users-page-btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditUserModal && selectedUser && (
        <div className="users-page-modal-overlay" onClick={() => setShowEditUserModal(false)}>
          <div className="users-page-modal" onClick={(e) => e.stopPropagation()}>
            <div className="users-page-modal-header">
              <h2>Edit User</h2>
              <button 
                className="users-page-modal-close"
                onClick={() => setShowEditUserModal(false)}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleUpdateUser}>
              <div className="users-page-modal-body">
                <div className="users-page-form-row">
                  <div className="users-page-form-group">
                    <label>Username</label>
                    <input
                      type="text"
                      required
                      value={selectedUser.username}
                      onChange={(e) => setSelectedUser({...selectedUser, username: e.target.value})}
                    />
                  </div>
                  
                  <div className="users-page-form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      required
                      value={selectedUser.full_name}
                      onChange={(e) => setSelectedUser({...selectedUser, full_name: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="users-page-form-row">
                  <div className="users-page-form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      required
                      value={selectedUser.email}
                      onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
                    />
                  </div>
                  
                  <div className="users-page-form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      value={selectedUser.phone}
                      onChange={(e) => setSelectedUser({...selectedUser, phone: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="users-page-form-group">
                  <label>Role</label>
                  <select
                    required
                    value={selectedUser.role_id}
                    onChange={(e) => setSelectedUser({...selectedUser, role_id: e.target.value})}
                  >
                    <option value="">Select Role</option>
                    {roles.map(role => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="users-page-form-group">
                  <label className="users-page-checkbox-label">
                    <input
                      type="checkbox"
                      checked={selectedUser.is_active}
                      onChange={(e) => setSelectedUser({...selectedUser, is_active: e.target.checked})}
                    />
                    <span>Active User</span>
                  </label>
                </div>
              </div>
              
              <div className="users-page-modal-footer">
                <button 
                  type="button"
                  className="users-page-btn users-page-btn-secondary"
                  onClick={() => setShowEditUserModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="users-page-btn users-page-btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Updating...' : 'Update User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Permissions Modal */}
      {showPermissionsModal && selectedRole && (
        <div className="users-page-modal-overlay" onClick={() => setShowPermissionsModal(false)}>
          <div className="users-page-modal users-page-modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="users-page-modal-header">
              <div>
                <h2>{selectedRole.name} Permissions</h2>
                <p className="users-page-modal-subtitle">{selectedRole.description}</p>
              </div>
              <button 
                className="users-page-modal-close"
                onClick={() => setShowPermissionsModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="users-page-modal-body">
              <div className="users-page-permissions-summary">
                <strong>Total Permissions:</strong> {selectedRole.permissions?.length || 0}
              </div>
              
              {selectedRole.permissions && Object.entries(groupPermissionsByModule(selectedRole.permissions)).map(([module, perms]) => (
                <div key={module} className="users-page-permission-group">
                  <h3 className="users-page-permission-module">{module}</h3>
                  <div className="users-page-permission-list">
                    {perms.map(perm => (
                      <div key={perm.id} className="users-page-permission-item">
                        <span className="users-page-permission-check">✓</span>
                        <div className="users-page-permission-details">
                          <div className="users-page-permission-name">{perm.name}</div>
                          <div className="users-page-permission-desc">{perm.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="users-page-modal-footer">
              <button 
                className="users-page-btn users-page-btn-secondary"
                onClick={() => setShowPermissionsModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Permissions Modal */}
      {showEditPermissionsModal && selectedRole && (
        <div className="users-page-modal-overlay" onClick={() => setShowEditPermissionsModal(false)}>
          <div className="users-page-modal users-page-modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="users-page-modal-header">
              <div>
                <h2>Edit Permissions - {selectedRole.name}</h2>
                <p className="users-page-modal-subtitle">Select permissions for this role</p>
              </div>
              <button 
                className="users-page-modal-close"
                onClick={() => setShowEditPermissionsModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="users-page-modal-body">
              <div className="users-page-permissions-summary">
                <strong>Selected:</strong> {selectedRolePermissions.length} of {permissions.length} permissions
              </div>
              
              {Object.entries(groupedPermissions).map(([module, perms]) => {
                const modulePermissionIds = perms.map(p => p.id);
                const allSelected = modulePermissionIds.every(id => selectedRolePermissions.includes(id));
                const someSelected = modulePermissionIds.some(id => selectedRolePermissions.includes(id));
                
                return (
                  <div key={module} className="users-page-permission-group">
                    <div className="users-page-permission-module-header">
                      <h3 className="users-page-permission-module">{module}</h3>
                      <button
                        type="button"
                        className="users-page-btn-select-all"
                        onClick={() => handleSelectAllInModule(module)}
                      >
                        {allSelected ? 'Deselect All' : 'Select All'}
                      </button>
                    </div>
                    <div className="users-page-permission-checkboxes">
                      {perms.map(perm => (
                        <label key={perm.id} className="users-page-permission-checkbox-item">
                          <input
                            type="checkbox"
                            checked={selectedRolePermissions.includes(perm.id)}
                            onChange={() => handleTogglePermission(perm.id)}
                          />
                          <div className="users-page-permission-checkbox-details">
                            <div className="users-page-permission-name">{perm.name}</div>
                            <div className="users-page-permission-desc">{perm.description}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="users-page-modal-footer">
              <button 
                type="button"
                className="users-page-btn users-page-btn-secondary"
                onClick={() => setShowEditPermissionsModal(false)}
              >
                Cancel
              </button>
              <button 
                type="button"
                className="users-page-btn users-page-btn-primary"
                onClick={handleSavePermissions}
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Permissions'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;