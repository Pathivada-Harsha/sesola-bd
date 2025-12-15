import React, { useState } from 'react';
import { Plus, Save, Copy, Trash2, GripVertical, ChevronDown, ChevronRight } from 'lucide-react';

const ReportBuilder = ({
  reportConfig,
  onTemplateSelect,
  onSectionAdd,
  onSectionUpdate,
  onSectionDelete,
  onSectionMove,
  onConfigChange
}) => {
  const [expandedSections, setExpandedSections] = useState({
    templates: true,
    fields: true,
    widgets: false
  });
  const [selectedWidget, setSelectedWidget] = useState(null);

  // Sample templates
  const sampleTemplates = [
    {
      id: 'blank',
      name: 'Blank Report',
      description: 'Start from scratch',
      icon: '📄',
      filters: [],
      sections: []
    },
    {
      id: 'sales-summary',
      name: 'Sales Summary',
      description: 'Monthly sales KPIs and orders',
      icon: '📊',
      filters: [
        { field: 'date', operator: 'BETWEEN', value: ['2024-11-01', '2024-11-30'] }
      ],
      sections: [
        {
          type: 'kpi',
          title: 'Key Metrics',
          metrics: [
            { field: 'orders_count', label: 'Total Orders' },
            { field: 'invoice_value', label: 'Revenue', prefix: '₹' },
            { field: 'conversion_rate', label: 'Conversion Rate', suffix: '%' }
          ]
        },
        {
          type: 'table',
          title: 'Recent Orders',
          columns: ['order_id', 'customer_name', 'order_date', 'amount', 'status']
        },
        {
          type: 'chart',
          title: 'Revenue Trend',
          chartType: 'line',
          xAxis: 'month',
          metrics: [{ field: 'revenue', label: 'Monthly Revenue', color: '#3b82f6' }]
        }
      ]
    },
    {
      id: 'procurement-spend',
      name: 'Procurement Spend',
      description: 'Vendor spending analysis',
      icon: '💰',
      filters: [],
      sections: [
        {
          type: 'kpi',
          title: 'Procurement Overview',
          metrics: [
            { field: 'pos_count', label: 'Purchase Orders' },
            { field: 'po_value', label: 'Total Spend', prefix: '₹' },
            { field: 'vendor_count', label: 'Active Vendors' }
          ]
        },
        {
          type: 'table',
          title: 'Vendor Spending',
          columns: ['vendor_name', 'po_count', 'total_spend', 'avg_po_value']
        },
        {
          type: 'chart',
          title: 'Spend by Vendor',
          chartType: 'donut',
          metrics: [{ field: 'vendor_spend', label: 'Vendor', color: '#8b5cf6' }]
        }
      ]
    },
    {
      id: 'outstanding-invoices',
      name: 'Outstanding Invoices',
      description: 'Pending payments report',
      icon: '💳',
      filters: [
        { field: 'payment_status', operator: '=', value: 'Pending' }
      ],
      sections: [
        {
          type: 'kpi',
          title: 'Payment Summary',
          metrics: [
            { field: 'outstanding_count', label: 'Pending Invoices' },
            { field: 'outstanding_amount', label: 'Total Outstanding', prefix: '₹' }
          ]
        },
        {
          type: 'table',
          title: 'Outstanding Invoices List',
          columns: ['invoice_id', 'customer_name', 'invoice_date', 'due_date', 'amount', 'days_overdue']
        }
      ]
    }
  ];

  // Available fields grouped by domain
  const availableFields = {
    Sales: [
      { field: 'lead_count', label: 'Lead Count', type: 'number' },
      { field: 'leads_by_source', label: 'Leads by Source', type: 'string' },
      { field: 'proposals_count', label: 'Proposals', type: 'number' },
      { field: 'orders_count', label: 'Orders', type: 'number' },
      { field: 'invoice_value', label: 'Invoice Value', type: 'currency' },
      { field: 'outstanding_amount', label: 'Outstanding', type: 'currency' },
      { field: 'conversion_rate', label: 'Conversion Rate', type: 'percentage' }
    ],
    Procurement: [
      { field: 'quotations_received', label: 'Quotations', type: 'number' },
      { field: 'approved_quotations', label: 'Approved Quotations', type: 'number' },
      { field: 'pos_count', label: 'POs Count', type: 'number' },
      { field: 'po_value', label: 'PO Value', type: 'currency' },
      { field: 'bills_received', label: 'Bills', type: 'number' },
      { field: 'vendor_spend', label: 'Vendor Spend', type: 'currency' }
    ],
    Customer: [
      { field: 'customer_id', label: 'Customer ID', type: 'string' },
      { field: 'customer_name', label: 'Customer Name', type: 'string' },
      { field: 'group_name', label: 'Group', type: 'string' },
      { field: 'contact', label: 'Contact', type: 'string' },
      { field: 'city', label: 'City', type: 'string' },
      { field: 'assigned_to', label: 'Assigned To', type: 'string' }
    ],
    'Time & Meta': [
      { field: 'date', label: 'Date', type: 'date' },
      { field: 'month', label: 'Month', type: 'string' },
      { field: 'quarter', label: 'Quarter', type: 'string' },
      { field: 'year', label: 'Year', type: 'number' },
      { field: 'region', label: 'Region', type: 'string' },
      { field: 'team_member', label: 'Team Member', type: 'string' }
    ]
  };

  // Widget types
  const widgetTypes = [
    { type: 'kpi', label: 'KPI Cards', icon: '📊', description: 'Single metrics with trends' },
    { type: 'table', label: 'Data Table', icon: '📋', description: 'Tabular data display' },
    { type: 'chart', label: 'Chart', icon: '📈', description: 'Bar, Line, Pie charts' },
    { type: 'text', label: 'Text Block', icon: '📝', description: 'Rich text content' }
  ];

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  const handleAddWidget = (widgetType) => {
    let newSection = { type: widgetType };
    
    if (widgetType === 'kpi') {
      newSection = {
        type: 'kpi',
        title: 'Key Metrics',
        metrics: []
      };
    } else if (widgetType === 'table') {
      newSection = {
        type: 'table',
        title: 'Data Table',
        columns: []
      };
    } else if (widgetType === 'chart') {
      newSection = {
        type: 'chart',
        title: 'Chart',
        chartType: 'bar',
        xAxis: 'month',
        metrics: []
      };
    } else if (widgetType === 'text') {
      newSection = {
        type: 'text',
        title: 'Text Block',
        content: 'Enter your text here...'
      };
    }
    
    onSectionAdd(newSection);
    setSelectedWidget(null);
  };

  return (
    <div className="report-builder">
      <div className="report-builder-header">
        <h2>Report Builder</h2>
      </div>

      {/* Templates Section */}
      <div className="builder-section">
        <button 
          className="builder-section-header"
          onClick={() => toggleSection('templates')}
        >
          {expandedSections.templates ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          <span>Templates</span>
        </button>
        
        {expandedSections.templates && (
          <div className="builder-section-content">
            <div className="templates-grid">
              {sampleTemplates.map(template => (
                <div
                  key={template.id}
                  className="template-card"
                  onClick={() => onTemplateSelect(template)}
                >
                  <div className="template-icon">{template.icon}</div>
                  <div className="template-info">
                    <div className="template-name">{template.name}</div>
                    <div className="template-desc">{template.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Widgets Section */}
      <div className="builder-section">
        <button 
          className="builder-section-header"
          onClick={() => toggleSection('widgets')}
        >
          {expandedSections.widgets ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          <span>Add Widgets</span>
        </button>
        
        {expandedSections.widgets && (
          <div className="builder-section-content">
            <div className="widgets-list">
              {widgetTypes.map(widget => (
                <button
                  key={widget.type}
                  className="widget-item"
                  onClick={() => handleAddWidget(widget.type)}
                >
                  <span className="widget-icon">{widget.icon}</span>
                  <div className="widget-info">
                    <div className="widget-label">{widget.label}</div>
                    <div className="widget-desc">{widget.description}</div>
                  </div>
                  <Plus size={16} />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Available Fields Section */}
      <div className="builder-section">
        <button 
          className="builder-section-header"
          onClick={() => toggleSection('fields')}
        >
          {expandedSections.fields ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          <span>Available Fields</span>
        </button>
        
        {expandedSections.fields && (
          <div className="builder-section-content">
            {Object.entries(availableFields).map(([category, fields]) => (
              <div key={category} className="fields-category">
                <div className="fields-category-label">{category}</div>
                <div className="fields-list">
                  {fields.map(field => (
                    <div
                      key={field.field}
                      className="field-item"
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData('field', JSON.stringify(field));
                      }}
                    >
                      <GripVertical size={14} />
                      <span>{field.label}</span>
                      <span className="field-type">{field.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Report Sections */}
      <div className="builder-section">
        <div className="builder-section-header" style={{ cursor: 'default' }}>
          <span>Report Sections ({reportConfig.sections.length})</span>
        </div>
        
        <div className="builder-section-content">
          {reportConfig.sections.length === 0 ? (
            <div className="empty-state">
              <p>No sections added yet</p>
              <p className="empty-state-hint">Add widgets above to start building your report</p>
            </div>
          ) : (
            <div className="sections-list">
              {reportConfig.sections.map((section, index) => (
                <div key={index} className="section-preview-item">
                  <div className="section-preview-drag">
                    <GripVertical size={16} />
                  </div>
                  <div className="section-preview-info">
                    <div className="section-preview-type">{section.type.toUpperCase()}</div>
                    <div className="section-preview-title">{section.title || `Section ${index + 1}`}</div>
                  </div>
                  <div className="section-preview-actions">
                    <button
                      className="section-action-btn"
                      onClick={() => onSectionDelete(index)}
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportBuilder;