import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const KpiCard = ({ data }) => {
  const getTrendIcon = () => {
    if (data.trend > 0) return <TrendingUp size={16} />;
    if (data.trend < 0) return <TrendingDown size={16} />;
    return <Minus size={16} />;
  };

  const getTrendClass = () => {
    if (data.trend > 0) return 'trend-positive';
    if (data.trend < 0) return 'trend-negative';
    return 'trend-neutral';
  };

  return (
    <div className="kpi-card">
      <div className="kpi-label">{data.label}</div>
      <div className="kpi-value">
        {data.prefix}{data.value.toLocaleString()}{data.suffix}
      </div>
      {data.trend !== undefined && (
        <div className={`kpi-trend ${getTrendClass()}`}>
          {getTrendIcon()}
          <span>{Math.abs(data.trend)}%</span>
        </div>
      )}
    </div>
  );
};

export default KpiCard;