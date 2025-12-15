// server-export-example.js
// Optional server-side export implementation using Node.js and Express

const express = require('express');
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, AlignmentType, HeadingLevel } = require('docx');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json({ limit: '50mb' }));

// Store exports temporarily (use S3/MinIO in production)
const EXPORTS_DIR = path.join(__dirname, 'exports');
if (!fs.existsSync(EXPORTS_DIR)) {
  fs.mkdirSync(EXPORTS_DIR);
}

/**
 * POST /api/reports/export
 * Generate and download a report as DOCX
 */
app.post('/api/reports/export', async (req, res) => {
  try {
    const { reportConfig, previewData } = req.body;

    console.log('Generating report:', reportConfig.name);

    // Build document sections
    const docSections = [];

    // Title
    docSections.push(
      new Paragraph({
        text: previewData.metadata.reportName,
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 }
      })
    );

    // Description
    if (previewData.metadata.description) {
      docSections.push(
        new Paragraph({
          text: previewData.metadata.description,
          alignment: AlignmentType.CENTER,
          spacing: { after: 300 }
        })
      );
    }

    // Metadata
    docSections.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `Generated: ${previewData.metadata.generatedAt}`,
            size: 20
          })
        ],
        spacing: { after: 100 }
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: `By: ${previewData.metadata.generatedBy}`,
            size: 20
          })
        ],
        spacing: { after: 300 }
      })
    );

    // Process sections
    for (const section of previewData.sections) {
      // Section title
      if (section.title) {
        docSections.push(
          new Paragraph({
            text: section.title,
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 300, after: 200 }
          })
        );
      }

      // Handle KPIs
      if (section.type === 'kpi') {
        section.data.forEach(kpi => {
          docSections.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: `${kpi.label}: `,
                  bold: true,
                  size: 24
                }),
                new TextRun({
                  text: `${kpi.prefix || ''}${kpi.value.toLocaleString()}${kpi.suffix || ''}`,
                  size: 28,
                  bold: true
                })
              ],
              spacing: { after: 200 }
            })
          );
        });
      }

      // Handle Tables
      if (section.type === 'table') {
        const tableRows = [];

        // Header row
        const headerCells = section.columns.map(col =>
          new TableCell({
            children: [
              new Paragraph({
                text: col.replace(/_/g, ' ').toUpperCase(),
                bold: true
              })
            ],
            shading: { fill: 'E5E7EB' }
          })
        );
        tableRows.push(new TableRow({ children: headerCells }));

        // Data rows (all rows for server-side)
        section.data.forEach((row, rowIndex) => {
          const cells = section.columns.map(col =>
            new TableCell({
              children: [
                new Paragraph({ text: String(row[col] || '') })
              ],
              shading: {
                fill: rowIndex % 2 === 0 ? 'FFFFFF' : 'F9FAFB'
              }
            })
          );
          tableRows.push(new TableRow({ children: cells }));
        });

        const table = new Table({
          rows: tableRows,
          width: { size: 100, type: WidthType.PERCENTAGE }
        });

        docSections.push(table);
      }

      // Handle Charts (server would need chart rendering library)
      if (section.type === 'chart') {
        docSections.push(
          new Paragraph({
            text: `[Chart: ${section.title}]`,
            italics: true,
            spacing: { before: 200, after: 200 }
          })
        );
        // Note: Server-side chart rendering requires additional libraries like:
        // - chartjs-node-canvas
        // - puppeteer (for headless browser rendering)
        // - or pre-rendered chart images from client
      }

      // Handle Text
      if (section.type === 'text') {
        docSections.push(
          new Paragraph({
            text: section.content,
            spacing: { after: 200 }
          })
        );
      }
    }

    // Create document
    const doc = new Document({
      sections: [{
        children: docSections
      }]
    });

    // Generate buffer
    const buffer = await Packer.toBuffer(doc);

    // Save file
    const fileName = `${reportConfig.name.replace(/[^a-z0-9]/gi, '_')}_${Date.now()}.docx`;
    const filePath = path.join(EXPORTS_DIR, fileName);
    
    fs.writeFileSync(filePath, buffer);

    // Return download info
    res.json({
      success: true,
      fileName,
      downloadUrl: `/api/reports/download/${fileName}`,
      size: buffer.length
    });

  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/reports/download/:fileName
 * Download a generated report
 */
app.get('/api/reports/download/:fileName', (req, res) => {
  const { fileName } = req.params;
  const filePath = path.join(EXPORTS_DIR, fileName);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' });
  }

  res.download(filePath, fileName, (err) => {
    if (err) {
      console.error('Download error:', err);
    }
    
    // Optional: Delete file after download
    // setTimeout(() => {
    //   fs.unlinkSync(filePath);
    // }, 5000);
  });
});

/**
 * POST /api/reports/schedule
 * Schedule a recurring report
 */
app.post('/api/reports/schedule', async (req, res) => {
  const { reportConfig, schedule } = req.body;

  // In production, use a job queue like Bull or node-cron
  console.log('Scheduling report:', {
    name: reportConfig.name,
    frequency: schedule.frequency,
    time: schedule.time,
    recipients: schedule.recipients
  });

  // Store schedule in database
  const scheduleId = `schedule-${Date.now()}`;

  res.json({
    success: true,
    scheduleId,
    message: 'Report scheduled successfully',
    nextRun: calculateNextRun(schedule)
  });
});

/**
 * GET /api/reports/history
 * Get export history
 */
app.get('/api/reports/history', (req, res) => {
  const files = fs.readdirSync(EXPORTS_DIR)
    .filter(file => file.endsWith('.docx'))
    .map(file => {
      const stats = fs.statSync(path.join(EXPORTS_DIR, file));
      return {
        fileName: file,
        size: formatFileSize(stats.size),
        createdAt: stats.birthtime,
        downloadUrl: `/api/reports/download/${file}`
      };
    })
    .sort((a, b) => b.createdAt - a.createdAt);

  res.json(files);
});

// Helper functions
function calculateNextRun(schedule) {
  const now = new Date();
  const [hours, minutes] = schedule.time.split(':').map(Number);

  const nextRun = new Date();
  nextRun.setHours(hours, minutes, 0, 0);

  if (nextRun < now) {
    // If time has passed today, schedule for tomorrow
    nextRun.setDate(nextRun.getDate() + 1);
  }

  if (schedule.frequency === 'weekly') {
    // Add 7 days
    nextRun.setDate(nextRun.getDate() + 7);
  } else if (schedule.frequency === 'monthly') {
    // Add 1 month
    nextRun.setMonth(nextRun.getMonth() + 1);
  }

  return nextRun.toISOString();
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Reports API server running on port ${PORT}`);
  console.log(`Exports directory: ${EXPORTS_DIR}`);
});

module.exports = app;

// USAGE:
// 1. Install dependencies: npm install express docx
// 2. Run server: node server-export-example.js
// 3. Send POST request to http://localhost:3001/api/reports/export