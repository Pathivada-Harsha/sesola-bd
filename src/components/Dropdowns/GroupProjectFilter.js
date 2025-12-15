import React from 'react';
import '../../components_css/Dropdowns/GroupProjectFilter.css';


const GroupProjectFilter = ({ 
  groupValue, 
  projectValue, 
  onChange 
}) => {
  // Static Groups
  const groups = [
    { value: 'CCMS', label: 'CCMS' },
    { value: 'Solar', label: 'Solar' },
    { value: 'EPC', label: 'EPC' },
    { value: 'IoT', label: 'IoT' },
    { value: 'Hybrid', label: 'Hybrid' },
    { value: 'Others', label: 'Others' }
  ];

  // Static Projects mapped by group
  const projectsByGroup = {
    'CCMS': [
      { id: 'ccms-1', name: 'Smart City Phase 1' },
      { id: 'ccms-2', name: 'Traffic Control System' },
      { id: 'ccms-3', name: 'Municipal Dashboard' }
    ],
    'Solar': [
      { id: 'solar-1', name: 'Rooftop Solar - Corporate Park' },
      { id: 'solar-2', name: 'Solar Farm 50MW' },
      { id: 'solar-3', name: 'Residential Solar Program' }
    ],
    'EPC': [
      { id: 'epc-1', name: 'Industrial Plant Construction' },
      { id: 'epc-2', name: 'Commercial Building Project' },
      { id: 'epc-3', name: 'Infrastructure Development' }
    ],
    'IoT': [
      { id: 'iot-1', name: 'Smart Sensors Deployment' },
      { id: 'iot-2', name: 'Asset Tracking System' },
      { id: 'iot-3', name: 'Environmental Monitoring' }
    ],
    'Hybrid': [
      { id: 'hybrid-1', name: 'Solar + Storage Integration' },
      { id: 'hybrid-2', name: 'Multi-source Energy System' }
    ],
    'Others': [
      { id: 'other-1', name: 'Consulting Services' },
      { id: 'other-2', name: 'R&D Initiative' }
    ]
  };

  // Get projects for selected group
  const projects = groupValue ? (projectsByGroup[groupValue] || []) : [];

  const handleGroupChange = (e) => {
    const newGroup = e.target.value;
    const newFilters = {
      groupName: newGroup,
      projectId: '' // Reset project when group changes
    };
    
    // Save to localStorage
    localStorage.setItem('groupProjectFilters', JSON.stringify(newFilters));
    
    // Call parent onChange
    if (typeof onChange === 'function') {
      onChange(newFilters);
    }
  };

  const handleProjectChange = (e) => {
    const newFilters = {
      groupName: groupValue,
      projectId: e.target.value
    };
    
    // Save to localStorage
    localStorage.setItem('groupProjectFilters', JSON.stringify(newFilters));
    
    // Call parent onChange
    if (typeof onChange === 'function') {
      onChange(newFilters);
    }
  };

  return (
    <div className="group-project-filter">
      <div className="filter-group">
        <label htmlFor="group-filter" className="filter-label">
          Group
        </label>
        <select
          id="group-filter"
          className="filter-select"
          value={groupValue || ''}
          onChange={handleGroupChange}
        >
          <option value="">Select Group</option>
          {groups.map(group => (
            <option key={group.value} value={group.value}>
              {group.label}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="project-filter" className="filter-label">
          Project
        </label>
        <select
          id="project-filter"
          className="filter-select"
          value={projectValue || ''}
          onChange={handleProjectChange}
          disabled={!groupValue}
        >
          <option value="">
            {!groupValue ? 'Select Group First' : 'Select Project'}
          </option>
          {projects.map(project => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default GroupProjectFilter;