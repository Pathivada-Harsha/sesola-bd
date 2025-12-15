import React from 'react';
import { Download } from 'lucide-react';
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, HeadingLevel, Header, Footer, PageNumber, NumberFormat, Media, PageBreak, BorderStyle } from 'docx';
import { saveAs } from 'file-saver';

const ExportDOCXButton = ({ 
  previewData, 
  reportConfig, 
  chartRefs,
  onProgress,
  onSuccess,
  onError 
}) => {

  const exportToWord = async () => {
    try {
      onProgress && onProgress({ percent: 10, message: 'Preparing document...' });

      // Capture chart images
      const chartImages = await captureChartImages();
      
      onProgress && onProgress({ percent: 30, message: 'Building document structure...' });

      // Create document sections
      const docSections = [];

      // Title and metadata
      docSections.push(
        new Paragraph({
          text: previewData.metadata.reportName,
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 }
        })
      );

      if (previewData.metadata.description) {
        docSections.push(
          new Paragraph({
            text: previewData.metadata.description,
            alignment: AlignmentType.CENTER,
            spacing: { after: 300 }
          })
        );
      }

      // Metadata section
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

      // Applied filters
      if (previewData.metadata.filters && previewData.metadata.filters.length > 0) {
        docSections.push(
          new Paragraph({
            children: [
              new TextRun({
                text: 'Filters Applied: ',
                bold: true
              }),
              new TextRun({
                text: previewData.metadata.filters
                  .map(f => `${f.field} ${f.operator} ${f.value}`)
                  .join(', ')
              })
            ],
            spacing: { after: 400 }
          })
        );
      }

      onProgress && onProgress({ percent: 50, message: 'Adding sections...' });

      // Process each section
      let chartIndex = 0;
      for (let i = 0; i < previewData.sections.length; i++) {
        const section = previewData.sections[i];

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

        // Handle different section types
        if (section.type === 'kpi') {
          docSections.push(...createKpiSection(section));
        } else if (section.type === 'table') {
          docSections.push(createTableSection(section));
        } else if (section.type === 'chart' && chartImages[chartIndex]) {
          const chartImage = await createImageFromDataUrl(chartImages[chartIndex]);
          docSections.push(
            new Paragraph({
              children: [chartImage],
              alignment: AlignmentType.CENTER,
              spacing: { before: 200, after: 200 }
            })
          );
          chartIndex++;
        } else if (section.type === 'text') {
          docSections.push(
            new Paragraph({
              text: section.content,
              spacing: { after: 200 }
            })
          );
        }

        // Page break between major sections (except last)
        if (i < previewData.sections.length - 1) {
          docSections.push(
            new Paragraph({
              children: [new PageBreak()]
            })
          );
        }
      }

      onProgress && onProgress({ percent: 80, message: 'Generating file...' });

      // Create document
      const doc = new Document({
        sections: [{
          properties: {
            page: {
              margin: {
                top: 720,    // 0.5 inch
                right: 720,
                bottom: 720,
                left: 720,
              },
            },
          },
          headers: {
            default: new Header({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: reportConfig.name || 'Business Report',
                      bold: true
                    })
                  ],
                  alignment: AlignmentType.CENTER
                })
              ],
            }),
          },
          footers: {
            default: new Footer({
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      children: ["Page ", PageNumber.CURRENT],
                    }),
                    new TextRun({
                      children: [" of ", PageNumber.TOTAL_PAGES],
                    }),
                  ],
                }),
              ],
            }),
          },
          children: docSections,
        }],
      });

      onProgress && onProgress({ percent: 90, message: 'Saving file...' });

      // Generate and download
      const blob = await Packer.toBlob(doc);
      const fileName = `${sanitizeFileName(reportConfig.name)}_${new Date().toISOString().split('T')[0]}.docx`;
      saveAs(blob, fileName);

      onProgress && onProgress({ percent: 100, message: 'Complete!' });
      setTimeout(() => {
        onSuccess && onSuccess();
      }, 500);

    } catch (error) {
      console.error('Export error:', error);
      onError && onError(error);
    }
  };

  const captureChartImages = async () => {
    const images = [];
    
    if (!chartRefs || !chartRefs.current) return images;

    for (const ref of chartRefs.current) {
      if (!ref) continue;

      try {
        // Find canvas element in the chart
        const canvas = ref.querySelector('canvas');
        if (canvas) {
          const dataUrl = canvas.toDataURL('image/png');
          images.push(dataUrl);
        }
      } catch (error) {
        console.error('Error capturing chart:', error);
      }
    }

    return images;
  };

  const createImageFromDataUrl = async (dataUrl) => {
    // Convert data URL to blob
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();

    return new Media(arrayBuffer, 600, 400, {
      floating: {
        horizontalPosition: {
          align: AlignmentType.CENTER,
        },
        verticalPosition: {
          align: AlignmentType.CENTER,
        },
      },
    });
  };

  const createKpiSection = (section) => {
    const paragraphs = [];
    
    section.data.forEach((kpi, index) => {
      const trendIndicator = kpi.trend > 0 ? '↑' : kpi.trend < 0 ? '↓' : '→';
      const trendColor = kpi.trend > 0 ? 'green' : kpi.trend < 0 ? 'red' : 'gray';

      paragraphs.push(
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
            }),
            new TextRun({
              text: ` ${trendIndicator} ${Math.abs(kpi.trend)}%`,
              size: 20,
              color: trendColor === 'green' ? '059669' : trendColor === 'red' ? 'DC2626' : '6B7280'
            })
          ],
          spacing: { after: 200 }
        })
      );
    });

    return paragraphs;
  };

  const createTableSection = (section) => {
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
        shading: {
          fill: 'E5E7EB',
        },
      })
    );
    tableRows.push(new TableRow({ children: headerCells }));

    // Data rows (limit to first 50 rows for performance)
    const dataToShow = section.data.slice(0, 50);
    dataToShow.forEach((row, rowIndex) => {
      const cells = section.columns.map(col => 
        new TableCell({
          children: [
            new Paragraph({
              text: String(row[col] || '')
            })
          ],
          shading: {
            fill: rowIndex % 2 === 0 ? 'FFFFFF' : 'F9FAFB',
          },
        })
      );
      tableRows.push(new TableRow({ children: cells }));
    });

    if (section.data.length > 50) {
      tableRows.push(
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  text: `... and ${section.data.length - 50} more rows`,
                  italics: true
                })
              ],
              columnSpan: section.columns.length
            })
          ]
        })
      );
    }

    return new Table({
      rows: tableRows,
      width: {
        size: 100,
        type: WidthType.PERCENTAGE,
      },
      borders: {
        top: { style: BorderStyle.SINGLE, size: 1, color: 'D1D5DB' },
        bottom: { style: BorderStyle.SINGLE, size: 1, color: 'D1D5DB' },
        left: { style: BorderStyle.SINGLE, size: 1, color: 'D1D5DB' },
        right: { style: BorderStyle.SINGLE, size: 1, color: 'D1D5DB' },
        insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: 'E5E7EB' },
        insideVertical: { style: BorderStyle.SINGLE, size: 1, color: 'E5E7EB' },
      },
    });
  };

  const sanitizeFileName = (name) => {
    return name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  };

  return (
    <button className="export-btn export-btn-primary" onClick={exportToWord}>
      <Download size={16} />
      Export to Word
    </button>
  );
};

export default ExportDOCXButton;