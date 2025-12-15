import React, { useState, useRef } from 'react';
import { Download, FileText, Image, Table as TableIcon, BarChart3, Eye, Clock } from 'lucide-react';
import ExportDOCXButton from './ExportDocsButton.js';
import KpiCard from './kpicard.js';
import DataTable from './DataTable';
import ChartWrapper from './ChartWrapper';

const ReportPreview = ({ previewData, reportConfig, isRunning, exportHistory }) => {
  const [viewMode, setViewMode] = useState('preview'); // preview, print
  const [exportProgress, setExportProgress] = useState(null);
  const previewRef = useRef(null);
  const chartRefs = useRef([]);

  if (isRunning) {
    return (
      <div className="report-preview">
        <div className="preview-loading">
          <div className="loading-spinner"></div>
          <p>Generating report...</p>
        </div>
      </div>
    );
  }

  if (!previewData) {
    return (
      <div className="report-preview">
        <div className="preview-empty">
          <Eye size={48} />
          <h3>No Preview Available</h3>
          <p>Configure your report and click "Run Now" to see preview</p>
        </div>
      </div>
    );
  }

  const handleExportSuccess = () => {
    setExportProgress(null);
    alert('Report exported successfully!');
  };

  const handleExportError = (error) => {
    setExportProgress(null);
    alert(`Export failed: ${error.message}`);
  };

  return (
    <div className="report-preview">
      {/* Preview Header */}
      <div className="preview-header">
        <h2>Preview & Export</h2>
        <div className="preview-view-modes">
          <button
            className={`view-mode-btn ${viewMode === 'preview' ? 'active' : ''}`}
            onClick={() => setViewMode('preview')}
          >
            <Eye size={16} />
            Preview
          </button>
          <button
            className={`view-mode-btn ${viewMode === 'print' ? 'active' : ''}`}
            onClick={() => setViewMode('print')}
          >
            <FileText size={16} />
            Print Layout
          </button>
        </div>
      </div>

      {/* Export Controls */}
      <div className="export-controls">
        <ExportDOCXButton
          previewData={previewData}
          reportConfig={reportConfig}
          chartRefs={chartRefs}
          onProgress={(progress) => setExportProgress(progress)}
          onSuccess={handleExportSuccess}
          onError={handleExportError}
        />
        
        <button className="export-btn export-btn-secondary">
          <Download size={16} />
          Export PDF
        </button>
        
        <button className="export-btn export-btn-secondary">
          <Download size={16} />
          Export Excel
        </button>
      </div>

      {/* Export Progress */}
      {exportProgress && (
        <div className="export-progress">
          <div className="export-progress-bar">
            <div 
              className="export-progress-fill" 
              style={{ width: `${exportProgress.percent}%` }}
            ></div>
          </div>
          <div className="export-progress-text">{exportProgress.message}</div>
        </div>
      )}

      {/* Preview Content */}
      <div className={`preview-content ${viewMode === 'print' ? 'print-layout' : ''}`} ref={previewRef}>
        {/* Report Header */}
        <div className="preview-report-header">
          <h1 className="preview-report-title">{previewData.metadata.reportName}</h1>
          {previewData.metadata.description && (
            <p className="preview-report-description">{previewData.metadata.description}</p>
          )}
          <div className="preview-report-meta">
            <div className="preview-meta-item">
              <Clock size={14} />
              <span>Generated: {previewData.metadata.generatedAt}</span>
            </div>
            <div className="preview-meta-item">
              <span>By: {previewData.metadata.generatedBy}</span>
            </div>
          </div>
        </div>

        {/* Applied Filters */}
        {previewData.metadata.filters && previewData.metadata.filters.length > 0 && (
          <div className="preview-filters-applied">
            <strong>Filters Applied:</strong>
            {previewData.metadata.filters.map((filter, index) => (
              <span key={index} className="filter-badge">
                {filter.field} {filter.operator} {filter.value}
              </span>
            ))}
          </div>
        )}

        {/* Report Sections */}
        {previewData.sections.map((section, index) => (
          <div key={index} className="preview-section">
            {section.title && (
              <h2 className="preview-section-title">{section.title}</h2>
            )}

            {section.type === 'kpi' && (
              <div className="preview-kpi-grid">
                {section.data.map((kpi, kpiIndex) => (
                  <KpiCard key={kpiIndex} data={kpi} />
                ))}
              </div>
            )}

            {section.type === 'table' && (
              <DataTable
                columns={section.columns}
                data={section.data}
              />
            )}

            {section.type === 'chart' && (
              <ChartWrapper
                ref={(el) => (chartRefs.current[index] = el)}
                chartType={section.chartType}
                data={section.data}
                options={section.options}
              />
            )}

            {section.type === 'text' && (
              <div className="preview-text-block">
                {section.content}
              </div>
            )}

            {viewMode === 'print' && index < previewData.sections.length - 1 && (
              <div className="page-break"></div>
            )}
          </div>
        ))}
      </div>

      {/* Export History */}
      <div className="export-history">
        <h3 className="export-history-title">Recent Exports</h3>
        {exportHistory.length === 0 ? (
          <div className="export-history-empty">
            <p>No exports yet</p>
          </div>
        ) : (
          <div className="export-history-list">
            {exportHistory.map(item => (
              <div key={item.id} className="export-history-item">
                <FileText size={16} className="export-history-icon" />
                <div className="export-history-info">
                  <div className="export-history-name">{item.reportName}</div>
                  <div className="export-history-meta">
                    {item.generatedAt} • {item.size} • {item.format}
                  </div>
                </div>
                <a href={item.downloadUrl} className="export-history-download">
                  <Download size={14} />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportPreview;