// src/pages/DropdownAdminPage.js
import React, { useState, useEffect } from 'react';
import adminApi from '../services/adminApi';
import filterApi from '../services/filterApi';
import '../pages-css/AddNewDropdownItems.css';

const DropdownAdminPage = () => {
  const [activeTab, setActiveTab] = useState('groups');
  const [groups, setGroups] = useState([]);
  const [subGroups, setSubGroups] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Form states
  const [groupForm, setGroupForm] = useState({
    id: null,
    groupName: '',
    groupLabel: '',
    description: '',
    isActive: true
  });

  const [subGroupForm, setSubGroupForm] = useState({
    id: null,
    subGroupName: '',
    subGroupLabel: '',
    description: '',
    isActive: true,
    groupId: ''
  });

  const [projectForm, setProjectForm] = useState({
    projectUniqueId: '',
    projectName: '',
    description: '',
    location: '',
    startDate: '',
    endDate: '',
    status: 'PLANNING',
    budget: '',
    isActive: true,
    subGroupId: ''
  });

  const [editMode, setEditMode] = useState(false);
  const [availableGroups, setAvailableGroups] = useState([]);
  const [availableSubGroups, setAvailableSubGroups] = useState([]);

  useEffect(() => {
    loadData();
    loadAvailableGroups();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'groups') {
        const data = await adminApi.getAllGroups();
        setGroups(data);
      } else if (activeTab === 'subgroups') {
        const data = await adminApi.getAllSubGroups();
        setSubGroups(data);
      } else if (activeTab === 'projects') {
        const data = await adminApi.getAllProjects();
        setProjects(data);
      }
    } catch (error) {
      showMessage('error', 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const loadAvailableGroups = async () => {
    try {
      const data = await filterApi.getAllGroups();
      setAvailableGroups(data);
    } catch (error) {
      console.error('Failed to load groups:', error);
    }
  };

  const loadAvailableSubGroups = async (groupName) => {
    try {
      const data = await filterApi.getSubGroups(groupName);
      setAvailableSubGroups(data);
    } catch (error) {
      console.error('Failed to load subgroups:', error);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const resetForms = () => {
    setGroupForm({ id: null, groupName: '', groupLabel: '', description: '', isActive: true });
    setSubGroupForm({ id: null, subGroupName: '', subGroupLabel: '', description: '', isActive: true, groupId: '' });
    setProjectForm({
      projectUniqueId: '',
      projectName: '',
      description: '',
      location: '',
      startDate: '',
      endDate: '',
      status: 'PLANNING',
      budget: '',
      isActive: true,
      subGroupId: ''
    });
    setEditMode(false);
  };

  // ============ GROUP HANDLERS ============

  const handleGroupSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editMode) {
        await adminApi.updateGroup(groupForm.id, groupForm);
        showMessage('success', 'Group updated successfully');
      } else {
        await adminApi.createGroup(groupForm);
        showMessage('success', 'Group created successfully');
      }
      resetForms();
      loadData();
      loadAvailableGroups();
    } catch (error) {
      showMessage('error', 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleEditGroup = (group) => {
    setGroupForm(group);
    setEditMode(true);
  };

  const handleDeleteGroup = async (id) => {
    if (!window.confirm('Are you sure you want to delete this group?')) return;
    
    setLoading(true);
    try {
      await adminApi.deleteGroup(id);
      showMessage('success', 'Group deleted successfully');
      loadData();
      loadAvailableGroups();
    } catch (error) {
      showMessage('error', 'Failed to delete group');
    } finally {
      setLoading(false);
    }
  };

  // ============ SUBGROUP HANDLERS ============

  const handleSubGroupSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editMode) {
        await adminApi.updateSubGroup(subGroupForm.id, subGroupForm);
        showMessage('success', 'SubGroup updated successfully');
      } else {
        await adminApi.createSubGroup(subGroupForm, subGroupForm.groupId);
        showMessage('success', 'SubGroup created successfully');
      }
      resetForms();
      loadData();
    } catch (error) {
      showMessage('error', 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubGroup = (subGroup) => {
    setSubGroupForm({
      ...subGroup,
      groupId: subGroup.group?.id || ''
    });
    setEditMode(true);
  };

  const handleDeleteSubGroup = async (id) => {
    if (!window.confirm('Are you sure you want to delete this subgroup?')) return;
    
    setLoading(true);
    try {
      await adminApi.deleteSubGroup(id);
      showMessage('success', 'SubGroup deleted successfully');
      loadData();
    } catch (error) {
      showMessage('error', 'Failed to delete subgroup');
    } finally {
      setLoading(false);
    }
  };

  // ============ PROJECT HANDLERS ============

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editMode) {
        await adminApi.updateProject(projectForm.projectUniqueId, projectForm);
        showMessage('success', 'Project updated successfully');
      } else {
        await adminApi.createProject(projectForm, projectForm.subGroupId);
        showMessage('success', 'Project created successfully');
      }
      resetForms();
      loadData();
    } catch (error) {
      showMessage('error', 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleEditProject = (project) => {
    setProjectForm({
      ...project,
      subGroupId: project.subGroup?.id || '',
      startDate: project.startDate || '',
      endDate: project.endDate || '',
      budget: project.budget || ''
    });
    setEditMode(true);
  };

  const handleDeleteProject = async (projectUniqueId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    
    setLoading(true);
    try {
      await adminApi.deleteProject(projectUniqueId);
      showMessage('success', 'Project deleted successfully');
      loadData();
    } catch (error) {
      showMessage('error', 'Failed to delete project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Dropdown Management</h1>
        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}
      </div>

      <div className="admin-tabs">
        <button
          className={`tab ${activeTab === 'groups' ? 'active' : ''}`}
          onClick={() => { setActiveTab('groups'); resetForms(); }}
        >
          Groups
        </button>
        <button
          className={`tab ${activeTab === 'subgroups' ? 'active' : ''}`}
          onClick={() => { setActiveTab('subgroups'); resetForms(); }}
        >
          SubGroups
        </button>
        <button
          className={`tab ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => { setActiveTab('projects'); resetForms(); }}
        >
          Projects
        </button>
      </div>

      <div className="admin-content">
        {/* GROUP TAB */}
        {activeTab === 'groups' && (
          <div className="tab-content">
            <div className="form-section">
              <h2>{editMode ? 'Edit Group' : 'Add New Group'}</h2>
              <form onSubmit={handleGroupSubmit} className="admin-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Group Name *</label>
                    <input
                      type="text"
                      value={groupForm.groupName}
                      onChange={(e) => setGroupForm({ ...groupForm, groupName: e.target.value })}
                      required
                      placeholder="e.g., Solar"
                    />
                  </div>
                  <div className="form-group">
                    <label>Group Label *</label>
                    <input
                      type="text"
                      value={groupForm.groupLabel}
                      onChange={(e) => setGroupForm({ ...groupForm, groupLabel: e.target.value })}
                      required
                      placeholder="e.g., Solar"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={groupForm.description}
                    onChange={(e) => setGroupForm({ ...groupForm, description: e.target.value })}
                    placeholder="Group description"
                    rows="3"
                  />
                </div>
                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={groupForm.isActive}
                      onChange={(e) => setGroupForm({ ...groupForm, isActive: e.target.checked })}
                    />
                    Active
                  </label>
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? 'Saving...' : editMode ? 'Update' : 'Create'}
                  </button>
                  {editMode && (
                    <button type="button" className="btn-secondary" onClick={resetForms}>
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="table-section">
              <h2>Existing Groups</h2>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Label</th>
                    <th>Description</th>
                    <th>Active</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {groups.map(group => (
                    <tr key={group.id}>
                      <td>{group.id}</td>
                      <td>{group.groupName}</td>
                      <td>{group.groupLabel}</td>
                      <td>{group.description || '-'}</td>
                      <td>
                        <span className={`status-badge ${group.isActive ? 'active' : 'inactive'}`}>
                          {group.isActive ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td>
                        <button className="btn-edit" onClick={() => handleEditGroup(group)}>
                          Edit
                        </button>
                        <button className="btn-delete" onClick={() => handleDeleteGroup(group.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SUBGROUP TAB */}
        {activeTab === 'subgroups' && (
          <div className="tab-content">
            <div className="form-section">
              <h2>{editMode ? 'Edit SubGroup' : 'Add New SubGroup'}</h2>
              <form onSubmit={handleSubGroupSubmit} className="admin-form">
                <div className="form-group">
                  <label>Parent Group *</label>
                  <select
                    value={subGroupForm.groupId}
                    onChange={(e) => setSubGroupForm({ ...subGroupForm, groupId: e.target.value })}
                    required
                  >
                    <option value="">Select Group</option>
                    {availableGroups.map(group => (
                      <option key={group.value} value={group.value}>
                        {group.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>SubGroup Name *</label>
                    <input
                      type="text"
                      value={subGroupForm.subGroupName}
                      onChange={(e) => setSubGroupForm({ ...subGroupForm, subGroupName: e.target.value })}
                      required
                      placeholder="e.g., Solar Rooftop"
                    />
                  </div>
                  <div className="form-group">
                    <label>SubGroup Label *</label>
                    <input
                      type="text"
                      value={subGroupForm.subGroupLabel}
                      onChange={(e) => setSubGroupForm({ ...subGroupForm, subGroupLabel: e.target.value })}
                      required
                      placeholder="e.g., Solar Rooftop"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={subGroupForm.description}
                    onChange={(e) => setSubGroupForm({ ...subGroupForm, description: e.target.value })}
                    placeholder="SubGroup description"
                    rows="3"
                  />
                </div>
                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={subGroupForm.isActive}
                      onChange={(e) => setSubGroupForm({ ...subGroupForm, isActive: e.target.checked })}
                    />
                    Active
                  </label>
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? 'Saving...' : editMode ? 'Update' : 'Create'}
                  </button>
                  {editMode && (
                    <button type="button" className="btn-secondary" onClick={resetForms}>
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="table-section">
              <h2>Existing SubGroups</h2>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Group</th>
                    <th>Name</th>
                    <th>Label</th>
                    <th>Description</th>
                    <th>Active</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subGroups.map(subGroup => (
                    <tr key={subGroup.id}>
                      <td>{subGroup.id}</td>
                      <td>{subGroup.group?.groupName || '-'}</td>
                      <td>{subGroup.subGroupName}</td>
                      <td>{subGroup.subGroupLabel}</td>
                      <td>{subGroup.description || '-'}</td>
                      <td>
                        <span className={`status-badge ${subGroup.isActive ? 'active' : 'inactive'}`}>
                          {subGroup.isActive ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td>
                        <button className="btn-edit" onClick={() => handleEditSubGroup(subGroup)}>
                          Edit
                        </button>
                        <button className="btn-delete" onClick={() => handleDeleteSubGroup(subGroup.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PROJECT TAB */}
        {activeTab === 'projects' && (
          <div className="tab-content">
            <div className="form-section">
              <h2>{editMode ? 'Edit Project' : 'Add New Project'}</h2>
              <form onSubmit={handleProjectSubmit} className="admin-form">
                <div className="form-group">
                  <label>Parent SubGroup *</label>
                  <select
                    value={projectForm.subGroupId}
                    onChange={(e) => setProjectForm({ ...projectForm, subGroupId: e.target.value })}
                    required
                    disabled={editMode}
                  >
                    <option value="">Select SubGroup</option>
                    {/* You'll need to load all subgroups here */}
                  </select>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Project Name *</label>
                    <input
                      type="text"
                      value={projectForm.projectName}
                      onChange={(e) => setProjectForm({ ...projectForm, projectName: e.target.value })}
                      required
                      placeholder="e.g., CCMS Nandyal"
                    />
                  </div>
                  <div className="form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      value={projectForm.location}
                      onChange={(e) => setProjectForm({ ...projectForm, location: e.target.value })}
                      placeholder="e.g., Nandyal, AP"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    placeholder="Project description"
                    rows="3"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Start Date</label>
                    <input
                      type="date"
                      value={projectForm.startDate}
                      onChange={(e) => setProjectForm({ ...projectForm, startDate: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>End Date</label>
                    <input
                      type="date"
                      value={projectForm.endDate}
                      onChange={(e) => setProjectForm({ ...projectForm, endDate: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      value={projectForm.status}
                      onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value })}
                    >
                      <option value="PLANNING">Planning</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="COMPLETED">Completed</option>
                      <option value="ON_HOLD">On Hold</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Budget</label>
                    <input
                      type="number"
                      value={projectForm.budget}
                      onChange={(e) => setProjectForm({ ...projectForm, budget: e.target.value })}
                      placeholder="e.g., 5000000"
                      step="0.01"
                    />
                  </div>
                </div>
                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={projectForm.isActive}
                      onChange={(e) => setProjectForm({ ...projectForm, isActive: e.target.checked })}
                    />
                    Active
                  </label>
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? 'Saving...' : editMode ? 'Update' : 'Create'}
                  </button>
                  {editMode && (
                    <button type="button" className="btn-secondary" onClick={resetForms}>
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="table-section">
              <h2>Existing Projects</h2>
              <div className="table-scroll">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Project ID</th>
                      <th>Name</th>
                      <th>SubGroup</th>
                      <th>Location</th>
                      <th>Status</th>
                      <th>Budget</th>
                      <th>Active</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map(project => (
                      <tr key={project.id}>
                        <td>{project.projectUniqueId}</td>
                        <td>{project.projectName}</td>
                        <td>{project.subGroup?.subGroupName || '-'}</td>
                        <td>{project.location || '-'}</td>
                        <td>
                          <span className={`status-badge status-${project.status?.toLowerCase()}`}>
                            {project.status}
                          </span>
                        </td>
                        <td>{project.budget ? `₹${Number(project.budget).toLocaleString('en-IN')}` : '-'}</td>
                        <td>
                          <span className={`status-badge ${project.isActive ? 'active' : 'inactive'}`}>
                            {project.isActive ? 'Yes' : 'No'}
                          </span>
                        </td>
                        <td>
                          <button className="btn-edit" onClick={() => handleEditProject(project)}>
                            Edit
                          </button>
                          <button className="btn-delete" onClick={() => handleDeleteProject(project.projectUniqueId)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownAdminPage;