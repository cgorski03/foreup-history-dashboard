import React from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import { format, parseISO } from 'date-fns';
import type { ChartDataPoint } from '../types';

interface GolfHistoryChartProps {
  data: ChartDataPoint[];
}

const GolfHistoryChart: React.FC<GolfHistoryChartProps> = ({ data }) => {
  const formatXAxisLabel = (tickItem: string) => {
    try {
      return format(parseISO(tickItem + '-01'), 'MMM yy');
    } catch {
      return tickItem;
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const date = format(parseISO(label + '-01'), 'MMMM yyyy');
      return (
        <div className="bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-medium text-gray-800">{date}</p>
          <p className="text-primary-600 font-semibold">
            {payload[0].value} rounds played
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-container">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
        📈 Golf Activity Over Time
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="golfGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatXAxisLabel}
              stroke="#666"
              fontSize={12}
            />
            <YAxis 
              stroke="#666"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#10b981"
              strokeWidth={3}
              fill="url(#golfGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GolfHistoryChart;
