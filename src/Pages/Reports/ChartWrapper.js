import React, { useEffect, useRef, forwardRef } from 'react';
import Chart from 'chart.js/auto';

const ChartWrapper = forwardRef(({ chartType = 'bar', data, options = {} }, ref) => {
  const canvasRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !data) return;

    // Destroy previous chart instance
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');

    // Default options based on chart type
    const defaultOptions = {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
        title: {
          display: false,
        },
      },
    };

    // Merge default options with provided options
    const chartOptions = { ...defaultOptions, ...options };

    // Create chart configuration
    const config = {
      type: chartType === 'donut' ? 'doughnut' : chartType,
      data: prepareChartData(data, chartType),
      options: chartOptions,
    };

    // Create new chart instance
    chartInstanceRef.current = new Chart(ctx, config);

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [chartType, data, options]);

  const prepareChartData = (rawData, type) => {
    // If data is already in correct format
    if (rawData.labels && rawData.datasets) {
      // Ensure colors are set
      const datasets = rawData.datasets.map((dataset, index) => ({
        ...dataset,
        backgroundColor: dataset.backgroundColor || getColorPalette(type)[index % 10],
        borderColor: dataset.borderColor || getColorPalette(type)[index % 10],
        borderWidth: 2,
      }));

      return {
        ...rawData,
        datasets,
      };
    }

    // Handle simple data format
    return {
      labels: rawData.labels || [],
      datasets: [{
        label: rawData.label || 'Data',
        data: rawData.data || [],
        backgroundColor: getColorPalette(type),
        borderColor: getColorPalette(type),
        borderWidth: 2,
      }],
    };
  };

  const getColorPalette = (type) => {
    if (type === 'pie' || type === 'doughnut' || type === 'donut') {
      return [
        '#3b82f6', // blue
        '#8b5cf6', // purple
        '#10b981', // green
        '#f59e0b', // amber
        '#ef4444', // red
        '#06b6d4', // cyan
        '#ec4899', // pink
        '#84cc16', // lime
        '#f97316', // orange
        '#6366f1', // indigo
      ];
    }
    return '#3b82f6'; // Default blue for line/bar charts
  };

  return (
    <div className="chart-wrapper" ref={ref}>
      <div className="chart-container">
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
});

ChartWrapper.displayName = 'ChartWrapper';

export default ChartWrapper;