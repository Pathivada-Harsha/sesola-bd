import React, { useState, useEffect } from 'react';
import ReportBuilder from './Reports/ReportBuilder';
import ReportConfig from './Reports/ReportConfig';
import ReportPreview from './Reports/ReportPreview';
import '../pages-css/Reports.css';

const ReportsPage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [reportConfig, setReportConfig] = useState({
    name: 'Untitled Report',
    description: '',
    owner: 'Current User',
    visibility: 'private',
    tags: [],
    filters: [],
    sections: [],
    groupBy: [],
    sortBy: [],
    schedule: null
  });
  const [previewData, setPreviewData] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [exportHistory, setExportHistory] = useState([]);
  const [activePane, setActivePane] = useState('builder'); // for mobile

  // Load mock data and templates on mount
  useEffect(() => {
    loadSampleTemplates();
    loadExportHistory();
  }, []);

  const loadSampleTemplates = () => {
    // Templates will be loaded in ReportBuilder
  };

  const loadExportHistory = () => {
    const mockHistory = [
      {
        id: 1,
        reportName: 'Sales Summary - Q4 2024',
        generatedAt: '2024-12-10 14:30',
        format: 'DOCX',
        size: '2.4 MB',
        status: 'completed',
        downloadUrl: '#'
      },
      {
        id: 2,
        reportName: 'Procurement Spend Analysis',
        generatedAt: '2024-12-09 10:15',
        format: 'PDF',
        size: '1.8 MB',
        status: 'completed',
        downloadUrl: '#'
      },
      {
        id: 3,
        reportName: 'Outstanding Invoices',
        generatedAt: '2024-12-08 16:45',
        format: 'DOCX',
        size: '890 KB',
        status: 'completed',
        downloadUrl: '#'
      }
    ];
    setExportHistory(mockHistory);
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setReportConfig({
      ...reportConfig,
      name: template.name,
      description: template.description,
      filters: template.filters || [],
      sections: template.sections || [],
      groupBy: template.groupBy || [],
      sortBy: template.sortBy || []
    });
    // Auto-run preview
    handleRunReport();
  };

  const handleConfigChange = (newConfig) => {
    setReportConfig({ ...reportConfig, ...newConfig });
  };

  const handleSectionAdd = (section) => {
    setReportConfig({
      ...reportConfig,
      sections: [...reportConfig.sections, section]
    });
  };

  const handleSectionUpdate = (index, updatedSection) => {
    const newSections = [...reportConfig.sections];
    newSections[index] = updatedSection;
    setReportConfig({ ...reportConfig, sections: newSections });
  };

  const handleSectionDelete = (index) => {
    const newSections = reportConfig.sections.filter((_, i) => i !== index);
    setReportConfig({ ...reportConfig, sections: newSections });
  };

  const handleSectionMove = (fromIndex, toIndex) => {
    const newSections = [...reportConfig.sections];
    const [moved] = newSections.splice(fromIndex, 1);
    newSections.splice(toIndex, 0, moved);
    setReportConfig({ ...reportConfig, sections: newSections });
  };

  const handleRunReport = async () => {
    setIsRunning(true);
    
    // Simulate API call
    setTimeout(() => {
      const generatedData = generatePreviewData(reportConfig);
      setPreviewData(generatedData);
      setIsRunning(false);
    }, 1000);
  };

  const generatePreviewData = (config) => {
    // Generate mock preview data based on config
    const data = {
      metadata: {
        reportName: config.name,
        description: config.description,
        generatedAt: new Date().toLocaleString(),
        generatedBy: config.owner,
        filters: config.filters
      },
      sections: config.sections.map(section => {
        if (section.type === 'kpi') {
          return generateKpiData(section);
        } else if (section.type === 'table') {
          return generateTableData(section);
        } else if (section.type === 'chart') {
          return generateChartData(section);
        } else if (section.type === 'text') {
          return section;
        }
        return section;
      })
    };
    return data;
  };

  const generateKpiData = (section) => {
    return {
      ...section,
      data: section.metrics.map(metric => ({
        label: metric.label || metric.field,
        value: Math.floor(Math.random() * 100000),
        trend: Math.floor(Math.random() * 20) - 10,
        prefix: metric.prefix || '',
        suffix: metric.suffix || ''
      }))
    };
  };

  const generateTableData = (section) => {
    const rows = [];
    const numRows = 15;
    
    for (let i = 0; i < numRows; i++) {
      const row = {};
      section.columns.forEach(col => {
        if (col.includes('date')) {
          row[col] = new Date(2024, 11, Math.floor(Math.random() * 30) + 1).toLocaleDateString();
        } else if (col.includes('amount') || col.includes('value')) {
          row[col] = (Math.random() * 100000).toFixed(2);
        } else if (col.includes('count')) {
          row[col] = Math.floor(Math.random() * 100);
        } else if (col.includes('name') || col.includes('vendor') || col.includes('customer')) {
          row[col] = ['Acme Corp', 'TechVision Inc', 'Global Systems', 'Digital Solutions', 'Prime Vendors'][Math.floor(Math.random() * 5)];
        } else if (col.includes('status')) {
          row[col] = ['Active', 'Pending', 'Completed', 'Cancelled'][Math.floor(Math.random() * 4)];
        } else {
          row[col] = `Data ${i + 1}`;
        }
      });
      rows.push(row);
    }
    
    return {
      ...section,
      data: rows
    };
  };

  const generateChartData = (section) => {
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const datasets = section.metrics.map(metric => ({
      label: metric.label || metric.field,
      data: labels.map(() => Math.floor(Math.random() * 10000)),
      backgroundColor: metric.color || '#3b82f6'
    }));
    
    return {
      ...section,
      data: {
        labels,
        datasets
      }
    };
  };

  const handleSaveTemplate = async () => {
    // Simulate save
    alert(`Template "${reportConfig.name}" saved successfully!`);
  };

  return (
    <div className="reports-page">
      {/* Header */}
      <div className="reports-header">
        <div>
          <div className="reports-breadcrumb">Dashboard &gt; Reports</div>
          <h1 className="reports-title">Reports</h1>
        </div>
        <div className="reports-header-actions">
          <button className="reports-btn-secondary" onClick={handleSaveTemplate}>
            Save Template
          </button>
          <button className="reports-btn-primary" onClick={handleRunReport}>
            {isRunning ? 'Running...' : 'Run Report'}
          </button>
        </div>
      </div>

      {/* Mobile Pane Selector */}
      <div className="reports-mobile-tabs">
        <button 
          className={`reports-mobile-tab ${activePane === 'builder' ? 'active' : ''}`}
          onClick={() => setActivePane('builder')}
        >
          Builder
        </button>
        <button 
          className={`reports-mobile-tab ${activePane === 'config' ? 'active' : ''}`}
          onClick={() => setActivePane('config')}
        >
          Config
        </button>
        <button 
          className={`reports-mobile-tab ${activePane === 'preview' ? 'active' : ''}`}
          onClick={() => setActivePane('preview')}
        >
          Preview
        </button>
      </div>

      {/* Three-Pane Layout */}
      <div className="reports-content">
        <div className={`reports-pane reports-pane-left ${activePane === 'builder' ? 'active' : ''}`}>
          <ReportBuilder
            reportConfig={reportConfig}
            onTemplateSelect={handleTemplateSelect}
            onSectionAdd={handleSectionAdd}
            onSectionUpdate={handleSectionUpdate}
            onSectionDelete={handleSectionDelete}
            onSectionMove={handleSectionMove}
            onConfigChange={handleConfigChange}
          />
        </div>

        <div className={`reports-pane reports-pane-center ${activePane === 'config' ? 'active' : ''}`}>
          <ReportConfig
            reportConfig={reportConfig}
            onConfigChange={handleConfigChange}
            onRunReport={handleRunReport}
            isRunning={isRunning}
          />
        </div>

        <div className={`reports-pane reports-pane-right ${activePane === 'preview' ? 'active' : ''}`}>
          <ReportPreview
            previewData={previewData}
            reportConfig={reportConfig}
            isRunning={isRunning}
            exportHistory={exportHistory}
          />
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;